---
name: clean-code
description: Pragmatic coding standards — concise, direct, no over-engineering. TRIGGER when writing or reviewing any code. Enforces SRP, DRY, KISS, YAGNI, guard clauses, and pre-edit dependency checks.
allowed-tools: Read, Write, Edit
priority: CRITICAL
---

# Clean Code — Pragmatic AI Coding Standards

> Be **concise, direct, and solution-focused**.

## Core Principles

| Principle | Rule |
|-----------|------|
| **SRP** | Each function/class does ONE thing |
| **DRY** | Extract duplicates, reuse |
| **KISS** | Simplest solution that works |
| **YAGNI** | Don't build unused features |
| **Boy Scout** | Leave code cleaner than you found it |

## Naming Rules

| Element | Convention |
|---------|------------|
| **Variables** | Reveal intent: `userCount` not `n` |
| **Functions** | Verb + noun: `getUserById()` not `user()` |
| **Booleans** | Question form: `isActive`, `hasPermission` |
| **Constants** | SCREAMING_SNAKE: `MAX_RETRY_COUNT` |

> If you need a comment to explain a name, rename it.

## Function Rules

| Rule | Description |
|------|-------------|
| **Small** | Max 20 lines, ideally 5-10 |
| **One Thing** | Does one thing, does it well |
| **One Level** | One level of abstraction per function |
| **Few Args** | Max 3 arguments |
| **No Side Effects** | Don't mutate inputs unexpectedly |

## Code Structure

| Pattern | Apply |
|---------|-------|
| **Guard Clauses** | Early returns for edge cases |
| **Flat > Nested** | Avoid deep nesting (max 2 levels) |
| **Composition** | Small functions composed together |
| **Colocation** | Keep related code close |

## AI Coding Style

| Situation | Action |
|-----------|--------|
| User asks for feature | Write it directly |
| User reports bug | Fix it, don't explain |
| No clear requirement | Ask, don't assume |

## Anti-Patterns (DON'T)

| ❌ Pattern | ✅ Fix |
|-----------|-------|
| Comment every line | Delete obvious comments |
| Helper for one-liner | Inline the code |
| Factory for 2 objects | Direct instantiation |
| utils.ts with 1 function | Put code where used |
| Deep nesting | Guard clauses |
| Magic numbers | Named constants |
| God functions | Split by responsibility |

## Before Editing ANY File (MANDATORY)

Ask yourself:
- **What imports this file?** They might break
- **What does this file import?** Interface changes
- **What tests cover this?** Tests might fail
- **Is this a shared component?** Multiple places affected

> Edit the file + all dependent files in the SAME task. Never leave broken imports.

## Self-Check Before Completing (MANDATORY)

| Check | Question |
|-------|----------|
| ✅ Goal met? | Did I do exactly what user asked? |
| ✅ Files edited? | Did I modify all necessary files? |
| ✅ Code works? | Did I test/verify the change? |
| ✅ No errors? | Lint and TypeScript pass? |
| ✅ Nothing forgotten? | Any edge cases missed? |

> If ANY check fails, fix it before completing.
