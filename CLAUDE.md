# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Raffles IT Kit** is an AI Agent Enhancement Toolkit that extends AI coding assistants with 22 specialist agents, 25 domain-specific skills, and 12 slash command workflows. The system auto-routes tasks to relevant specialists and provides validation scripts for quality assurance.

## Repository Structure

- `agents/` — 22 specialist agents, each with `agent.yaml` (Claude format) + `prompt.md`
- `skills/` — 25 skill modules, each with `SKILL.md` and optional `scripts/`
- `workflows/` — 12 slash command workflow definitions
- `scripts/` — Python validation scripts
- `rules/` — Editor-specific rules (e.g., `GEMINI.md`)
- `.shared/` — Shared data assets (UI/UX datasets, design system CSVs)
- `configs/` — Model and runtime configuration (`model.yaml`, `runtime.yaml`, `mcp_config.json`)
- `prompts/` — Shared prompt templates (`system.md`, `planning.md`, `reflection.md`)
- `memory/` — Two-tier memory: `short_term.json` (session) + `long_term.json` (durable), indexed by `MEMORY.md`, managed by `scripts/memory_manager.py`
- `docs/` — Team guides (e.g., `PLUGINS.md` — how to use and add Claude Code plugins)
- `tests/` — Validation tests for agents and skills

## Web App Commands

All commands run from the `web/` directory:

```bash
npm run dev      # Start development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## Validation Scripts

Run from `scripts/`:

```bash
python checklist.py      # Quick validation (security, lint, types, tests, UX, SEO)
python verify_all.py     # Full verification (+ Lighthouse, E2E, bundle analysis)
python auto_preview.py   # Local preview automation
```

## Web App Architecture

The documentation site uses:
- **Next.js 15.5** with App Router (`web/src/app/`)
- **Markdown** via `marked` + `gray-matter` — agent/skill/workflow content is loaded from the `agents/`, `skills/`, and `workflows/` directories at build time (`web/src/lib/content.ts`)
- **Tailwind CSS v4** for styling — brand tokens defined in `web/src/app/globals.css`
- **No external component library** — UI is base HTML/React + Tailwind utilities
- **`next-intl`** for i18n (English + Vietnamese)
- **Custom class-based dark mode** — inline script in `layout.tsx` + CSS variables (no `next-themes`)

## Agent System Architecture

A Markdown-based configuration system — agents, skills, and workflows are `.md` files that define behavior, not code. Key concepts:

- **Agents** (`agents/`) are personas with domain expertise (e.g., `frontend-specialist`, `security-auditor`, `ai-engineer`, `data-engineer`, `orchestrator`). Each has an `agent.yaml` (Claude format with model + tools) and a `prompt.md` (system prompt). Auto-selected based on task type. Model tiers are set in `configs/model.yaml`: complex reasoning/orchestration agents run on `claude-opus-4-8`, the rest default to `claude-sonnet-4-6` (`claude-fable-5` and `claude-haiku-4-5` are also registered).
- **Skills** (`skills/`) are modular capability packs loaded on demand. Each skill directory contains a `SKILL.md` with instructions and optionally `scripts/` for automation.
- **Workflows** (`workflows/`) are slash commands (e.g., `/create`, `/debug`, `/deploy`) that orchestrate agents and skills for complex tasks.
- **Shared assets** (`.shared/`) contain design system datasets and UI/UX reference data.
- **Memory** (`memory/`) gives agents continuity across a session and across sessions. Short-term (`short_term.json`) and long-term (`long_term.json`) stores are accessed only through `scripts/memory_manager.py`; the `memory-keeper` agent, the `memory-management` skill, and the `/memory` workflow drive it.

## Deployment

CI/CD via GitHub Actions (`.github/workflows/deploy.yml`): pushes to `main` build a Docker image, push to GHCR, then deploy via CapRover CLI. Requires secrets: `CAPROVER_SERVER`, `APP_TOKEN`, `APP_NAME`. Dockerfile is at `web/Dockerfile`.

## Important Notes

- `.pen` files (Pencil design files) are encrypted and can only be read/written via the `pencil` MCP tools — never use `Read`/`Edit`/`Grep` on them.
