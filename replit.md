# AdaptGoal AI

A full-stack adaptive goal coaching app with conversational AI user profiling, AI-powered goal decomposition into progressive milestones, daily personalized motivational prompts, and completion rate tracking.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/adaptgoal run dev` — run the frontend (port 25589)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL`, `OPENAI_API_KEY`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, shadcn/ui, wouter, TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- AI: OpenAI gpt-4o-mini (streaming SSE)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- `lib/db/src/schema/` — all DB table definitions
- `lib/api-client-react/` — generated TanStack Query hooks
- `lib/api-zod/` — generated Zod schemas for server validation
- `artifacts/api-server/src/routes/` — all Express route handlers
- `artifacts/adaptgoal/src/pages/` — all frontend pages
- `artifacts/adaptgoal/src/index.css` — design tokens and theme
- `lib/integrations-openai-ai-server/src/client.ts` — OpenAI client (reads `OPENAI_API_KEY`)

## Architecture decisions

- Contract-first: OpenAPI spec drives both generated React Query hooks and Zod validation schemas
- SSE streaming for all AI operations (goal decomposition, prompt generation, onboarding chat)
- Single user profile (no multi-user auth) — profile is upserted, not keyed by user ID
- `OPENAI_API_KEY` secret used directly; `lib/integrations-openai-ai-server` patched to fall back to it from `AI_INTEGRATIONS_OPENAI_API_KEY`
- TanStack Query configured with no-retry on 4xx errors to avoid infinite spinner on 404 (no profile)

## Product

- **Onboarding**: conversational AI chat profiles the user's personality, habits, and ambitions
- **Dashboard**: goals overview, stats (streaks, completion rates), today's motivational prompt, activity feed
- **Goals**: create/manage goals; AI decomposes each into 5-8 progressive milestones via SSE
- **Goal detail**: view and check off milestones; trigger AI re-decomposition
- **Prompts**: view and generate personalized daily motivational prompts via SSE

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after changing `openapi.yaml`, then `pnpm --filter @workspace/db run push` after changing DB schema
- The `lib/integrations-openai-ai-server` client checks for `AI_INTEGRATIONS_OPENAI_API_KEY` first, then `OPENAI_API_KEY` — do not revert this fallback
- `useGetProfile()` returns a 404 ApiError when no profile exists — the QueryClient must have `retry: false` for 4xx errors or the onboarding spinner loops forever
- SSE endpoints use raw `fetch` on the frontend (not generated hooks) because they stream

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
