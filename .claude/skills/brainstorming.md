---
name: brainstorming
description: Socratic questioning protocol for requirements discovery. TRIGGER when user asks to build/create/make something complex, new features are requested, or requirements are vague. Ask before implementing.
allowed-tools: Read, Glob, Grep
---

# Brainstorming & Communication Protocol

> **MANDATORY:** Use for complex/vague requests, new features, unclear requirements.

## SOCRATIC GATE — When to Trigger

| Pattern | Action |
|---------|--------|
| "Build/Create/Make [thing]" without details | STOP — Ask 3 questions |
| Complex feature or architecture | Clarify before implementing |
| Update/change request | Confirm scope |
| Vague requirements | Ask purpose, users, constraints |

## MANDATORY: 3 Questions Before Implementation

1. **STOP** — Do NOT start coding
2. **ASK** — Minimum 3 questions:
   - Purpose: What problem are you solving?
   - Users: Who will use this?
   - Scope: Must-have vs nice-to-have?
3. **WAIT** — Get response before proceeding

## Dynamic Question Generation Principles

| Principle | Meaning |
|-----------|---------|
| **Questions Reveal Consequences** | Each question connects to an architectural decision |
| **Context Before Content** | Understand greenfield/feature/refactor/debug context first |
| **Minimum Viable Questions** | Each question must eliminate implementation paths |
| **Generate Data, Not Assumptions** | Don't guess — ask with trade-offs |

Question Generation Process:
1. Parse request → Extract domain, features, scale indicators
2. Identify decision points → Blocking vs. deferable
3. Generate questions → P0 (blocking) > P1 (high-leverage) > P2 (nice-to-have)

Question Format:
```
### [PRIORITY] **[DECISION POINT]**

**Question:** [Clear question]

**Why This Matters:**
- [Architectural consequence]

**Options:**
| Option | Pros | Cons | Best For |
| If Not Specified:** [Default + rationale]
```

For domain-specific question banks, see: `.agent/skills/brainstorming/dynamic-questioning.md`

## Progress Reporting

Status board during multi-step work:

| Agent | Status | Current Task | Progress |
|-------|--------|--------------|----------|
| [Name] | ✅🔄⏳❌⚠️ | [Task] | [%] |

| Icon | Meaning |
|------|---------|
| ✅ | Completed |
| 🔄 | Running |
| ⏳ | Waiting/Blocked |
| ❌ | Error |
| ⚠️ | Warning |

## Error Response Pattern

1. Acknowledge the error
2. Explain what happened (user-friendly)
3. Offer specific solutions with trade-offs
4. Ask user to choose or provide alternative

## Completion Structure

1. Success confirmation
2. Summary of what was done (concrete)
3. How to verify/test (actionable)
4. Next steps suggestion (proactive)

## Anti-Patterns

| Anti-Pattern | Why |
|--------------|-----|
| Jumping to solutions before understanding | Wastes time on wrong problem |
| Assuming requirements without asking | Creates wrong output |
| Over-engineering first version | Delays value delivery |
| "I think" phrases | Uncertainty → Ask instead |
