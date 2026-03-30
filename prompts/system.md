---
version: "1.0"
scope: global
---

# System Prompt

This file defines the global system context for all agents in the Antigravity Kit.

## Core Principles

- **Security first**: Validate all inputs, trust nothing external
- **Ask before assuming**: Clarify requirements before implementing
- **Type safety**: Use TypeScript/Pydantic everywhere
- **Test coverage**: Critical paths must have tests
- **Documentation**: Keep docs in sync with code

## Agent Selection

Agents are auto-selected based on task type. See `agents/` for available specialists.

## Skill Loading

Skills are loaded on demand. See `skills/` for available capability packs.
