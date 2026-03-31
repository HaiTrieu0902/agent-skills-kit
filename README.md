# Raffles IT Kit

> AI Agent Enhancement Toolkit — specialist agents, skills, and workflows for Claude Code, Cursor, and Windsurf.

<div align="center">
  <a href="https://github.com/HaiTrieu0902/agent-skills-kit" target="_blank">
    <img src="https://img.shields.io/github/stars/HaiTrieu0902/agent-skills-kit?style=for-the-badge&logo=github&color=1E7FCB" alt="GitHub Stars" />
  </a>
  <a href="https://www.npmjs.com/package/raffles-it-kit" target="_blank">
    <img src="https://img.shields.io/npm/v/raffles-it-kit?style=for-the-badge&logo=npm&color=1E7FCB" alt="npm version" />
  </a>
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-1E7FCB?style=for-the-badge" alt="MIT License" />
  </a>
</div>

---

## Quick Install

```bash
npx raffles-it-kit
```

Or install globally:

```bash
npm install -g raffles-it-kit
raffles-it-kit init
```

This copies the full agent toolkit — `agents/`, `skills/`, `workflows/`, `configs/`, `prompts/`, and `rules/` — directly into your project root.

---

## What's Included

| Component     | Count | Description                                                          |
| ------------- | ----- | -------------------------------------------------------------------- |
| **Agents**    | 19    | Specialist AI personas (frontend, backend, security, PM, QA, etc.)   |
| **Skills**    | 19    | Modular domain-specific knowledge packs, loaded on demand            |
| **Workflows** | 11    | Slash command procedures for complex multi-step tasks                |

---

## How to Use

### 1. Install the kit

```bash
# Run inside your project root
npx raffles-it-kit
```

### 2. Open in your AI editor

```bash
# Claude Code
claude .

# Or open with Cursor / Windsurf — agents are auto-detected from the workspace
```

### 3. Just describe what you need — no configuration required

Agents are **automatically selected** based on your request. You never need to pick one manually.

```
You: "Create a responsive product card with Tailwind CSS and dark mode"
AI: 🤖 Routing to frontend-specialist
    Loading skills: react-best-practices, tailwind-patterns, frontend-design

You: "Build a JWT auth API with refresh tokens and rate limiting"
AI: 🤖 Routing to backend-specialist
    Loading skills: api-patterns, nodejs-best-practices, clean-code

You: "Our login endpoint returns 500 only in production"
AI: 🤖 Routing to debugger
    Loading skills: systematic-debugging

You: "Help me prioritize the backlog for our MVP launch in 3 weeks"
AI: 🤖 Routing to product-owner
    Loading skills: plan-writing, brainstorming
```

---

## Agents

| Agent                    | Triggers on…                            |
| ------------------------ | --------------------------------------- |
| `orchestrator`           | orchestrate, coordinate, multi-step     |
| `frontend-specialist`    | component, react, UI, CSS, tailwind     |
| `backend-specialist`     | backend, server, API, endpoint, auth    |
| `database-architect`     | database, schema, migration, SQL        |
| `debugger`               | bug, error, crash, not working, fix     |
| `devops-engineer`        | deploy, docker, CI/CD, release          |
| `security-auditor`       | security, vulnerability, OWASP, XSS    |
| `penetration-tester`     | pentest, exploit, red team, offensive   |
| `test-engineer`          | test, spec, coverage, jest, playwright  |
| `qa-automation-engineer` | e2e, automated test, regression         |
| `performance-optimizer`  | performance, speed, lighthouse, memory  |
| `explorer-agent`         | explore, audit, analyse repo, map       |
| `code-archaeologist`     | legacy, refactor, reverse engineer      |
| `project-planner`        | plan, roadmap, breakdown, milestones    |
| `product-manager`        | requirements, user story, specs         |
| `product-owner`          | backlog, MVP, PRD, stakeholder          |
| `documentation-writer`   | write docs, README, changelog           |
| `seo-specialist`         | SEO, meta, sitemap, core web vitals     |

---

## Slash Command Workflows

Invoke with `/command` in Claude Code, Cursor, or Windsurf chat:

| Command          | Description                                          | Example                                          |
| ---------------- | ---------------------------------------------------- | ------------------------------------------------ |
| `/create`        | Scaffold a new feature end-to-end                    | `/create user auth with Google OAuth`            |
| `/debug`         | Structured root-cause analysis                       | `/debug payment webhook failing in production`   |
| `/plan`          | Break a large task into a sprint plan                | `/plan migrate monolith to microservices`        |
| `/deploy`        | Pre-flight checks → build → deploy → smoke test      | `/deploy to production with zero downtime`       |
| `/test`          | Generate unit, integration, and E2E tests            | `/test the auth module`                          |
| `/enhance`       | Improve performance, readability, type safety        | `/enhance the user service class`                |
| `/brainstorm`    | Socratic discovery for architecture or product ideas | `/brainstorm architecture for real-time chat`    |
| `/orchestrate`   | Coordinate multiple agents in parallel               | `/orchestrate build a full SaaS billing system`  |
| `/review`        | Code review: OWASP, performance, conventions         | `/review src/api/payments.ts`                    |
| `/status`        | Project health: tests, lint, TODOs, security flags   | `/status`                                        |
| `/ui-ux-pro-max` | Design with 50 UI styles, 21 palettes, 50 fonts      | `/ui-ux-pro-max redesign the dashboard`          |

---

## Skills

Skills are modular knowledge packs. Each agent loads its relevant skills automatically.

| Category            | Skills                                                               |
| ------------------- | -------------------------------------------------------------------- |
| **Frontend**        | `react-best-practices`, `tailwind-patterns`, `frontend-design`       |
| **Backend**         | `api-patterns`, `nodejs-best-practices`, `python-patterns`           |
| **Database**        | `database-design`                                                    |
| **Testing**         | `testing-patterns`, `tdd-workflow`, `lint-and-validate`              |
| **DevOps**          | `bash-linux`, `powershell-windows`                                   |
| **Architecture**    | `clean-code`, `mcp-builder`                                          |
| **Security**        | *(loaded by security-auditor and penetration-tester agents)*         |
| **SEO**             | *(loaded by seo-specialist agent)*                                   |

You can **edit any `SKILL.md`** to add your team's own conventions — every agent that loads that skill will follow them automatically.

---

## CLI Commands

```bash
npx raffles-it-kit           # Install kit into current directory
npx raffles-it-kit init      # Same as above
npx raffles-it-kit list      # List all available agents
npx raffles-it-kit help      # Show help
```

---

## Activate in Claude Code

**Project-local** (recommended for teams):

```bash
# After running npx raffles-it-kit, agents/ is detected automatically
claude .
```

**Global** (available across all projects):

```bash
# macOS / Linux
cp -r agents/ ~/.claude/agents/

# Windows (PowerShell)
Copy-Item -Recurse agents\ $env:USERPROFILE\.claude\agents\
```

### Important: `.gitignore` note

If you use **Cursor** or **Windsurf**, do **not** add `agents/` to `.gitignore` — the IDE won't index the agent definitions and slash commands won't appear in the chat dropdown.

To keep agents local without tracking them in Git, add to `.git/info/exclude` instead:

```
agents/
skills/
workflows/
```

---

## Documentation

- **[Getting Started Guide](https://github.com/HaiTrieu0902/agent-skills-kit#readme)** — Installation, activation, and real-world examples
- **[GitHub Repository](https://github.com/HaiTrieu0902/agent-skills-kit)** — Source code, issues, contributions

---

## Support This Project

If this toolkit saves you time, consider supporting it:

<p align="center">
  <img src="web/public/qrvcb.jpg" alt="Donate via Vietcombank" width="200" />
  <br />
  <em>Scan to donate via VCB — BUI HAI TRIEU · 1017408909</em>
</p>

---

## License

MIT © trieubh
