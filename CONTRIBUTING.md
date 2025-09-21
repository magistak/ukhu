# Contributing

## How we work
- Small PRs, single-purpose commits, descriptive titles.
- Prefer config over custom code; keep deps lean.
- No secrets in repo. Use env vars and `.env.example`.

## Branching
- `main`: protected.  
- `feat/*`, `fix/*`, `docs/*`.

## PR checklist
- [ ] Lint/typecheck/build pass
- [ ] i18n paths preserved
- [ ] A11y basics (labels, tab order)
- [ ] Updates docs if behavior changes

## Local dev (summary)
- Node LTS, pnpm/yarn
- `apps/web`: Next.js
- Firebase emulators for Auth/Firestore/Functions
- WP: point `WP_API_URL` to staging

## Commit conventions
- `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:` 
