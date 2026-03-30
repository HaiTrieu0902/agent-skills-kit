---
name: web-design-guidelines
description: Review UI code against Vercel Web Interface Guidelines. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
allowed-tools: Read, WebFetch
---

# Web Interface Guidelines

Review files for compliance with Vercel Web Interface Guidelines.

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or ask user for files/pattern)
3. Check against all rules from the fetched guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:
1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.

## Related Skill: frontend-design

| Skill | When to Use |
|-------|-------------|
| `frontend-design` | Before coding — learn design principles |
| `web-design-guidelines` (this) | After coding — audit for accessibility and best practices |

## Design Workflow

```
1. DESIGN   → Read frontend-design principles
2. CODE     → Implement the design
3. AUDIT    → Run web-design-guidelines review ← YOU ARE HERE
4. FIX      → Address findings
```
