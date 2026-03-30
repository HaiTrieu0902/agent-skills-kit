---
name: database-design
description: Database design principles and decision-making. Use when designing schemas, choosing databases or ORMs, optimizing queries, or planning migrations.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Database Design

> Learn to THINK about data, not copy SQL patterns.

## Reference Files

Read ONLY what's relevant from `.agent/skills/database-design/`:

| File | When to Read |
|------|-------------|
| `database-selection.md` | Choosing database (PostgreSQL vs Neon vs Turso vs SQLite) |
| `orm-selection.md` | Choosing ORM (Drizzle vs Prisma vs Kysely) |
| `schema-design.md` | Normalization, PKs, relationships |
| `indexing.md` | Index types, composite indexes, when to index |
| `optimization.md` | N+1 queries, EXPLAIN ANALYZE |
| `migrations.md` | Safe migrations, serverless DBs |

## Core Principle

- **ASK** user for database preferences when unclear
- Choose database/ORM based on CONTEXT
- Don't default to PostgreSQL for everything

## Database Selection Heuristics

```
What is the deployment?
├── Serverless / Edge → Turso (LibSQL) or Neon (serverless Postgres)
├── Traditional server → PostgreSQL
├── Embedded / Local → SQLite
└── Full-text search heavy → Consider dedicated search

What is the scale?
├── Prototype / MVP → SQLite or any hosted option
├── Production web app → PostgreSQL (Neon, Supabase, Railway)
└── Edge workers → Turso (distributed SQLite)
```

## ORM Selection

| ORM | Best For |
|-----|----------|
| **Drizzle** | TypeScript-first, lightweight, SQL-like queries |
| **Prisma** | Rapid development, great DX, migrations |
| **Kysely** | Type-safe SQL builder, full control |
| **Raw SQL** | Complex queries, performance critical |

## Schema Design Principles

- Use UUIDs or cuid2 for public-facing IDs
- Add `created_at`, `updated_at` to every table
- Prefer normalized schemas; denormalize only for proven performance needs
- Document relationships with clear FK naming

## Indexing Principles

- Index foreign keys
- Index columns used in WHERE, ORDER BY, JOIN
- Composite indexes: column order matters (most selective first)
- Don't over-index (slows writes)

## Anti-Patterns

❌ Default to PostgreSQL for simple/edge apps
❌ Skip indexing on FK columns
❌ `SELECT *` in production
❌ Store JSON when structured data is better
❌ Ignore N+1 queries
❌ Run migrations without backups

## Decision Checklist

- [ ] Asked user about database preference?
- [ ] Chosen DB for THIS deployment environment?
- [ ] Planned index strategy?
- [ ] Defined relationship types?
- [ ] Migration strategy planned?

## Validation Script

```bash
python .agent/skills/database-design/scripts/schema_validator.py <project_path>
```
