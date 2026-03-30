# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Antigravity Kit** is an AI Agent Enhancement Toolkit that extends AI coding assistants with 20 specialist agents, 37 domain-specific skills, and 11 slash command workflows. The system auto-routes tasks to relevant specialists and provides validation scripts for quality assurance.

## Repository Structure

- `.agent/` — Core agent system (agents, skills, workflows, scripts, rules)
  - `agents/` — 20 specialist agent markdown definitions
  - `skills/` — 37 skill modules, each with a `SKILL.md` and optional `references/` and `scripts/`
  - `workflows/` — 11 slash command workflow definitions
  - `scripts/` — Python validation scripts
- `web/` — Next.js 16 documentation site (React 19, Tailwind CSS v4, MDX)

## Web App Commands

All commands run from the `web/` directory:

```bash
npm run dev      # Start development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## Validation Scripts

Run from `.agent/scripts/`:

```bash
python checklist.py      # Quick validation (security, lint, types, tests, UX, SEO)
python verify_all.py     # Full verification (+ Lighthouse, E2E, bundle analysis)
python auto_preview.py   # Local preview automation
```

## Web App Architecture

The documentation site uses:
- **Next.js 16** with App Router (`web/src/app/`)
- **MDX** for documentation pages
- **Tailwind CSS v4** for styling
- **`@base-ui/react`** as the component library
- **`shiki`** for syntax highlighting in docs
- **`next-themes`** for dark/light mode

## Agent System Architecture

The `.agent/` directory is a Markdown-based configuration system — agents, skills, and workflows are `.md` files that define behavior, not code. Key concepts:

- **Agents** are personas with domain expertise (e.g., `frontend-specialist`, `security-auditor`, `orchestrator`). They are automatically selected based on task type.
- **Skills** are modular capability packs loaded on demand. Each skill directory contains a `SKILL.md` with instructions and optionally `references/` docs and `scripts/` for automation.
- **Workflows** are slash commands (e.g., `/create`, `/debug`, `/deploy`) that orchestrate agents and skills together for complex tasks.
- **Intelligent routing** via `.agent/skills/intelligent-routing/` detects task requirements and loads the relevant specialist combination.

## Deployment

CI/CD via GitHub Actions (`.github/workflows/deploy.yml`): pushes to `main` build a Docker image, push to GHCR, then deploy via CapRover CLI. Requires secrets: `CAPROVER_SERVER`, `APP_TOKEN`, `APP_NAME`. Dockerfile is at `web/Dockerfile`.

## Important Notes

- The `.agent/` directory must NOT be in `.gitignore` — it needs to be committed for AI editor integration. Use `.git/info/exclude` for local ignores instead.
- `.pen` files (Pencil design files) are encrypted and can only be read/written via the `pencil` MCP tools — never use `Read`/`Edit`/`Grep` on them.
