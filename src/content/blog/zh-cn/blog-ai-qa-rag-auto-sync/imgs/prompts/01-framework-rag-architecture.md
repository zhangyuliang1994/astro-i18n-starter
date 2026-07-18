---
illustration_id: 01
type: framework
style: vector-illustration
---

Static Blog + Cloudflare RAG Architecture - Conceptual Framework

Use case: infographic-diagram
Asset type: bilingual technical article architecture diagram

STRUCTURE: Three-column system architecture with clear boundaries and two distinct paths.

ZONES:
- Left column, “STATIC SITE”: browser question form above an Astro content stack; label the outbound request “QUESTION”.
- Middle column, “RAG SERVICE”: one protected edge service with two lanes: question flow and sync flow. Show a small lock on the sync lane.
- Right column, “CLOUDFLARE”: three separate nodes: Workers AI, D1, Vectorize.
- Solid blue arrows: Browser → RAG service → Workers AI / Vectorize → D1 → RAG service → Browser.
- Dashed teal arrows: GitHub Actions → admin lane → Workers AI → D1 + Vectorize.

LABELS: STATIC SITE, Astro, QUESTION, RAG SERVICE, QUESTION FLOW, SYNC FLOW, Workers AI, D1, Vectorize, GitHub Actions
COLORS: Off-white background (#F8FAFC); navy (#10233F) containers; blue (#3B82F6) public path; teal (#14B8A6) sync path; purple (#8B5CF6) AI node; amber (#F59E0B) lock accent.
STYLE: Precise flat vector framework with rounded rectangles, bold connectors, simple recognizable icons, subtle grid alignment, no brand logos, no photorealism, no watermark. Text should be exact, large, and minimal.
COMPOSITION: Clean composition with generous white space. Strong grouping boundaries and no crossing arrows.
ASPECT: 16:9, medium diagram complexity.
