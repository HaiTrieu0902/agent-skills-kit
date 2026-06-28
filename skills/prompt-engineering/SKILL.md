---
name: prompt-engineering
description: Principles for designing reliable prompts for LLM-backed features — structured output, few-shot, reasoning, and eval-driven iteration. Use when building, debugging, or hardening any feature that calls an LLM.
allowed-tools: Read, Glob, Grep
---

# Prompt Engineering

> Designing prompts as a deliberate, testable interface — not trial and error.

## Overview

A prompt is the contract between your app and the model. Treat it like code:
make it explicit, version it, and validate it against examples. Most "model
problems" are under-specified prompts.

## Core Principles

| Principle | What it means |
|-----------|---------------|
| **Be specific** | State the task, format, audience, and constraints. Ambiguity is filled by the model's priors, not yours. |
| **Show, don't only tell** | A few worked examples (few-shot) beat long descriptions for format/tone. |
| **Separate roles** | System prompt = durable behavior and constraints. User turn = the specific request. |
| **Constrain the output** | Demand a schema (JSON / tool call) when the result is consumed by code. |
| **Give an out** | Tell the model what to do when it can't answer ("reply `UNKNOWN`") to suppress hallucination. |

## Choosing a Technique

| Situation | Technique |
|-----------|-----------|
| Output parsed by code | **Structured output** — JSON schema or tool/function calling, validated on receipt |
| Format/tone is hard to describe | **Few-shot** — 2–5 representative examples |
| Multi-step reasoning / math | **Reasoning** — ask the model to think step by step (or use a reasoning model) |
| Long, varied inputs | **Context discipline** — put instructions first, data last; label sections with delimiters |
| Classification / extraction | **Enumerate** the allowed labels/fields explicitly |

## Structured Output

- Define the exact schema; reject and retry on validation failure rather than parsing prose.
- Prefer the provider's native tool-calling / JSON mode over "respond in JSON" in plain text.
- Keep one responsibility per call — chain calls instead of one mega-prompt.

## Reliability & Safety

- **Prompt injection:** treat retrieved/user content as untrusted data, never as instructions. Keep system instructions separate and don't let tool output silently override them.
- **Determinism:** set temperature low (0) for extraction/classification; higher only for ideation.
- **Don't bury the lede:** the most important instruction goes first and, for long contexts, is repeated at the end.

## Eval-Driven Iteration

1. Collect 10–50 real input/output examples (a golden set).
2. Change the prompt.
3. Re-run the set and compare — never judge a prompt change from one example.

(See the `llm-evaluation` skill for the full loop.)

## Anti-Patterns

| ❌ | ✅ |
|----|----|
| Tweaking against a single example | Iterate against a golden set |
| "Respond in JSON" in free text | Native structured output + validation |
| One giant prompt doing five things | Decompose into chained, single-purpose calls |
| Trusting retrieved text as instructions | Quarantine untrusted content as data |
| Vague role ("be helpful") | Concrete behavior, constraints, and failure mode |

> A good prompt is specific, constrained, and measured against examples.
