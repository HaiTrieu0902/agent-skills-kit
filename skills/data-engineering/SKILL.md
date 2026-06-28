---
name: data-engineering
description: Modern data pipeline design — ELT, ingestion, transformation, orchestration, warehouse/lakehouse modeling, and data quality. Use when building or reviewing data pipelines, warehouses, data marts, or analytics infrastructure.
allowed-tools: Read, Glob, Grep
---

# Data Engineering

> Move data reliably, transform it transparently, and make it trustworthy.

> Complements `database-design` (which covers OLTP schema/indexing). This skill is about analytics pipelines and warehousing.

## Overview

A data platform turns raw operational data into clean, modeled, queryable
datasets for BI, analytics, and ML. The goals: correctness, reproducibility,
and freshness — in that order.

## ELT vs ETL

| Pattern | Transform happens | Use when |
|---------|-------------------|----------|
| **ELT** | Inside the warehouse, after load | Default today — cloud warehouses are cheap to compute, transforms are versioned SQL |
| **ETL** | Before load, in a separate engine | Heavy pre-processing, strict pre-load compliance, or non-SQL transforms |

## The Stack (roles, not products)

```
sources → ingestion → raw/landing → transform (modeled) → marts → BI / ML
                              ↑ orchestration + data quality run across all stages
```

| Layer | Responsibility |
|-------|----------------|
| **Ingestion** | Land raw data; capture changes (CDC); be **idempotent** and replayable |
| **Transform** | Version-controlled SQL (e.g. dbt-style): staging → intermediate → marts |
| **Orchestration** | Schedule, sequence, retry, backfill (Airflow / Dagster / Prefect) |
| **Warehouse / Lakehouse** | Store and serve modeled data at query time |
| **Data quality** | Tested assertions on freshness, volume, nullability, uniqueness |

## Modeling

| Approach | Use for |
|----------|---------|
| **Dimensional (star schema / Kimball)** | BI and self-serve analytics — fact + dimension tables, conformed dimensions |
| **Wide / one-big-table** | Performance-critical dashboards, denormalized for read speed |
| **Medallion (bronze→silver→gold)** | Layered refinement in a lakehouse |

- Separate **staging** (clean/rename, 1:1 with source) from **marts** (business logic).
- Make models **idempotent** and prefer **incremental** processing for large tables (process new/changed rows, not full refresh).

## Reliability Principles

| Principle | Why |
|-----------|-----|
| **Idempotency** | A re-run produces the same result — safe retries and backfills |
| **Incrementality** | Process deltas, not the whole table, for cost and speed |
| **Data contracts** | Producers agree on schema/semantics so pipelines don't silently break |
| **Lineage** | Know what feeds what — for impact analysis and debugging |
| **Tests as code** | Freshness, row-count, uniqueness, referential checks run in the pipeline |

## Data Quality Checks

- **Freshness:** is the data recent enough?
- **Volume:** row counts within expected bounds (catch silent drops/dupes).
- **Schema:** expected columns and types present.
- **Integrity:** uniqueness of keys, no orphaned references, accepted value ranges.

## Anti-Patterns

| ❌ | ✅ |
|----|----|
| Full-refresh everything nightly | Incremental + idempotent models |
| Business logic scattered in dashboards | Centralize logic in versioned transforms |
| No tests on data | Freshness/volume/integrity assertions in CI |
| Undocumented lineage | Track dependencies; one source of truth per metric |
| Transform during ingestion (ad hoc) | Land raw, then transform in modeled layers |

> Raw data is an asset only after it is clean, modeled, tested, and traceable.
