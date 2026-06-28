---
name: rag-patterns
description: Retrieval-Augmented Generation design — when to use it, chunking, embeddings, hybrid search, reranking, grounding, and evaluation. Use when building Q&A over documents, knowledge assistants, or any LLM feature grounded in private data.
allowed-tools: Read, Glob, Grep
---

# RAG Patterns

> Ground model answers in your data instead of its memory.

## Overview

RAG retrieves relevant context at query time and feeds it to the model, so
answers reflect *your* corpus and can cite sources. The hard part is retrieval
quality — the model can only be as good as what you give it.

## Do You Even Need RAG?

| Need | Approach |
|------|----------|
| Answer over a private/changing corpus | **RAG** |
| Whole corpus fits in the context window and is small/stable | **Long-context** (skip retrieval) |
| Change *behavior/format/tone*, not knowledge | **Fine-tune / prompt**, not RAG |
| Real-time facts (prices, status) | **Tool/API call**, not RAG |

## The Pipeline

```
ingest → chunk → embed → store → retrieve → (rerank) → assemble context → generate → cite
```

## Chunking

- Split on **semantic boundaries** (headings, paragraphs), not fixed byte counts.
- Typical chunk: a few hundred tokens with small overlap; tune to your content.
- Keep metadata (source, section, date) on every chunk — needed for filtering and citations.

## Retrieval

| Technique | Use for |
|-----------|---------|
| **Vector (semantic)** search | Meaning/paraphrase matches |
| **Keyword (BM25)** search | Exact terms, codes, names, acronyms |
| **Hybrid** (vector + keyword) | Default — combines both, usually best recall |
| **Reranking** (cross-encoder) | Reorder top-N for precision before sending to the model |
| **Metadata filters** | Scope by tenant, date, permission — apply before/with search |

Improve recall with **query rewriting** (expand/clarify the user question) and
multi-query retrieval when questions are short or ambiguous.

## Generation & Grounding

- Instruct the model to answer **only** from the provided context and to say so when the context is insufficient.
- Require **citations** back to chunk metadata so answers are verifiable.
- Keep the most relevant chunks first; don't overstuff context (recall ≠ relevance).

## Evaluation

| Layer | Question | Metric |
|-------|----------|--------|
| Retrieval | Did we fetch the right chunks? | recall@k, hit rate |
| Generation | Is the answer supported by context? | faithfulness / groundedness |
| End-to-end | Is the answer correct & useful? | answer relevance (often LLM-as-judge) |

(Use the `llm-evaluation` skill for the harness.)

## Failure Modes

| Symptom | Likely cause |
|---------|--------------|
| Right docs exist but not retrieved | Bad chunking / vector-only search → add keyword/hybrid + rerank |
| Retrieves docs but answer is wrong | Context overstuffed or not instructed to ground → trim, demand citations |
| Confident wrong answers | No "insufficient context" path → add an explicit out |
| Stale answers | Re-embedding not triggered on source change → wire ingestion to updates |

## Anti-Patterns

| ❌ | ✅ |
|----|----|
| Fixed-size byte chunks | Semantic chunks + metadata |
| Vector search only | Hybrid + reranking |
| No citations | Cite chunk sources |
| No retrieval evals | Measure recall before blaming the model |

> Most RAG quality problems are retrieval problems. Fix retrieval first.
