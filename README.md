# Job Exposure & Redeployment

Identifies roles and tasks most exposed to automation, models three- and five-year workforce scenarios, and recommends internal redeployment before layoffs.

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Prisma,
PostgreSQL, NextAuth credentials, and OpenRouter for AI workflows. Structure
and conventions mirror the `beautyhqio` reference application.

## Features
- Role/task automation exposure scoring
- Task-level exposure decomposition
- Three- and five-year scenario modeling
- Internal redeployment recommendations
- Vacancy-to-at-risk matching
- Cost-of-layoff vs. redeploy comparators
- Manager communication pack generation
- Attrition and hiring-freeze planning

## Local setup

1. Install Node.js 22 and PostgreSQL 17.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` plus
   `NEXTAUTH_SECRET`. Never use the example values in production.
3. Run:

```bash
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Then open <http://localhost:4622> and sign in with a seeded demo account
(`admin@ai-job-exposure-redeployment-intelligence.local` / `Demo!23456`).

## Release gates

```bash
npm run typecheck
npm run lint
npm run build
```

## AI workflows

AI features call OpenRouter from API routes only; the browser never receives
the API key. Set `OPENROUTER_API_KEY` (and optionally `OPENROUTER_MODEL`) in
`.env`. Without a key the AI endpoints return a deterministic local analysis
so the screens remain demonstrable offline.

## Roles

- `ADMIN` — full access, manages users and configuration
- `MANAGER` — creates and edits domain records, runs AI workflows
- `ANALYST` — read-mostly access with reporting

Every mutation is recorded in the `AuditLog` table with actor, action, and
timestamp, mirroring the auditability expectations of regulated buyers.
