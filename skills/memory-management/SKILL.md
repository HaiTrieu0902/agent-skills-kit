---
name: memory-management
description: Protocol for persisting and recalling context across sessions using the kit's two-tier memory. Use when you need to remember a decision, recall prior context, record a preference or convention, or prune stale memory.
allowed-tools: Read, Grep, Glob, Bash, Write, Edit
---

# Memory Management

> The kit's durable-context protocol. Pairs with the `memory-keeper` agent and the `/memory` workflow.

## Overview

Memory has two tiers, both under `memory/`:

- **Short-term** (`short_term.json`) — working context for the current session; cleared between sessions.
- **Long-term** (`long_term.json`) — durable decisions, preferences, project facts, conventions; survives sessions. Indexed by `MEMORY.md`.

All access goes through `scripts/memory_manager.py`. Never hand-edit `long_term.json` or `MEMORY.md` — the engine keeps the schema and index in sync.

## The Engine

```bash
python scripts/memory_manager.py init                  # create files if missing
python scripts/memory_manager.py recall "<query>"      # search title/content/tags
python scripts/memory_manager.py save --type <T> --title "<...>" --content "<...>" [--tags a,b] [--related id1,id2]
python scripts/memory_manager.py list [--type <T>]
python scripts/memory_manager.py show <id>
python scripts/memory_manager.py forget <id>
python scripts/memory_manager.py session-clear
python scripts/memory_manager.py stats
```

## Recall-Before-Act

At the start of any non-trivial task:

1. `recall` using the task's key nouns.
2. Note anything relevant before you begin.
3. If a memory names a file/flag/decision, **verify it still holds** — memory reflects what was true when written.

## What to Save (and what not to)

| Type | Save when… |
|------|-----------|
| `decision` | A choice future work must respect — include the *why* |
| `preference` | The user/team states how they want things done |
| `project` | A goal/constraint/milestone not derivable from code or git |
| `convention` | A naming/structure/style rule |
| `reference` | A URL, dashboard, ticket, external resource |
| `fact` | A non-obvious truth not written down elsewhere |

**Never save:** code/README/git-derivable facts, secrets or credentials, session-only details, or duplicates.

## Curation Rules

- **Recall before saving** — if a similar entry exists, update it (forget + save), don't duplicate.
- **One fact per entry** — scannable title, one or two sentences of content.
- **Absolute dates** — convert "next sprint"/"yesterday" to a real date before saving.
- **Prune** — `forget` anything reversed or proven wrong.
- **Link** related entries with `--related`.

## Anti-Patterns

| ❌ | ✅ |
|----|----|
| Save everything "just in case" | Save only what future sessions need |
| Hand-edit JSON/index | Go through `memory_manager.py` |
| Recall after acting | Recall first |
| Trust stale memory | Verify before relying |
| Store secrets | Never |

> A small, accurate memory beats a large, doubtful one.
