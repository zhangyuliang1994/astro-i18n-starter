---
type: mixed
density: balanced
style: vector-illustration
image_count: 5
references:
  - ref_id: 01
    filename: 01-ref-live-qa.png
    description: "A live Chinese RAG question-answering interface with answer and source panels."
---

## Illustration 1

**Position**: Article cover
**Purpose**: Establish the complete blog-to-AI knowledge loop at a glance.
**Visual Content**: MDX articles flow through automation into an AI answer with cited sources.
**Type Application**: Framework-style cover illustration.
**Filename**: cover.webp

## Illustration 2

**Position**: “整体架构” / “Overall Architecture”
**Purpose**: Clarify the separation between the static Astro site and the independent RAG service.
**Visual Content**: Browser, Astro, RAG service, Workers AI, D1, and Vectorize with request and retrieval paths.
**Type Application**: Architecture framework.
**Filename**: 01-framework-rag-architecture.webp

## Illustration 3

**Position**: “一次问答是怎么发生的” / “How One Answer Is Produced”
**Purpose**: Make the runtime RAG sequence easy to follow.
**Visual Content**: Question embedding, language-filtered vector search, D1 hydration, confidence gate, grounded generation, answer plus sources.
**Type Application**: Left-to-right flowchart.
**Filename**: 02-flowchart-question-answer.webp

## Illustration 4

**Position**: “GitHub Actions 自动同步” / “Automatic GitHub Actions Sync”
**Purpose**: Explain incremental sync, stale-chunk cleanup, and full reconciliation.
**Visual Content**: Git diff branches into add, edit, delete, plus manual full reconciliation against remote IDs.
**Type Application**: Branching flowchart with reconciliation loop.
**Filename**: 03-flowchart-auto-sync.webp

## Illustration 5

**Position**: After “基于上下文生成并返回来源” / “Generate from Context and Return Sources”
**Purpose**: Connect the backend RAG sequence to the actual reader-facing experience.
**Visual Content**: A real Chinese question, grounded answer, and cited source shown in separate interface panels.
**Type Application**: Direct product screenshot with privacy-safe site identity.
**References**: [01]
**Reference Usage**: direct
**Filename**: 04-scene-live-qa.webp
