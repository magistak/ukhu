# Dual Relocation Portal (Headless WP × Next.js × Firebase)

Two separate, purpose-built portals providing trusted guides and actionable tools for specific relocation directions:

- **Hungarian Site** (`/hu/*`): For Hungarians moving to the UK (HU→UK) - content in Hungarian
- **English Site** (`/en/*`): For anyone moving to Hungary (→HU) - content in English

## Goals
- Direction-specific, authoritative content + actionable tools
- Mobile-first performance (CDN, static rendering)
- Editor-friendly CMS with audience-based content management
- Starts free; scales with usage

## Stack (high level)
- **Headless CMS:** WordPress with audience-based content taxonomy
- **Front-end:** Next.js (React), static/SSR hybrid, locale routing
- **Backend (serverless):** Firebase (Auth, Firestore, Cloud Functions, Hosting for front-end)
- **Integration:** WP REST/GraphQL (read-only from front-end/build)

## Portal Structure
### Hungarian Site (`/hu/*`) - Hungarians Moving to UK
- UK visa guides (Skilled Worker, Student, Family)
- English language requirements
- UK settlement process (GP registration, National Insurance)
- London housing and living costs
- British banking and tax obligations

### English Site (`/en/*`) - Anyone Moving to Hungary
- Hungary residence permit guides
- Budapest housing market
- Hungarian healthcare registration
- Work permits and employment
- Hungarian banking and tax system

## MVP (v0.1)
- Public pages: Home, Guides (4–6 per portal), FAQs, About, Contact
- Direction-specific routing (`/en/*`, `/hu/*`)
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
- `CONTENT_MODEL.md` – WP types & fields, taxonomies, dual-portal structure
- `LOCALIZATION.md` – direction-specific content strategy
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
4. Run the web app locally with `pnpm dev` (Next.js on http://localhost:5000).
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
- WordPress REST endpoint + credentials (`WORDPRESS_API_URL`, `WORDPRESS_API_USERNAME`, `WORDPRESS_API_PASSWORD`)

When the CMS or Functions are not configured, the app falls back to mocked content and console logging adapters so the UI still renders.
- `NEXT_PUBLIC_SITE_URL` (used for sitemap/robots); optional `NEXT_PUBLIC_ANALYTICS_DEBUG` toggles console logging for the analytics placeholder.