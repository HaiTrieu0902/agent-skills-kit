---
name: seo-fundamentals
description: SEO fundamentals, E-E-A-T, Core Web Vitals, and Google algorithm principles. Use when optimizing pages for search, reviewing meta tags, or implementing schema markup.
allowed-tools: Read, Glob, Grep
---

# SEO Fundamentals

> Quality content + technical excellence + patience = results.

## E-E-A-T Framework

| Principle | Signals |
|-----------|---------|
| **Experience** | First-hand knowledge, real examples |
| **Expertise** | Credentials, depth of knowledge |
| **Authoritativeness** | Backlinks, mentions, industry recognition |
| **Trustworthiness** | HTTPS, transparency, accurate info |

## Core Web Vitals

| Metric | Target | Measures |
|--------|--------|----------|
| **LCP** | < 2.5s | Loading performance |
| **INP** | < 200ms | Interactivity |
| **CLS** | < 0.1 | Visual stability |

## Technical SEO

| Element | Purpose |
|---------|---------|
| XML sitemap | Help crawling |
| robots.txt | Control access |
| Canonical tags | Prevent duplicates |
| HTTPS | Security signal |
| Clean URLs | Crawlability |

## Page Element Best Practices

| Element | Best Practice |
|---------|---------------|
| Title tag | 50-60 chars, primary keyword near front |
| Meta description | 150-160 chars, compelling CTA |
| H1 | One per page, contains main keyword |
| H2-H6 | Logical hierarchy |
| Alt text | Descriptive, not keyword-stuffed |

## Schema Markup Types

| Type | Use |
|------|-----|
| Article | Blog posts, news |
| Organization | Company info |
| Person | Author profiles |
| FAQPage | Q&A content |
| Product | E-commerce |
| BreadcrumbList | Navigation |

## AI Content Guidelines

| ✅ Do | ❌ Don't |
|-------|----------|
| AI draft + human edit | Publish raw AI content |
| Add original insights | Copy without added value |
| Expert review | Skip fact-checking |
| Follow E-E-A-T | Keyword stuffing |

## Ranking Factors (Priority Order)

1. Quality, relevant content
2. Backlinks from authority sites
3. Page experience (Core Web Vitals)
4. Mobile optimization
5. Technical SEO fundamentals

## Measurement

| Metric | Tool |
|--------|------|
| Rankings | Search Console, Ahrefs |
| Traffic | Google Analytics |
| Core Web Vitals | PageSpeed Insights |
| Indexing | Search Console |
| Backlinks | Ahrefs, Semrush |

> Run: `python .agent/skills/seo-fundamentals/scripts/seo_checker.py <project_path>`
