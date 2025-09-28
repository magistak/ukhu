# ADR 0001 — Headless WP + Next.js + Firebase

## Decision
Use WordPress as headless CMS; Next.js front-end; Firebase for Auth/DB/Functions/Hosting.

## Status
Accepted (v0.1)

## Context
- Need editor-friendly CMS, dual-portal content management, low-cost scaling, mobile-first performance.
- Avoid server maintenance; prefer CDN + serverless.

## Consequences
+ Great UX/perf; scalable costs
+ Editors work in familiar UI
– Two systems to operate (WP + front-end)
– Preview flow needs custom wiring
