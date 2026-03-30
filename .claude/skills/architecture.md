---
name: architecture
description: Architectural decision-making framework. Use when making system design decisions, choosing patterns, analyzing trade-offs, or writing Architecture Decision Records (ADRs).
allowed-tools: Read, Glob, Grep
---

# Architecture Decision Framework

> "Requirements drive architecture. Trade-offs inform decisions. ADRs capture rationale."

## Reference Files

Read ONLY what's relevant from `.agent/skills/architecture/`:

| File | When to Read |
|------|-------------|
| `context-discovery.md` | Starting architecture design — questions to ask |
| `trade-off-analysis.md` | ADR templates, trade-off framework |
| `pattern-selection.md` | Choosing patterns, decision trees, anti-patterns |
| `examples.md` | MVP, SaaS, Enterprise reference implementations |
| `patterns-reference.md` | Quick pattern lookup and comparison |

## Core Principle

**"Simplicity is the ultimate sophistication."**

- Start simple
- Add complexity ONLY when proven necessary
- You can always add patterns later
- Removing complexity is MUCH harder than adding it

## Architecture Process

1. **Understand requirements** — Functional + non-functional constraints
2. **Classify context** — Greenfield / feature / refactor / migration?
3. **Identify options** — At least 2-3 realistic alternatives
4. **Analyze trade-offs** — Cost, complexity, timeline, team expertise
5. **Document decision** — Write ADR for significant choices

## ADR Template

```markdown
## ADR: [Title]

### Context
[Why are we making this decision?]

### Decision
[What are we doing?]

### Trade-offs
| Pro | Con |
|-----|-----|
| ... | ... |

### Alternatives Considered
- Option A: [Why rejected]
- Option B: [Why rejected]

### Consequences
[What happens because of this decision?]
```

## Pattern Selection Heuristics

| Scale | Start With |
|-------|-----------|
| MVP / startup | Modular monolith |
| Growing team | Modular monolith → extract services as needed |
| Proven scale issues | Microservices for specific bottlenecks |
| Event-heavy | Event-driven for those components only |

> Default to the simpler architecture. Microservices are a solution to specific organizational and scaling problems, not a default.

## Validation Checklist

- [ ] Requirements clearly understood
- [ ] Constraints identified (team, budget, timeline, tech)
- [ ] Each decision has trade-off analysis
- [ ] Simpler alternatives considered
- [ ] ADRs written for significant decisions
- [ ] Team expertise matches chosen patterns
