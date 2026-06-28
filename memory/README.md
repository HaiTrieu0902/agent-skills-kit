# Memory — Raffles IT Kit

Two-tier memory that lets the kit's agents carry context within and across sessions.

## Files

| File | Tier | Lifetime | Written by |
|------|------|----------|-----------|
| `short_term.json` | Working memory: current context, task history, active agents | Cleared each session | Agents during a run |
| `long_term.json` | Durable facts, decisions, preferences, conventions | Persists across sessions | `memory-keeper` agent / `/memory save` |
| `MEMORY.md` | Human-readable index of long-term memory | Regenerated on every write | `memory_manager.py` (auto) |

## How it works

All reads and writes go through `scripts/memory_manager.py` so behavior is
deterministic and the index stays in sync. Do not hand-edit `long_term.json` or
`MEMORY.md` — use the CLI or the `/memory` workflow.

```bash
python scripts/memory_manager.py init                      # create files if missing
python scripts/memory_manager.py save --type decision \
    --title "Models bumped to Opus 4.8" \
    --content "Orchestrator + code-archaeologist run on claude-opus-4-8." --tags models
python scripts/memory_manager.py recall "opus"             # search
python scripts/memory_manager.py list --type decision      # filter
python scripts/memory_manager.py forget <id>               # delete
python scripts/memory_manager.py session-clear             # reset short-term
```

## Long-term entry schema

```json
{
  "id": "models-bumped-to-opus-4-8",
  "type": "decision | preference | fact | project | reference | convention",
  "title": "short title",
  "content": "the fact, in one or two sentences",
  "tags": ["models"],
  "related": ["other-entry-id"],
  "created": "2026-06-28",
  "updated": "2026-06-28"
}
```

## What belongs in long-term memory

**Save:** decisions and their rationale, user/team preferences, project goals and
constraints, naming/coding conventions, external references (dashboards, tickets).

**Do not save:** anything already in the code or git history, secrets/credentials,
or facts that only matter to the current session (those go to `short_term.json`).

See the `memory-management` skill and the `memory-keeper` agent for the full protocol.
