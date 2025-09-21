# HU↔UK Relocation Portal (Headless WP × Next.js × Firebase)

Bilingual, mobile-first site helping **Hungarian citizens → UK** and **UK citizens → Hungary** with trusted guides and actionable tools (forms, saved checklists, simple eligibility flows).

## Goals
- Bilingual (EN/HU), authoritative content + actionable tools
- Mobile-first performance (CDN, static rendering)
- Editor-friendly CMS
- Starts free; scales with usage

## Stack (high level)
- **Headless CMS:** WordPress (+ WPML/Polylang) for content & translations
- **Front-end:** Next.js (React), static/SSR hybrid, i18n routing
- **Backend (serverless):** Firebase (Auth, Firestore, Cloud Functions, Hosting for front-end)
- **Integration:** WP REST/GraphQL (read-only from front-end/build)

## MVP (v0.1)
- Public pages: Home, Guides (4–6), FAQs, About, Contact
- Language switch (EN/HU), locale-aware routing
- Simple **account creation** (Firebase Auth)
- **Saved checklist** prototype (Firestore)
- **Contact form** (Firestore + email via Cloud Function)
- CMS editorial workflow working end-to-end

## Non-goals (v0.1)
- Forums, complex eligibility engines, job/housing boards

## Repo map
- `README.md` – quick orientation
- `PRODUCT_BRIEF.md` – users, JTBD, MVP scope
- `ARCHITECTURE.md` – system design, data flow, URL/i18n
- `CONTENT_MODEL.md` – WP types & fields, taxonomies
- `LOCALIZATION.md` – language, routing, translation workflow
- `SECURITY_PRIVACY.md` – auth, PII, GDPR, data retention
- `ROADMAP.md` – phased plan
- `TASKS_MVP.md` – agent-friendly backlog
- `AGENTS.md` – how LLM agents collaborate
- `PROMPTS/INITIAL_PROMPT.md` – Codex bootstrap prompt
- `LICENSE.md` – MIT

## Getting Started
1. Install Node.js 20 (or newer 18 LTS) and enable `pnpm` via `corepack enable pnpm`.
2. Duplicate `.env.example` to `.env.local` and fill Firebase + WordPress credentials.
3. Install dependencies with `pnpm install`.
4. Run the web app locally with `pnpm dev` (Next.js on http://localhost:3000).
5. Launch Firebase emulators when developing auth/forms:
   ```bash
   pnpm --filter @ukhu/functions build
   firebase emulators:start --only functions,firestore
   ```
6. Execute quality gates:
   - Type checks: `pnpm typecheck`
   - Linting: `pnpm lint`
   - Unit tests: `pnpm test`

## Environment reference
See `.env.example` for all variables. Minimum required for local dev:
- Firebase client keys (`NEXT_PUBLIC_FIREBASE_*`)
- WordPress REST endpoint + token (`WP_API_URL`, `WP_API_TOKEN`)
- `NEXT_PUBLIC_DEFAULT_LOCALE`, `NEXT_PUBLIC_LOCALES`

When the CMS or Functions are not configured, the app falls back to mocked content and console logging adapters so the UI still renders.
- `NEXT_PUBLIC_SITE_URL` (used for sitemap/robots); optional `NEXT_PUBLIC_ANALYTICS_DEBUG` toggles console logging for the analytics placeholder.
