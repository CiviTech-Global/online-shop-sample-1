# تیم‌ورکفلو — فروشگاه آنلاین فارسی‌زبان

> Team workflow for the Persian RTL e-commerce build. Defines how the agent roster collaborates, phases, and quality gates.

## Activation Modes

### Sprint Mode
- 8–15 agents
- Full Foundation Deal or larger feature
- 2–4 weeks

### Micro Mode
- 2–5 agents
- Single task, bug fix, or spike
- 1–3 days

## Lifecycle Phases

| Phase | Owner | Goal | Gate |
|---|---|---|---|
| 0 — Bootstrap | Technical Lead + Product Manager | Load roster, read proposal/roadmap, confirm mode, pick agents | G0: Context loaded |
| 1 — Requirements & UX | Product Manager + UX/UI Designer + UX Researcher | PRD, wireframes, design tokens, page inventory | G1: Design approved |
| 2 — Architecture | Technical Lead + Database Architect + API Architect + Security Engineer | Stack decisions, schema, API contract, threat model | G2: Architecture approved |
| 3 — Foundation | React Developer + Node.js Developer + DevOps Engineer | Project scaffold, DB migrations, CI/CD, auth base | G3: Foundation green build |
| 4 — Implementation Waves | All engineering agents | Catalog, cart, checkout, payment, admin, SEO, SMS | G4: Feature-complete + tests pass |
| 5 — QA & Hardening | QA Engineer + Security Engineer + Performance Benchmarker | Exploratory testing, RTL/mobile review, fixes | G5: Release sign-off |
| 6 — Deploy & Handoff | DevOps Engineer + Technical Lead + Product Manager | VPS deploy, SSL, domain, docs, training | G6: Live + handed over |

## Collaboration Rules

1. **Daily async standup:** each active agent reports progress, blockers, next step.
2. **One PR per concern:** atomic, reviewable, with screenshots/logs.
3. **Blockers escalate in 2 hours.**
4. **Scope changes require Product Manager + Technical Lead approval.**
5. **Cross-role reviews:**
   - Frontend PRs need UX/UI Designer + Senior Frontend Developer eyes.
   - Backend PRs need Database Architect + API Architect eyes.
   - Auth/payment PRs need Security Engineer review.
   - Copy/SEO changes need Persian UX Localizer + SEO Specialist.
   - SMS/notification changes need Notification Orchestrator + SMS Messaging Orchestrator.

## Output Artifacts

- PRD (`docs/PRD.md`)
- Design system (`docs/DESIGN_SYSTEM.md`)
- API contract (`docs/API.md` or OpenAPI)
- Migration/seed scripts
- Test plan (`docs/TEST_PLAN.md`)
- Deployment runbook (`docs/DEPLOY.md`)
