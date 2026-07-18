---
illustration_id: 03
type: flowchart
style: vector-illustration
---

GitHub Actions Incremental Sync and Full Reconciliation - Process Flow

Use case: productivity-visual
Asset type: bilingual technical article automation diagram

Layout: Top-down entry followed by three parallel change branches, merging into storage; a separate reconciliation loop along the bottom.

STEPS:
1. “Push to main” - Git commit enters GitHub Actions after successful site deployment.
2. “Git diff” - compare before SHA with HEAD for src/content/blog/**/index.mdx.
3A. “ADD” - clean MDX, split 1800 chars with 200 overlap, hash IDs, upsert.
3B. “EDIT” - calculate old and new IDs, upsert new chunks first, delete stale IDs second.
3C. “DELETE” - read old content from Git history and delete all previous chunk IDs.
4. “D1 + Vectorize” - metadata/text and vectors converge into one consistent knowledge base.
- Bottom lane “FULL RECONCILE”: current content IDs compared with remote content IDs; orphan IDs are deleted.

CONNECTIONS: Blue arrows for Git pipeline, teal arrows for upsert, coral arrows for deletion, purple loop for full reconciliation. Make “upsert first → delete second” visually explicit.
LABELS: Push to main, Deploy OK, Git diff, ADD, EDIT, DELETE, 1800, overlap 200, SHA-256 ID, Upsert first, Delete stale, D1, Vectorize, FULL RECONCILE, Remote IDs, Orphan IDs
COLORS: Off-white background (#F8FAFC); navy (#10233F) outlines; blue (#3B82F6) automation; teal (#14B8A6) safe writes; coral (#EF6A6A) deletions; purple (#8B5CF6) reconciliation; amber (#F59E0B) deployment checkpoint.
STYLE: Clean flat vector process diagram with bold geometric branches, precise arrows, subtle rounded cards, no brand logos, no photorealism, no watermark. Text exact, large, and minimal.
COMPOSITION: Generous whitespace, clearly separated branches, no crossing connectors.
ASPECT: 16:9, medium-high diagram complexity.
