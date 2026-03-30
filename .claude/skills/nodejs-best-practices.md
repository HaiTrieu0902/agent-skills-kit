---
name: nodejs-best-practices
description: Node.js development principles and decision-making. Use when building Node.js APIs, selecting frameworks (Hono/Fastify/Express/NestJS), or reviewing Node.js architecture.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Node.js Best Practices

> Principles and decision-making for Node.js development in 2025.

## Framework Selection

```
What are you building?
│
├── Edge/Serverless (Cloudflare, Vercel)
│   └── Hono (zero-dependency, ultra-fast cold starts)
│
├── High Performance API
│   └── Fastify (2-3x faster than Express)
│
├── Enterprise/Team familiarity
│   └── NestJS (structured, DI, decorators)
│
├── Legacy/Stable
│   └── Express (mature, most middleware)
│
└── Full-stack with frontend
    └── Next.js API Routes or tRPC
```

| Factor | Hono | Fastify | Express |
|--------|------|---------|---------|
| **Best for** | Edge, serverless | Performance | Legacy, learning |
| **Cold start** | Fastest | Fast | Moderate |
| **TypeScript** | Native | Excellent | Good |

Questions to ask:
1. What's the deployment target?
2. Is cold start time critical?
3. Does team have existing experience?

## Runtime Considerations (2025)

- Node.js 22+: `--experimental-strip-types` runs `.ts` files directly
- Prefer ESM (`import/export`) for new projects
- Runtimes: Node.js (ecosystem), Bun (performance), Deno (security-first)

## Architecture: Layered Structure

```
Request Flow:
├── Controller/Route Layer — HTTP specifics, input validation
├── Service Layer — Business logic, framework-agnostic
└── Repository Layer — Data access, ORM interactions
```

Why: Testability, flexibility, single responsibility.

## Async Patterns

| Pattern | Use When |
|---------|----------|
| `async/await` | Sequential async operations |
| `Promise.all` | Parallel independent operations |
| `Promise.allSettled` | Parallel where some can fail |
| `Promise.race` | Timeout or first response wins |

- Never use sync methods in production (`fs.readFileSync`)
- Offload CPU-intensive work to worker threads
- Use streaming for large data

## Validation Libraries

| Library | Best For |
|---------|----------|
| **Zod** | TypeScript-first, inference |
| **Valibot** | Smaller bundle |
| **ArkType** | Performance critical |

Validate at: API entry, before DB operations, external data, env vars at startup.

## HTTP Status Codes

| Situation | Status |
|-----------|--------|
| Bad input | 400 |
| Missing auth | 401 |
| No permission | 403 |
| Not found | 404 |
| Conflict | 409 |
| Validation fail | 422 |
| Server error | 500 |

## Security Checklist

- [ ] Input validation on all inputs
- [ ] Parameterized queries (no string concatenation)
- [ ] Password hashing: bcrypt or argon2
- [ ] JWT: always verify signature and expiry
- [ ] Rate limiting
- [ ] Security headers (Helmet.js)
- [ ] CORS properly configured
- [ ] Secrets via environment variables only

## Testing Strategy

| Type | Purpose | Tools |
|------|---------|-------|
| **Unit** | Business logic | node:test, Vitest |
| **Integration** | API endpoints | Supertest |
| **E2E** | Full flows | Playwright |

## Decision Checklist

- [ ] Asked user about stack preference?
- [ ] Chosen framework for THIS context?
- [ ] Considered deployment target?
- [ ] Planned error handling?
- [ ] Identified validation points?
- [ ] Considered security requirements?

## Anti-Patterns

❌ Use Express for new edge projects (use Hono)
❌ Use sync methods in production
❌ Put business logic in controllers
❌ Hardcode secrets
❌ Block event loop with CPU work
