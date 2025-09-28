# Tasks — MVP (Agent-Friendly)

## Track 1 — Infrastructure
- [x] Create WP headless instance; enable audience taxonomy; define CPTs & taxonomies
- [x] Secure WP (MFA, WAF, read-only API token, staging vs prod)
- [x] Next.js app scaffold with dual-portal routing, ISR/SSG, SEO base
- [x] Firebase project: Auth, Firestore, Functions, Hosting
- [ ] CI: build, lint, typecheck, preview deploys; env var management

## Track 2 — Dual-Portal Content
- [x] Implement REST/GraphQL content fetcher with audience filtering
- [x] Page templates: Home, Guide listing/detail, FAQ, About, Contact
- [x] Direction-specific navigation and branding per portal
- [x] Mock content for both portals (Hungarian site: UK guides, English site: Hungary guides)
- [ ] 10 initial guides per portal (20 total) with real WordPress content

## Track 3 — Accounts & Data  
- [x] Auth UI (signup, login, reset); Profile screen
- [x] Checklist templates in WP; user checklist instance in Firestore
- [x] Firestore rules (user-scoped data)
- [ ] Direction-specific checklist templates per portal

## Track 4 — Forms & Ops
- [x] Contact form → Callable Function → validate → Firestore inbox → email notify
- [ ] Admin view for inbox (Phase 2); temporary export via console
- [ ] Analytics, cookie banner, privacy page
- [ ] Portal-specific analytics tracking

## Portal-Specific Content Tasks

### Hungarian Site (`/hu/*`) - Hungarians Moving to UK
- [ ] UK visa guides: Skilled Worker, Student, Family, Health & Care
- [ ] English language requirement guides (IELTS, TOEFL, PTE)
- [ ] UK settlement guides: GP registration, National Insurance, banking
- [ ] London housing guides and cost calculators
- [ ] UK tax and employment guides for Hungarians

### English Site (`/en/*`) - Anyone Moving to Hungary  
- [ ] Hungary residence permit guides for EU and non-EU citizens
- [ ] Budapest housing market guides and neighborhood comparisons
- [ ] Hungarian healthcare registration and TAJ card process
- [ ] Hungary work permit and employment guides
- [ ] Hungarian banking, tax, and financial system guides

## DOR / DOD
- **DOR:** audience identified, content direction clear, locale and audience taxonomy set  
- **DOD:** portal-specific content, audience filtering verified, proper taxonomy applied, analytics firing, docs updated

## Validation Criteria
- [ ] Hungarian site shows only `hu-to-uk` content in Hungarian
- [ ] English site shows only `to-hungary` content in English  
- [ ] No content overlap between portals
- [ ] Each portal has distinct branding and messaging
- [ ] WordPress audience taxonomy properly filters content
- [ ] User analytics can distinguish between portal usage