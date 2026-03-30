---
name: webapp-testing
description: Web application testing principles — E2E, Playwright, and deep audit strategies. Use when writing E2E tests, setting up Playwright, or creating comprehensive test coverage for web apps.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Web App Testing

> Discover and test everything. Leave no critical route untested.

## Automated Scripts

```bash
# Basic browser test
python .agent/skills/webapp-testing/scripts/playwright_runner.py https://example.com

# With screenshot
python .agent/skills/webapp-testing/scripts/playwright_runner.py <url> --screenshot

# Accessibility check
python .agent/skills/webapp-testing/scripts/playwright_runner.py <url> --a11y
```

Requires: `pip install playwright && playwright install chromium`

## Deep Audit Approach

Discovery first:
| Target | How to Find |
|--------|-------------|
| Routes | Scan app/, pages/, router files |
| API endpoints | Grep for HTTP methods |
| Components | Find component directories |
| Features | Read documentation |

Then: **Map** → **Scan** → **Test**

## Testing Pyramid

```
        /\          E2E (Few) — Critical user flows
       /  \
      /----\        Integration (Some) — API, data flow
     /      \
    /--------\      Component (Many) — Individual UI pieces
```

## E2E Test Priority

| Priority | Tests |
|----------|-------|
| 1 | Happy path user flows |
| 2 | Authentication flows |
| 3 | Critical business actions |
| 4 | Error handling |

## Playwright Best Practices

| Practice | Why |
|----------|-----|
| Use `data-testid` | Stable selectors |
| Use built-in auto-wait assertions | Avoid flaky tests |
| Clean state per test | Independent tests |
| Test user behavior, not implementation | Resilient tests |

Recommended config:
- Retries: 2 on CI
- Trace: on-first-retry
- Screenshots: on-failure
- Video: retain-on-failure

## Page Object Model

Encapsulate page interactions in classes:
```
pages/
├── LoginPage.ts
├── DashboardPage.ts
└── CheckoutPage.ts
```

## Test Organization

```
tests/
├── e2e/           # Full user flows
├── integration/   # API, data
├── component/     # UI units
└── fixtures/      # Shared data
```

Naming: `user-can-checkout.spec.ts` (descriptive, behavior-focused)

## API Testing Coverage

| Area | Tests |
|------|-------|
| Status codes | 200, 400, 404, 500 |
| Response shape | Matches schema |
| Error messages | User-friendly |
| Edge cases | Empty, large, special chars |

## CI Pipeline

```yaml
steps:
  - Install dependencies
  - Install browsers (playwright install)
  - Run tests
  - Upload artifacts (traces, screenshots on failure)
```

Parallelization: per-file (default), sharding for large suites.

## Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| Test implementation details | Test user behavior |
| Hardcode `sleep()` waits | Use auto-wait |
| Skip test cleanup | Isolate each test |
| Ignore flaky tests | Fix root cause |

> E2E tests are expensive. Use them for critical paths only. Most coverage should be unit + integration.
