# Workspace-Scoped Agent Rules (.agents/AGENTS.md)

This file configures Antigravity/Gemini workspace behaviors for this project.

## Development Style
- **TypeScript First:** Ensure strict type checks. Explicitly define all return types on functions, Server Actions, API endpoints, and database queries.
- **Tailwind CSS & Clean UI:** Align styling with existing configurations. Check `src/styles/globals.css` and `src/styles/main.css` for class rules. Do not write inline styles.
- **Component Separation:** Maintain clear separation between page providers (`src/components/website/pages/page-provider`) and functional subcomponents.
- **Path Aliases:** Always write imports using absolute aliases (`@/components/...`, `@/lib/...`, `@/styles/...`, `@/types/...`, `@/utils/...`). Never use relative imports like `../../components`.

## Constraints & Requirements
- **Keep Documentation Updated (Highest Priority):** Always keep all project documentation, specifications in `/docs/`, editor rules, and memory bank files up to date alongside any codebase modifications. Documentation updates must happen concurrently with related code changes.
- **DRY & Centralized Reusable Utilities (High Priority):** If a function, utility helper, calculation, or hook is going to be used in multiple places, create it once in a shared utility/hooks/lib module (`src/utils/`, `src/hooks/`, `src/lib/`) and import/reuse it everywhere. Never duplicate identical logic across multiple files.
- **Single-Responsibility Component Design (High Priority):** Divide large components into small, focused subcomponents based on their distinct responsibilities (e.g. separate forms, list/table views, status alerts, header toolbars, and item cards into separate files). Do not bundle forms, tables, and dialogs into one monolithic component file.
- **Check for and Fix Errors/Warnings (High Priority):** Always run checks for build errors, TypeScript compiler warnings, eslint warnings, and formatting/style warnings after completing the work, and fix all of them before concluding the task.
- **Prevent Deployment Failures (High Priority):** Always run `npm run build` before concluding any task that modifies source code. If the build fails, fix all errors within the same task session. Never leave the codebase in a broken build state. Always choose the most optimized and efficient option to keep the app fast and responsive.
- **Stay in Ask Mode first:** Always stay in Ask Mode first to research the problem, find out the conclusion, create an implementation plan, and obtain user approval before starting to edit the codebase.
- **No Tests:** Do NOT create unit test suites or testing scripts.
- **No Pipelines:** Do NOT set up Github workflows or deployment configurations.
- **Database Modularity:** Portfolio data querying is centralized in `src/lib/supabase-queries.ts`, and mutations pass through `src/lib/admin-actions.ts`.

## Supabase Client Architecture
- **`@/utils/supabase/server-anon`** (`createAnonClient`): Cookieless, stateless client using `@supabase/supabase-js`. Use for all **public, read-only** queries in `supabase-queries.ts`. Allows pages to be statically generated and ISR-revalidated.
- **`@/utils/supabase/server`** (`createClient`): Cookie-based client using `@supabase/ssr` + `next/headers` `cookies()`. Use **only** for authenticated operations: Server Actions (`admin-actions.ts`), admin layout auth checks, and API routes.
- **`@/utils/supabase/client`** (`createClient`): Browser-side client using `@supabase/ssr`. Use in `'use client'` components for client-side auth (sign-in, sign-up).
- **Rule:** Never use the cookie-based server client for public data queries — it forces dynamic rendering and breaks static generation.

## Memory Preservation
- Keep project documentation current. Always synchronize workspace developments with `/memory-bank/` records.
