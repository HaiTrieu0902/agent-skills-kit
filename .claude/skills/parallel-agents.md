---
name: parallel-agents
description: Multi-agent orchestration patterns for Claude Code. Use when multiple independent tasks benefit from different domain expertise, or when comprehensive analysis requires multiple perspectives simultaneously.
allowed-tools: Read, Glob, Grep
---

# Parallel Agents — Claude Code Orchestration

> Coordinate multiple specialist agents through Claude Code's native Agent tool.

## When to Orchestrate

✅ **Good for:**
- Complex tasks requiring multiple expertise domains
- Code analysis from security + performance + quality perspectives
- Comprehensive reviews (architecture + security + testing)
- Feature implementation needing backend + frontend + database work

❌ **Not for:**
- Simple, single-domain tasks
- Quick fixes or small changes
- Tasks where one agent suffices

## Invocation Patterns

### Single Agent
```
Use the security-auditor agent to review authentication
```

### Sequential Chain
```
First, use the explorer-agent to discover project structure.
Then, use the backend-specialist to review API endpoints.
Finally, use the test-engineer to identify test gaps.
```

### With Context Passing
```
Use the frontend-specialist to analyze React components.
Based on those findings, have the test-engineer generate component tests.
```

## Orchestration Patterns

### Pattern 1: Comprehensive Analysis
```
1. explorer-agent: Map codebase structure
2. security-auditor: Security posture
3. backend-specialist: API quality
4. frontend-specialist: UI/UX patterns
5. test-engineer: Test coverage
6. Synthesize all findings
```

### Pattern 2: Feature Review
```
1. Identify affected domains
2. Invoke relevant domain agents
3. test-engineer verifies changes
4. Synthesize recommendations
```

### Pattern 3: Security Audit
```
1. security-auditor: Configuration and code review
2. penetration-tester: Active vulnerability testing
3. Synthesize with prioritized remediation
```

## Available Specialist Agents

| Agent | Expertise |
|-------|-----------|
| `orchestrator` | Multi-agent coordination |
| `frontend-specialist` | React, Next.js, UI/UX |
| `backend-specialist` | APIs, Node.js, server |
| `database-architect` | Schema, Prisma, migrations |
| `security-auditor` | Security compliance |
| `penetration-tester` | Offensive security testing |
| `test-engineer` | Testing strategies |
| `debugger` | Root cause analysis |
| `devops-engineer` | CI/CD, Docker |
| `performance-optimizer` | Speed, Web Vitals |
| `seo-specialist` | SEO, ranking |
| `project-planner` | Planning, task breakdown |
| `explorer-agent` | Codebase discovery |
| `documentation-writer` | Docs, README |
| `mobile-developer` | iOS, Android, React Native |

## Claude Code Built-in Agents

| Agent | Model | Purpose |
|-------|-------|---------|
| **Explore** | Haiku | Fast read-only codebase search |
| **Plan** | Sonnet | Research during plan mode |
| **General-purpose** | Sonnet | Complex multi-step modifications |

Use **Explore** for quick searches, specialist agents for domain expertise.

## Synthesis Protocol

After all agents complete:

```markdown
## Orchestration Synthesis

### Agent Contributions
| Agent | Finding |
|-------|---------|
| security-auditor | Found X |
| backend-specialist | Identified Y |

### Consolidated Recommendations
1. **Critical**: [Issue from Agent A]
2. **Important**: [Issue from Agent B]
3. **Nice-to-have**: [Enhancement from Agent C]

### Action Items
- [ ] Fix critical security issue
- [ ] Refactor API endpoint
- [ ] Add missing tests
```

## Best Practices

1. Discovery → Analysis → Implementation → Testing (logical order)
2. Pass relevant findings to subsequent agents
3. One unified synthesis report, not separate outputs
4. Always include test-engineer for code modifications
