# Agents

## Collaboration model
- **Codex (Build Agent):** scaffolds code, config, CI, boilerplates; small PRs
- **Planner (You):** curates tasks, reviews diffs, updates docs
- **QA Agent (optional):** runs checklists (a11y/i18n/perf) and opens issues

## Guardrails for code-gen agents
- Deterministic steps; explicit diffs
- No secrets in repo; use `.env.example`
- Prefer config over ad-hoc code; keep infra minimal
- Strong typing; minimal dependencies; mock external adapters
