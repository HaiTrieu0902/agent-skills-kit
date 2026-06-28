---
name: llm-evaluation
description: How to evaluate LLM and agent systems — golden sets, offline/online evals, LLM-as-judge, regression in CI, and guardrails. Use when measuring or improving the quality, reliability, or cost of any LLM-backed feature.
allowed-tools: Read, Glob, Grep
---

# LLM Evaluation

> You can't improve what you don't measure — and "it looked good in the demo" isn't measurement.

## Overview

LLM outputs are non-deterministic and easy to regress silently. Evals turn
"feels better" into evidence, and catch regressions before users do. Build the
eval before you tune the prompt.

## Build a Golden Set First

- 20–100 real, representative input → expected-outcome pairs.
- Include the hard cases: edge inputs, known past failures, adversarial/injection attempts.
- Version it next to the code; grow it every time you find a new failure in production.

## Offline vs Online

| Type | When | What it answers |
|------|------|-----------------|
| **Offline** | Pre-deploy, in CI | "Did this change improve/regress the golden set?" |
| **Online** | In production | "How is it doing on real, live traffic?" |

## Picking a Metric

| Output kind | Metric |
|-------------|--------|
| Single correct answer (extraction, classification) | Exact / set match, F1 |
| Open-ended text | Rubric scoring (often **LLM-as-judge**) or human review |
| RAG answer | Faithfulness + answer relevance (see `rag-patterns`) |
| Agent/tool use | Task success rate, steps, tool-call correctness |
| All of the above | Latency and cost per request — always track |

## LLM-as-Judge (use with care)

Powerful for open-ended outputs, but has known biases:
- Give the judge an explicit **rubric** and ask for a score + justification.
- Watch for **position bias** (order of A/B), **verbosity bias** (longer ≈ "better"), and **self-preference**.
- Calibrate the judge against human labels on a sample before trusting it.
- Use a strong model as judge; prefer pairwise comparison over absolute scores when possible.

## Put It in CI

1. Run the golden set on every prompt/model/config change.
2. Fail the build on a regression beyond a threshold.
3. Track score, latency, and cost over time — a quality win that triples cost is a trade, not a win.

## Guardrails (runtime checks)

- Validate structured output against its schema; retry or fall back on failure.
- Check for injection, PII leakage, and out-of-policy content before returning.
- Log inputs/outputs (with privacy controls) so production failures become new golden-set cases.

## Anti-Patterns

| ❌ | ✅ |
|----|----|
| Eyeballing one example | Score a versioned golden set |
| Trusting LLM-judge blind | Calibrate against humans; control for bias |
| Optimizing quality only | Track quality **and** cost/latency together |
| Evals as a one-time gate | Continuous evals in CI + online monitoring |
| Discarding prod failures | Feed every failure back into the golden set |

> Ship the eval with the feature. The golden set is the spec.
