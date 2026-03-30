---
name: python-patterns
description: Python development principles and decision-making. Use when building Python APIs, selecting frameworks (FastAPI/Django/Flask), handling async, or structuring Python projects.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Python Patterns

> Principles for Python development in 2025. THINK, don't memorize patterns.

## Framework Selection

```
What are you building?
│
├── API-first / Microservices
│   └── FastAPI (async, modern, fast)
│
├── Full-stack web / CMS / Admin
│   └── Django (batteries-included)
│
├── Simple / Script / Learning
│   └── Flask (minimal, flexible)
│
├── AI/ML API serving
│   └── FastAPI (Pydantic, async, uvicorn)
│
└── Background workers
    └── Celery + any framework
```

| Factor | FastAPI | Django | Flask |
|--------|---------|--------|-------|
| **Best for** | APIs, microservices | Full-stack, CMS | Simple, learning |
| **Async** | Native | Django 5.0+ | Via extensions |
| **Admin** | Manual | Built-in | Via extensions |

Questions to ask:
1. Is this API-only or full-stack?
2. Need admin interface?
3. Team familiar with async?

## Async vs Sync Decision

```
async def — use when:
├── I/O-bound (database, HTTP, file)
├── Many concurrent connections
└── FastAPI/Starlette/Django ASGI

def (sync) — use when:
├── CPU-bound operations
├── Blocking libraries (no async version)
└── Simple scripts
```

Golden rule: I/O-bound → async | CPU-bound → sync + multiprocessing

| Async need | Library |
|------------|---------|
| HTTP client | httpx |
| PostgreSQL | asyncpg |
| Redis | redis-py async |
| File I/O | aiofiles |
| ORM | SQLAlchemy 2.0 async |

## Type Hints Strategy

Always type:
- Function parameters
- Return types
- Class attributes
- Public APIs

Use Pydantic for: API models, configuration, data validation, serialization.

## Project Structure

```
Small — main.py, utils.py, requirements.txt

Medium API:
app/
├── main.py
├── models/
├── routes/
├── services/
└── schemas/

Large:
src/myapp/
├── core/
├── api/
├── services/
├── models/
└── ...
```

## FastAPI Best Practices

- Use `async def` for I/O-bound endpoints
- Use `def` for CPU-bound (FastAPI runs it in threadpool)
- Use Depends() for: DB sessions, auth, shared resources
- Pydantic models for request/response validation

## Django Best Practices (2025)

- Fat models, thin views
- `select_related()` for FK, `prefetch_related()` for M2M
- Async views for external API calls and WebSocket
- Class-based views for complex CRUD

## Background Tasks

| Solution | Best For |
|----------|----------|
| **BackgroundTasks** | Simple, in-process, fire-and-forget |
| **Celery** | Distributed, complex workflows |
| **ARQ** | Async, Redis-based |
| **RQ** | Simple Redis queue |

## Testing

```python
# pytest-asyncio for async tests
@pytest.mark.asyncio
async def test_endpoint():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/users")
        assert response.status_code == 200
```

Common fixtures: `db_session`, `client`, `authenticated_user`, `sample_data`

## Decision Checklist

- [ ] Asked user about framework preference?
- [ ] Decided async vs sync?
- [ ] Planned type hint strategy?
- [ ] Defined project structure?
- [ ] Planned error handling?
- [ ] Considered background tasks?

## Anti-Patterns

❌ Default to Django for simple APIs
❌ Use sync libraries in async code
❌ Skip type hints for public APIs
❌ Put business logic in routes/views
❌ Ignore N+1 queries
