---
illustration_id: 02
type: flowchart
style: vector-illustration
---

RAG Question Answering Runtime - Process Flow

Use case: productivity-visual
Asset type: bilingual technical article flowchart

Layout: Left-to-right flow with six numbered rounded containers and one visible confidence decision gate.

STEPS:
1. “Question” - browser sends question, lang, topK=5.
2. “Embed” - Workers AI creates a 768-dimensional query vector.
3. “Search” - Vectorize performs cosine similarity search filtered by lang.
4. “Hydrate” - D1 loads title, URL, and original chunk text by matched IDs.
5. “Score ≥ 0.45?” - diamond decision gate; low branch returns “No confident match”.
6. “Grounded Answer” - Llama uses only retrieved context and returns answer plus sources.

CONNECTIONS: Thick blue forward arrows; a short amber low-confidence branch; teal citation cards attached to the final answer. No loops.
LABELS: Question, lang, topK=5, Embed, 768D, Search, cosine, Hydrate, D1, Score ≥ 0.45?, No confident match, Grounded Answer, Sources
COLORS: Cream-white background (#F8FAFC); blue (#3B82F6) for request stages; purple (#8B5CF6) for AI stages; teal (#14B8A6) for retrieval and sources; amber (#F59E0B) for confidence decision; navy (#10233F) text and outlines.
STYLE: Flat vector flowchart with bold arrows, crisp geometric containers, consistent line weights, minimal shadows, no logos, no photorealism, no watermark. Text exact and highly readable.
COMPOSITION: Clean composition with generous white space and a single horizontal reading direction.
ASPECT: 16:9, medium diagram complexity.
