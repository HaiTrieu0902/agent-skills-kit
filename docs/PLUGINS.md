# Plugin Usage Guide — Raffles IT Kit

A team-facing guide to the Claude Code plugins enabled in this project: what each
one does, how to use it, and how to add or remove plugins.

> Plugins are bundles of slash commands, agents, skills, hooks, and MCP servers
> that extend Claude Code. They are installed from a **marketplace** and toggled
> per project in `.claude/settings.json`.

---

## 1. What's enabled here

This project enables six plugins, all from the official marketplace
(`claude-plugins-official`). The source of truth is [.claude/settings.json](../.claude/settings.json):

```json
{
  "enabledPlugins": {
    "ralph-loop@claude-plugins-official": true,
    "commit-commands@claude-plugins-official": true,
    "pr-review-toolkit@claude-plugins-official": true,
    "serena@claude-plugins-official": true,
    "figma@claude-plugins-official": true,
    "pyright-lsp@claude-plugins-official": true
  }
}
```

| Plugin | What it gives you | Type |
|--------|-------------------|------|
| `commit-commands` | Git commit / push / PR helper commands | Slash commands |
| `pr-review-toolkit` | PR review orchestration + specialist reviewer agents | Commands + agents |
| `serena` | Semantic code navigation & editing (symbol-level) | MCP server |
| `pyright-lsp` | Python type-checking & diagnostics while editing | LSP integration |
| `figma` | Figma ↔ code: read designs, generate UI, diagrams | Skills + MCP tools |
| `ralph-loop` | Run a task on an autonomous repeating loop | Slash commands |

---

## 2. How to use each plugin

### commit-commands — git workflow

| Command | Does |
|---------|------|
| `/commit-commands:commit` | Stage and create a commit with a generated message |
| `/commit-commands:commit-push-pr` | Commit, push the branch, and open a PR |
| `/commit-commands:clean_gone` | Delete local branches whose remote was deleted (`[gone]`), and their worktrees |

Use these instead of hand-typing git. They follow the repo's commit conventions.

### pr-review-toolkit — code review

- `/pr-review-toolkit:review-pr` — runs a comprehensive review using specialist agents.

The toolkit also exposes reviewer agents that Claude can dispatch automatically
after you write code, or that you can request by name:

| Agent | Focus |
|-------|-------|
| `code-reviewer` | Style-guide / best-practice adherence vs. CLAUDE.md |
| `code-simplifier` | Clarity & maintainability of recently changed code |
| `comment-analyzer` | Comment accuracy and rot |
| `pr-test-analyzer` | Test coverage completeness on a PR |
| `silent-failure-hunter` | Swallowed errors / weak error handling |
| `type-design-analyzer` | Type design, encapsulation, invariants |

Typical flow: write code → `/pr-review-toolkit:review-pr` before opening the PR.

### serena — semantic code tools

Serena runs as an MCP server giving Claude **symbol-level** code understanding
(find a symbol, find references, rename, edit a function body) instead of plain
text search. You don't call it directly — Claude uses it automatically when a
task needs precise navigation or refactoring across the codebase. Ask in plain
language, e.g. *"find every caller of `getAllAgents` and update them."*

### pyright-lsp — Python diagnostics

Provides type-checking and error diagnostics for Python files (the kit's
`scripts/` and `tests/`) through the language server. Diagnostics surface
automatically while editing; no command needed. It helps catch type errors and
undefined names before you run the scripts.

### figma — design ↔ code

Active when a task involves Figma (a Figma URL, or "build this in Figma"). Key skills:

| Skill | Use for |
|-------|---------|
| `figma-use` | Read/inspect or run actions in a Figma file (required before any Figma write) |
| `figma-generate-design` | Turn an app page/view into a Figma screen |
| `figma-generate-diagram` | Create flowcharts / architecture / ERD diagrams in FigJam |
| `figma-generate-library` | Build a design system (tokens, components, theming) |
| `figma-code-connect` | Map Figma components to code snippets |

Useful for the kit's docs/UI work — e.g. mocking the site redesign before coding.

### ralph-loop — autonomous loop

| Command | Does |
|---------|------|
| `/ralph-loop:ralph-loop` | Start an autonomous loop that repeats a task until done/cancelled |
| `/ralph-loop:cancel-ralph` | Stop the active loop |
| `/ralph-loop:help` | Explain the loop and its options |

Use for long, repetitive grinds (e.g. "fix every failing test, one by one").
Supervise it — it keeps going on its own.

---

## 3. Managing plugins

### The interactive way (recommended)

Run the plugin manager inside Claude Code:

```
/plugin
```

This opens a browser of installed marketplaces where you can install, enable,
disable, or remove plugins. Changes are written to `.claude/settings.json`.

### The manual way

Edit [.claude/settings.json](../.claude/settings.json) and add/remove an entry under
`enabledPlugins`. The key is `"<plugin>@<marketplace>"`; the value is `true`/`false`:

```json
"enabledPlugins": {
  "ralph-loop@claude-plugins-official": true,
  "some-new-plugin@claude-plugins-official": false
}
```

Restart Claude Code (or reload the window) so the change takes effect.

### Adding a marketplace

Plugins come from marketplaces (git repos or URLs). To use plugins outside the
official one, add the marketplace first:

```
/plugin marketplace add <git-url-or-name>
```

Then enable its plugins via `/plugin` or `settings.json`.

### Scope — project vs. personal

- **`.claude/settings.json`** (committed) — the plugins everyone on this project gets. Change here to standardize the team.
- **`.claude/settings.local.json`** (git-ignored) — your personal additions; not shared.
- **User-level settings** — plugins you want in *every* project, regardless of repo.

> Keep the project list in `.claude/settings.json` minimal and intentional — it's
> what every teammate inherits. Put experiments in your local/user settings.

---

## 4. Quick reference for teammates

1. Clone the repo and open it in Claude Code — the six plugins above load automatically.
2. Run `/plugin` to see what's installed and toggle anything.
3. Day-to-day: `/commit-commands:commit-push-pr` to ship, `/pr-review-toolkit:review-pr` before review.
4. To propose a new team plugin: enable it, test it, then commit the `.claude/settings.json` change with a note in your PR.
