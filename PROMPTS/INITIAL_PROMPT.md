# Codex Bootstrap Prompt — v0.1

**Role:** You are a careful senior full-stack engineer. Generate a minimal, working MVP repo according to the specs below. Prefer convention over configuration, small composable modules, and clear docs. Output diffs/file contents only; no explanations.

## Constraints
- No secrets in code. Read env vars; create `.env.example`.
- Keep dependencies lean. No UI kits for now.
- Strong TypeScript where applicable.
- Pass basic build/lint/test locally (include minimal tests).
- i18n: EN/HU only; path-based routing.

## Deliverables
1. **Apps & hosting**
   - `apps/web` — Next.js (latest), TypeScript, ESLint, Prettier
     - i18n routing: `/en/*`, `/hu/*`; default `/en`
     - Pages: home, guides (list/detail), faq, about, contact, profile, not-found
     - Layout: header (locale switch), footer (legal), responsive nav
     - Content loader: fetch from WP (REST or WPGraphQL; capability flag)
     - SEO base (meta, canonical, sitemap, robots)
     - Basic analytics hook (placeholder ok)
   - Deploy target: Firebase Hosting (single site)

2. **CMS integration**
   - `packages/cms-client` — thin client with typed fetchers:
     - `getGuides({locale, topic?, audience?, page?})`
     - `getGuideBySlug({locale, slug})`
     - `getFaqs({locale})`
   - Env for WP endpoints/tokens; graceful fallback if 404/translation missing

3. **Auth & data**
   - Firebase client init (modular SDK)
   - Auth flows: email/password (signup, login, reset), signout
   - Protected `/profile` page (requires auth)
   - Firestore: user document at `users/{uid}`
   - Checklist feature:
     - `packages/checklists`: types & helpers
     - UI to instantiate from a WP “Checklist Template” (mock JSON acceptable if CMS not ready)
     - Persist user checklist to `users/{uid}/checklists/{id}`

4. **Forms**
   - Contact form page with validation
   - Cloud Function (callable) `submitContactForm`:
     - Validate payload, write to `inbox/{id}` with timestamps, locale, pageRef
     - Send email via provider stub (leave adapter interface; implement a “console logger” adapter now)
   - Firestore Security Rules:
     - Only owner can read/write under `users/{uid}/**`
     - Deny direct writes to `/inbox/**`; allow only via callable function

5. **i18n**
   - `packages/i18n`: JSON locale dictionaries (`en`, `hu`) for UI strings
   - Language switch preserves current path if translation exists; else fallback to home of target locale
   - Date/number formatting by locale

6. **DX & quality**
   - Root workspace with PNPM or Yarn workspaces
   - Scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `format`
   - Minimal unit tests for:
     - i18n path resolver
     - checklist reducer/helpers
     - cms client URL builder
   - GitHub Actions:
     - On PR: install, lint, typecheck, build
     - On main: build + deploy preview to Firebase (skip if no Firebase token env)

7. **Config & docs**
   - `.env.example` with placeholders:
     - `NEXT_PUBLIC_DEFAULT_LOCALE`, `NEXT_PUBLIC_LOCALES`
     - `NEXT_PUBLIC_FIREBASE_*` (client keys)
     - `FIREBASE_EMULATORS` (true/false)
     - `WP_API_URL`, `WP_GRAPHQL_URL`, `WP_API_TOKEN` (if needed)
   - Update `README.md` quickstart with:
     - Node version, package manager
     - How to run dev (web + emulators)
     - How to set locale dictionaries
   - Keep all copy minimal/placeholder. Avoid real policy text.

## Acceptance checklist
- `apps/web` builds and serves `/en` and `/hu`
- Locale switcher toggles routes
- Contact form writes to Firestore via callable
- Auth works; `/profile` gated
- Checklist create/save works for authenticated user
- CMS client compiles and can return mocked content if env not configured
- CI passes (lint/typecheck/build)

**Proceed to:**
- Generate the monorepo structure and file contents.
- Scaffold minimal UI (unstyled or simple CSS) sufficient to validate flows.
- Where external services are not configured, include mocked adapters and clear TODOs.
