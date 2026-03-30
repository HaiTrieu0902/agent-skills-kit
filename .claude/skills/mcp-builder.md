---
name: mcp-builder
description: MCP (Model Context Protocol) server building principles. Use when building MCP servers, designing tools/resources, or configuring MCP integrations.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# MCP Builder

> Principles for building MCP servers. Simple, focused, well-documented tools.

## Core Concepts

| Concept | Purpose |
|---------|---------|
| **Tools** | Functions the AI can call |
| **Resources** | Data the AI can read |
| **Prompts** | Pre-defined prompt templates |

## Server Structure

```
my-mcp-server/
├── src/
│   └── index.ts      # Main entry
├── package.json
└── tsconfig.json
```

## Transport Types

| Type | Use |
|------|-----|
| **Stdio** | Local, CLI-based |
| **SSE** | Web-based, streaming |
| **WebSocket** | Real-time, bidirectional |

## Tool Design Principles

| Principle | Description |
|-----------|-------------|
| Clear name | Action-oriented: `get_weather`, `create_user` |
| Single purpose | One thing well |
| Validated input | Schema with types and descriptions |
| Structured output | Predictable response format |

## Input Schema

Every tool must have:
- `type: object`
- `properties`: define each parameter with type + description
- `required`: list mandatory parameters

## Resource Patterns

| Type | Use |
|------|-----|
| Static | Fixed data (config, docs) |
| Dynamic | Generated on request |
| Template | URI with parameters |

| URI Pattern | Example |
|-------------|---------|
| Fixed | `docs://readme` |
| Parameterized | `users://{userId}` |
| Collection | `files://project/*` |

## Error Handling

| Situation | Response |
|-----------|----------|
| Invalid params | Validation error message |
| Not found | Clear "not found" |
| Server error | Generic error, log details |

- Return structured errors
- Don't expose internal details
- Provide actionable messages

## Security

- Validate ALL tool inputs
- Sanitize user-provided data
- Use environment variables for API keys
- Never log secrets

## Claude Desktop Config Fields

| Field | Purpose |
|-------|---------|
| `command` | Executable to run |
| `args` | Command arguments |
| `env` | Environment variables |

## Checklist

- [ ] Clear, action-oriented tool names
- [ ] Complete input schemas with descriptions
- [ ] Structured JSON output
- [ ] Error handling for all cases
- [ ] Input validation
- [ ] Environment-based configuration
- [ ] Logging for debugging

> The AI relies on tool descriptions to use them correctly. Write descriptions as if explaining to a smart person who has no context.
