# Workspace-Scoped Agent Rules (.agents/AGENTS.md)

This file configures Antigravity/Gemini workspace behaviors for this project.

## Development Style
- **TypeScript First:** Ensure strict type checks. Explicitly define all return types on functions, Server Actions, API endpoints, and database queries.
- **Tailwind CSS & Clean UI:** Align styling with existing configurations. Check `src/styles/globals.css` and `src/styles/main.css` for class rules. Do not write inline styles.
- **Component Separation:** Maintain clear separation between page providers (`src/components/website/pages/page-provider`) and functional subcomponents.
- **Path Aliases:** Always write imports using absolute aliases (`@/components/...`, `@/lib/...`, `@/styles/...`, `@/types/...`, `@/utils/...`). Never use relative imports like `../../components`.

## Constraints & Requirements
- **Keep Documentation Updated (Highest Priority):** Always keep all project documentation, specifications in `/docs/`, editor rules, and memory bank files up to date alongside any codebase modifications. Documentation updates must happen concurrently with related code changes.
- **Check for and Fix Errors/Warnings (High Priority):** Always run checks for build errors, TypeScript compiler warnings, eslint warnings, and formatting/style warnings after completing the work, and fix all of them before concluding the task.
- **Stay in Ask Mode first:** Always stay in Ask Mode first to research the problem, find out the conclusion, create an implementation plan, and obtain user approval before starting to edit the codebase.
- **No Tests:** Do NOT create unit test suites or testing scripts.
- **No Pipelines:** Do NOT set up Github workflows or deployment configurations.
- **Database Modularity:** Portfolio data querying is centralized in `src/lib/supabase-queries.ts`, and mutations pass through `src/lib/admin-actions.ts`.

## Memory Preservation
- Keep project documentation current. Always synchronize workspace developments with `/memory-bank/` records.
