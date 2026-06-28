---
name: observability
description: Production observability — structured logging, metrics, distributed tracing (OpenTelemetry), SLOs, and actionable alerting. Use when instrumenting a service, debugging production behavior, or setting up monitoring.
allowed-tools: Read, Glob, Grep
---

# Observability

> Logs tell you what happened, metrics tell you how much, traces tell you where.

## Overview

Observability is the ability to ask new questions about a running system
*without shipping new code*. You get it by instrumenting for the three signals
and correlating them. Monitoring watches known failures; observability lets you
investigate unknown ones.

## The Three Signals

| Signal | Answers | Shape |
|--------|---------|-------|
| **Logs** | "What exactly happened in this request?" | Structured (JSON) events with context |
| **Metrics** | "How many / how fast, over time?" | Cheap numeric aggregates, time series |
| **Traces** | "Where did the time/failure go across services?" | Spans linked by a trace ID |

Correlate them: put the **trace ID** in logs and metrics so you can pivot between signals for one request.

## Structured Logging

- Emit JSON, not free text — machine-queryable fields, not string-grepping.
- Attach context to every line: request id, trace id, user/tenant, operation.
- Log **decisions and errors**, not noise. One good event beats ten redundant ones.
- Never log secrets or PII; redact at the logging boundary.

## Metrics: RED & USE

| Method | For | Track |
|--------|-----|-------|
| **RED** | Request-driven services | **R**ate, **E**rrors, **D**uration |
| **USE** | Resources (CPU, disk, queues) | **U**tilization, **S**aturation, **E**rrors |

Prefer **histograms** for latency (so you get p50/p95/p99), not averages — averages hide tail pain. Watch **cardinality**: high-cardinality labels (user id, url with ids) explode metric cost — keep them in logs/traces instead.

## Tracing

- Use **OpenTelemetry** — a vendor-neutral standard for traces/metrics/logs, so you aren't locked to one backend.
- Propagate context across service boundaries so a request is one connected trace.
- Instrument the boundaries that matter: inbound handlers, outbound calls, DB queries, queue work.

## SLOs & Alerting

- Define **SLIs** (e.g. % of requests < 300ms) and an **SLO** target (e.g. 99.9%); the gap is your **error budget**.
- **Alert on symptoms users feel** (error rate, latency, budget burn) — not on causes (high CPU) that may not affect anyone.
- Every alert must be **actionable** and link to a runbook. Noisy alerts get ignored, then real ones get missed.

## Anti-Patterns

| ❌ | ✅ |
|----|----|
| `print` / unstructured logs | Structured JSON with trace/request ids |
| Averages for latency | Histograms → p95/p99 |
| Alert on CPU/memory directly | Alert on user-facing symptoms + SLO burn |
| High-cardinality metric labels | Keep ids in logs/traces, not metric dimensions |
| Vendor-locked instrumentation | OpenTelemetry, swap backends freely |
| Logging secrets/PII | Redact at the boundary |

> Instrument for the question you'll wish you could ask at 3 a.m.
