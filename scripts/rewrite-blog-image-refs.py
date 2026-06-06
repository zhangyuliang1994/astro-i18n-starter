#!/usr/bin/env python3
"""
One-shot: rewrite .png/.jpg/.jpeg references in src/content/blog/**/*.mdx to .webp,
but only when the corresponding .webp actually exists on disk.

Why the existence check: a handful of 1x1 placeholder PNGs in public/images/blog
have a corrupt IDAT chunk and cannot be re-encoded by cwebp/sharp; their .png
files remain in place, so we must leave those references untouched.
"""

import re
import sys
from pathlib import Path
from urllib.parse import urlparse, urlunparse

REPO_ROOT = Path(__file__).resolve().parent.parent
BLOG_ROOT = REPO_ROOT / "src" / "content" / "blog"
PUBLIC_ROOT = REPO_ROOT / "public"

# Matches a local path ending in .png/.jpg/.jpeg, but not absolute http(s) URLs.
# The lookbehind blocks matches like https://i.imgur.com/foo.png (preceding char
# would be a word char or ':') while still allowing "./", "../", and "/...".
PATH_RE = re.compile(
    r"((?<![\w:/])(?:\.{1,2}/|/)[^\s)\'\"<>]*?)\.(png|jpe?g)\b",
    re.IGNORECASE,
)


def resolve_webp_target(mdx_path: Path, ref: str) -> Path | None:
    """Return the on-disk path the rewritten .webp would live at, or None if N/A."""
    # Strip query/fragment that could appear inside markdown links.
    parsed = urlparse(ref)
    bare = parsed.path
    webp = re.sub(r"\.(png|jpe?g)$", ".webp", bare, flags=re.IGNORECASE)
    if webp.startswith("/"):
        return PUBLIC_ROOT / webp.lstrip("/")
    return (mdx_path.parent / webp).resolve()


def rewrite(text: str, mdx_path: Path) -> tuple[str, int, int]:
    rewrote = 0
    skipped = 0

    def repl(match: re.Match) -> str:
        nonlocal rewrote, skipped
        original = match.group(0)
        head = match.group(1)
        webp_path = resolve_webp_target(mdx_path, original)
        if webp_path and webp_path.exists():
            rewrote += 1
            return f"{head}.webp"
        skipped += 1
        return original

    return PATH_RE.sub(repl, text), rewrote, skipped


def main() -> int:
    total_files = 0
    total_rewrote = 0
    total_skipped = 0
    changed_files = 0

    for mdx in BLOG_ROOT.rglob("*.mdx"):
        text = mdx.read_text(encoding="utf-8")
        new_text, rewrote, skipped = rewrite(text, mdx)
        total_files += 1
        total_rewrote += rewrote
        total_skipped += skipped
        if new_text != text:
            mdx.write_text(new_text, encoding="utf-8")
            changed_files += 1
            print(f"updated {mdx.relative_to(REPO_ROOT)} (+{rewrote} refs)")

    print(
        f"\nScanned {total_files} mdx files, "
        f"rewrote {total_rewrote} refs across {changed_files} files, "
        f"skipped {total_skipped} refs (no .webp present)."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
