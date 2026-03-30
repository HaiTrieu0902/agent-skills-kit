# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Antigravity Kit** is an AI Agent Enhancement Toolkit that extends AI coding assistants with 20 specialist agents, 37 domain-specific skills, and 11 slash command workflows. The system auto-routes tasks to relevant specialists and provides validation scripts for quality assurance.

## Repository Structure

- `agents/` — 19 specialist agents, each with `agent.yaml` (Claude format) + `prompt.md`
- `skills/` — 19 skill modules, each with `SKILL.md` and optional `scripts/`
- `workflows/` — 11 slash command workflow definitions
- `scripts/` — Python validation scripts
- `rules/` — Editor-specific rules (e.g., `GEMINI.md`)
- `.shared/` — Shared data assets (UI/UX datasets, design system CSVs)
- `configs/` — Model and runtime configuration (`model.yaml`, `runtime.yaml`, `mcp_config.json`)
- `prompts/` — Shared prompt templates (`system.md`, `planning.md`, `reflection.md`)
- `memory/` — Agent state storage
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
- **Next.js 16** with App Router (`web/src/app/`)
- **MDX** for documentation pages
- **Tailwind CSS v4** for styling
- **`@base-ui/react`** as the component library
- **`shiki`** for syntax highlighting in docs
- **`next-themes`** for dark/light mode

## Agent System Architecture

A Markdown-based configuration system — agents, skills, and workflows are `.md` files that define behavior, not code. Key concepts:

- **Agents** (`agents/`) are personas with domain expertise (e.g., `frontend-specialist`, `security-auditor`, `orchestrator`). Each has an `agent.yaml` (Claude format with model + tools) and a `prompt.md` (system prompt). Auto-selected based on task type.
- **Skills** (`skills/`) are modular capability packs loaded on demand. Each skill directory contains a `SKILL.md` with instructions and optionally `scripts/` for automation.
- **Workflows** (`workflows/`) are slash commands (e.g., `/create`, `/debug`, `/deploy`) that orchestrate agents and skills for complex tasks.
- **Shared assets** (`.shared/`) contain design system datasets and UI/UX reference data.

## Deployment

CI/CD via GitHub Actions (`.github/workflows/deploy.yml`): pushes to `main` build a Docker image, push to GHCR, then deploy via CapRover CLI. Requires secrets: `CAPROVER_SERVER`, `APP_TOKEN`, `APP_NAME`. Dockerfile is at `web/Dockerfile`.

## Important Notes

- `.pen` files (Pencil design files) are encrypted and can only be read/written via the `pencil` MCP tools — never use `Read`/`Edit`/`Grep` on them.
