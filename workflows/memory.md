---
description: Persist and recall context across sessions. Two-tier memory — save decisions, recall prior context, prune stale entries.
---

# /memory - Durable Context

$ARGUMENTS

---

## Purpose

Manage the kit's long-term and short-term memory so work carries across sessions.
Routes to the `memory-keeper` agent and the `memory-management` skill, backed by
`scripts/memory_manager.py`.

---

## Subcommands

| Command | Action |
|---------|--------|
| `/memory recall <query>` | Search long-term memory and surface matches |
| `/memory save` | Persist a decision/preference/fact (the agent will infer type, title, tags) |
| `/memory list [type]` | List stored memories, optionally filtered by type |
| `/memory show <id>` | Show one entry in full |
| `/memory forget <id>` | Delete a stale or wrong entry |
| `/memory clear` | Reset short-term (session) memory |
| `/memory stats` | Show counts by type |

If no subcommand is given, default to `recall` using the current task context.

---

## Behavior

When `/memory` is triggered:

1. **Resolve intent** — pick the subcommand from `$ARGUMENTS` (default: `recall`).
2. **Run the engine** — execute the matching `scripts/memory_manager.py` command.
3. **For `save`** — first `recall` to avoid duplicates; if a near-match exists,
   update it (forget + save) instead of adding a new entry. Choose `type` from
   `decision | preference | fact | project | convention | reference`, write a
   scannable title, convert relative dates to absolute, and never store secrets.
4. **Report** — show what was saved/recalled/removed, with entry ids.

---

## Examples

```
/memory recall authentication
/memory save        (then: "we decided to standardize on Opus 4.8 for orchestration")
/memory list decision
/memory forget use-sonnet-for-everything
/memory clear
```

---

## Technical

Backed by:
- `python scripts/memory_manager.py <command>` — read/write engine
- Store: `memory/long_term.json` (durable), `memory/short_term.json` (session)
- Index: `memory/MEMORY.md` (auto-generated)

---

## Key Principles

- **Recall before act** — check memory at the start of non-trivial work.
- **Curate, don't hoard** — save only what future sessions need.
- **Verify stale memory** — entries reflect what was true when written.
- **Never store secrets** — keep credentials out of memory.
