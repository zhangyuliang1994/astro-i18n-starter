import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";

const REPOSITORY_ROOT = process.cwd();
const CONTENT_ROOT = path.join(REPOSITORY_ROOT, "src/content/blog");
const CONTENT_PREFIX = "src/content/blog/";
const WORKER_URL = (process.env.BLOG_KB_WORKER_URL || "https://api.frency.me").replace(/\/$/, "");
const ADMIN_TOKEN = process.env.BLOG_KB_ADMIN_TOKEN || "";
const BASE_SHA = process.env.SYNC_BASE_SHA || process.env.GITHUB_EVENT_BEFORE || "";
const DRY_RUN = process.env.DRY_RUN === "1";
const FULL_SYNC = process.argv.includes("--all");

const CHUNK_SIZE = positiveNumber(process.env.CHUNK_SIZE, 1800);
const CHUNK_OVERLAP = positiveNumber(process.env.CHUNK_OVERLAP, 200);
const BATCH_SIZE = Math.min(64, positiveNumber(process.env.BATCH_SIZE, 32));
const DELETE_BATCH_SIZE = 1000;

if (CHUNK_OVERLAP >= CHUNK_SIZE) {
  throw new Error("CHUNK_OVERLAP must be smaller than CHUNK_SIZE");
}

const changes = FULL_SYNC ? await getAllCurrentPosts() : await getChangedPosts(BASE_SHA);

if (changes.length === 0) {
  console.log("No blog article changes to synchronize.");
  process.exit(0);
}

if (!DRY_RUN && !ADMIN_TOKEN) {
  throw new Error("BLOG_KB_ADMIN_TOKEN is required unless DRY_RUN=1");
}

const newChunksById = new Map();
const oldChunkIds = new Set();

for (const change of changes) {
  if (change.before !== null) {
    for (const chunk of chunksForArticle(change.file, change.before)) {
      oldChunkIds.add(chunk.id);
    }
  }

  if (change.after !== null) {
    for (const chunk of chunksForArticle(change.file, change.after)) {
      newChunksById.set(chunk.id, chunk);
    }
  }
}

// Chunk IDs include a content hash. Remove IDs from the previous revision that
// are not recreated by this revision so edited and deleted content cannot linger.
let idsToDelete = [...oldChunkIds].filter((id) => !newChunksById.has(id));
const chunksToUpsert = [...newChunksById.values()];

console.log([
  `Prepared ${changes.length} changed article(s)`,
  `${chunksToUpsert.length} chunk(s) to upsert`,
  `${idsToDelete.length} stale chunk(s) to delete`,
].join(", "));

if (DRY_RUN) {
  console.log("DRY_RUN=1, no remote changes were made.");
  process.exit(0);
}

// Upsert first. If this run is interrupted, the knowledge base stays complete;
// stale chunks are removed only after all replacement chunks are safely stored.
await sendBatches("/api/admin/upsert", "chunks", chunksToUpsert, BATCH_SIZE);

if (FULL_SYNC) {
  const remoteIds = await listRemoteChunkIds("blog");
  idsToDelete = remoteIds.filter((id) => !newChunksById.has(id));
  console.log(`Full reconciliation found ${idsToDelete.length} orphaned remote chunk(s).`);
}

await sendBatches("/api/admin/delete", "ids", idsToDelete, DELETE_BATCH_SIZE);

console.log("Blog knowledge base synchronization completed.");

async function getAllCurrentPosts() {
  const files = await findIndexMdxFiles(CONTENT_ROOT);
  return Promise.all(files.map(async (absoluteFile) => ({
    file: path.relative(REPOSITORY_ROOT, absoluteFile).split(path.sep).join("/"),
    before: null,
    after: await readFile(absoluteFile, "utf8"),
  })));
}

async function getChangedPosts(baseSha) {
  if (!baseSha || /^0+$/.test(baseSha)) {
    console.log("No usable base commit was supplied; falling back to a full upsert.");
    return getAllCurrentPosts();
  }

  assertGitCommit(baseSha);
  const output = git(["diff", "--name-only", "-z", baseSha, "HEAD", "--", CONTENT_PREFIX]);
  const files = [...new Set(output.split("\0").filter(isBlogIndexFile))].sort();

  return files.map((file) => ({
    file,
    before: readFileAtCommit(baseSha, file),
    after: existsSync(path.join(REPOSITORY_ROOT, file))
      ? execFileSync("git", ["show", `HEAD:${file}`], { cwd: REPOSITORY_ROOT, encoding: "utf8" })
      : null,
  }));
}

function chunksForArticle(file, raw) {
  const relative = file.slice(CONTENT_PREFIX.length);
  const parts = relative.split("/");
  const lang = parts[0];
  const slug = parts.slice(1, -1).join("/");

  if (!lang || !slug) {
    throw new Error(`Unexpected blog article path: ${file}`);
  }

  const { frontmatter, body } = parseFrontmatter(raw);
  const text = cleanMarkdown(body);
  const pieces = splitText(text, CHUNK_SIZE, CHUNK_OVERLAP);
  const contentId = `${lang}/${slug}`;

  return pieces.map((piece, index) => {
    const hash = createHash("sha256")
      .update(`${contentId}:${index}:${piece}`)
      .digest("hex")
      .slice(0, 24);

    return {
      id: `${lang.replace(/[^a-z0-9-]/gi, "")}-${hash}`,
      contentId,
      lang,
      source: "blog",
      slug,
      url: `/${lang}/blog/${slug}/`,
      title: frontmatter.title || slug,
      description: frontmatter.description || "",
      text: piece,
      date: frontmatter.date || "",
      tags: parseList(frontmatter.tags),
      categories: parseList(frontmatter.categories),
    };
  });
}

async function sendBatches(endpoint, field, items, batchSize) {
  for (let index = 0; index < items.length; index += batchSize) {
    const batch = items.slice(index, index + batchSize);
    await requestWithRetry(endpoint, { [field]: batch });
    console.log(`${endpoint}: ${Math.min(index + batchSize, items.length)} / ${items.length}`);
  }
}

async function requestWithRetry(endpoint, body) {
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(`${WORKER_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${ADMIN_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(60_000),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(payload)}`);
      }
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      }
    }
  }

  throw new Error(`${endpoint} failed after 3 attempts`, { cause: lastError });
}

async function listRemoteChunkIds(source) {
  const ids = [];
  let offset = 0;

  while (offset !== null) {
    const url = new URL(`${WORKER_URL}/api/admin/chunks`);
    url.searchParams.set("source", source);
    url.searchParams.set("limit", "1000");
    url.searchParams.set("offset", String(offset));

    const response = await fetch(url, {
      headers: { "Authorization": `Bearer ${ADMIN_TOKEN}` },
      signal: AbortSignal.timeout(60_000),
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok || !Array.isArray(payload.ids)) {
      throw new Error(`Unable to list remote chunks: ${response.status} ${JSON.stringify(payload)}`);
    }

    ids.push(...payload.ids);
    offset = typeof payload.nextOffset === "number" ? payload.nextOffset : null;
  }

  return ids;
}

async function findIndexMdxFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      results.push(...await findIndexMdxFiles(fullPath));
    } else if (entry.isFile() && entry.name === "index.mdx") {
      results.push(fullPath);
    }
  }

  return results.sort();
}

function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) return { frontmatter: {}, body: normalized };

  const end = normalized.indexOf("\n---", 4);
  if (end === -1) return { frontmatter: {}, body: normalized };

  const frontmatter = {};
  for (const line of normalized.slice(4, end).split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) frontmatter[match[1]] = stripQuotes(match[2].trim());
  }
  return { frontmatter, body: normalized.slice(end + 4).trim() };
}

function cleanMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^import\s+[\s\S]*?;\s*$/gm, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitText(text, chunkSize, overlap) {
  if (!text) return [];
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const targetEnd = Math.min(start + chunkSize, text.length);
    const end = findSplitPoint(text, start, targetEnd);
    const chunk = text.slice(start, end).trim();
    if (chunk) chunks.push(chunk);
    if (end >= text.length) break;
    start = Math.max(0, end - overlap);
  }
  return chunks;
}

function findSplitPoint(text, start, targetEnd) {
  if (targetEnd >= text.length) return text.length;
  const window = text.slice(start, targetEnd);
  const splitAt = Math.max(
    window.lastIndexOf("。"), window.lastIndexOf("."), window.lastIndexOf("!"),
    window.lastIndexOf("?"), window.lastIndexOf("\n"),
  );
  return splitAt > Math.floor(window.length * 0.6) ? start + splitAt + 1 : targetEnd;
}

function parseList(value) {
  if (!value) return [];
  const trimmed = String(value).trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) return [];
  return trimmed.slice(1, -1).split(",").map((item) => stripQuotes(item.trim())).filter(Boolean);
}

function stripQuotes(value) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function readFileAtCommit(commit, file) {
  try {
    return execFileSync("git", ["show", `${commit}:${file}`], {
      cwd: REPOSITORY_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
}

function assertGitCommit(commit) {
  try {
    execFileSync("git", ["cat-file", "-e", `${commit}^{commit}`], {
      cwd: REPOSITORY_ROOT,
      stdio: "ignore",
    });
  } catch {
    throw new Error(`SYNC_BASE_SHA is not available in this checkout: ${commit}`);
  }
}

function git(args) {
  return execFileSync("git", args, { cwd: REPOSITORY_ROOT, encoding: "utf8" });
}

function isBlogIndexFile(file) {
  return file.startsWith(CONTENT_PREFIX) && file.endsWith("/index.mdx");
}

function positiveNumber(value, fallback) {
  const parsed = Number(value || fallback);
  if (!Number.isFinite(parsed) || parsed <= 0) throw new Error(`Expected a positive number, got: ${value}`);
  return parsed;
}
