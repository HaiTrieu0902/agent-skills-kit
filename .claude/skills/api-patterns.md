---
name: api-patterns
description: API design principles and decision-making. Use when designing REST/GraphQL/tRPC APIs, choosing API style, defining response formats, versioning, auth patterns, or rate limiting.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# API Patterns

> API design principles for 2025. Learn to THINK, not copy patterns.

## Reference Files

Read ONLY what's relevant from `.agent/skills/api-patterns/`:

| File | When to Read |
|------|-------------|
| `api-style.md` | Choosing API type (REST vs GraphQL vs tRPC) |
| `rest.md` | Designing REST endpoints |
| `response.md` | Response structure, pagination |
| `graphql.md` | Considering GraphQL |
| `trpc.md` | TypeScript fullstack projects |
| `versioning.md` | API evolution planning |
| `auth.md` | Auth pattern selection (JWT, OAuth, Passkey) |
| `rate-limiting.md` | API protection |
| `documentation.md` | OpenAPI/Swagger docs |
| `security-testing.md` | OWASP API Top 10 |

## API Style Selection

```
Consumer is:
├── Internal TypeScript fullstack → tRPC
├── Multiple clients, complex queries → GraphQL
├── External/public, simple CRUD → REST
└── Mix of clients, need flexibility → REST with OpenAPI
```

## Design Decision Checklist

Before designing an API:
- [ ] Asked user about API consumers?
- [ ] Chosen API style for THIS context?
- [ ] Defined consistent response format?
- [ ] Planned versioning strategy?
- [ ] Considered authentication needs?
- [ ] Planned rate limiting?
- [ ] Documentation approach defined?

## Anti-Patterns

❌ Default to REST for everything
❌ Use verbs in REST endpoints (`/getUsers`)
❌ Return inconsistent response formats
❌ Expose internal errors to clients
❌ Skip rate limiting
❌ No documentation

✅ Choose API style based on context
✅ Ask about client requirements
✅ Use appropriate HTTP status codes
✅ Document thoroughly

## Validation Script

```bash
python .agent/skills/api-patterns/scripts/api_validator.py <project_path>
```
