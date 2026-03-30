---
name: systematic-debugging
description: 4-phase systematic debugging methodology. Use when debugging complex issues, errors, or unexpected behavior. Prevents random guessing through evidence-based root cause analysis.
allowed-tools: Read, Glob, Grep, Bash
---

# Systematic Debugging

> Evidence-based debugging. Reproduce → Isolate → Understand → Fix.

## 4-Phase Debugging Process

### Phase 1: Reproduce
Before fixing, reliably reproduce the issue.

```
Reproduction Steps:
1. [Exact step to reproduce]
2. [Next step]
3. Expected: [what should happen]
   Actual:   [what does happen]

Reproduction Rate: Always / Often / Sometimes / Rare
```

### Phase 2: Isolate
Narrow down the source.

Key questions:
- When did this start happening?
- What changed recently? (`git log --oneline -20`)
- Does it happen in all environments?
- What is the smallest change that triggers it?

### Phase 3: Understand
Find the root cause, not just symptoms.

```
The 5 Whys:
1. Why: [First observation]
2. Why: [Deeper reason]
3. Why: [Still deeper]
4. Why: [Getting closer]
5. Why: [Root cause]
```

### Phase 4: Fix & Verify

- [ ] Bug no longer reproduces
- [ ] Related functionality still works
- [ ] No new issues introduced
- [ ] Regression test added

## Debugging Checklist

**Before Starting:**
- [ ] Can reproduce consistently
- [ ] Have minimal reproduction case
- [ ] Understand expected behavior

**During Investigation:**
- [ ] Check recent changes (`git log`)
- [ ] Check logs for errors
- [ ] Add targeted logging if needed
- [ ] Use debugger/breakpoints

**After Fix:**
- [ ] Root cause documented
- [ ] Fix verified
- [ ] Regression test added
- [ ] Similar code checked for same issue

## Useful Commands

```bash
git log --oneline -20
git diff HEAD~5
grep -r "errorPattern" --include="*.ts"
```

## Anti-Patterns

❌ **Random changes** — "Maybe if I change this..."
❌ **Ignoring evidence** — "That can't be the cause"
❌ **Assuming** — "It must be X" without proof
❌ **Not reproducing first** — Fixing blindly
❌ **Stopping at symptoms** — Not finding root cause
