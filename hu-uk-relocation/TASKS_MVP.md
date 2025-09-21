# Tasks — MVP (Agent-Friendly)

## Track 1 — Infrastructure
- [ ] Create WP headless instance; enable multilingual plugin; define CPTs & taxonomies
- [ ] Secure WP (MFA, WAF, read-only API token, staging vs prod)
- [ ] Next.js app scaffold with i18n routing, ISR/SSG, SEO base
- [ ] Firebase project: Auth, Firestore, Functions, Hosting
- [ ] CI: build, lint, typecheck, preview deploys; env var management

## Track 2 — Content & i18n
- [ ] Implement REST/GraphQL content fetcher; locale-aware loaders
- [ ] Page templates: Home, Guide listing/detail, FAQ, About, Contact
- [ ] Language switcher with path preservation
- [ ] 10 initial guides per locale incl. last-updated

## Track 3 — Accounts & Data
- [ ] Auth UI (signup, login, reset); Profile screen
- [ ] Checklist templates in WP; user checklist instance in Firestore
- [ ] Firestore rules (user-scoped data)

## Track 4 — Forms & Ops
- [ ] Contact form → Callable Function → validate → Firestore inbox → email notify
- [ ] Admin view for inbox (Phase 2); temporary export via console
- [ ] Analytics, cookie banner, privacy page

## DOR / DOD
- **DOR:** design link, fields defined, copy ready, locale keys ready  
- **DOD:** a11y pass, i18n pass, perf budgets met, analytics firing, docs updated
