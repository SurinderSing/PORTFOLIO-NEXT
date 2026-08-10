# AGENTS.md - Operational Guide for AI Agents

Welcome! This repository is a Next.js 14 Web Portfolio and Admin Dashboard for Surinder Singh, a Frontend Engineer.
Please read this file before performing any tasks. Detailed specifications are in `/docs/` and `/memory-bank/`.

---

## Setup & Commands

Always run these commands to set up, build, or verify the application:
- **Install dependencies:** `npm install`
- **Start development server:** `npm run dev`
- **Build production bundle:** `npm run build`
- **Run lint checks:** `npm run lint`
- **Watch TypeScript compiler (dry-run):** `npm run watch`

---

## Rules and Boundaries

To maintain project integrity, follow this three-tier ruleset:

### 🟩 Always Do
- **Keep Documentation Updated (Highest Priority):** Always update the repository documentation (`/docs/` specifications, instruction rules, memory bank files, and any related contexts) in the same PR or task session as the code changes. Never let documentation get out of sync with code modifications.
- **DRY & Centralized Reusable Utilities (High Priority):** If a function, utility helper, calculation, or hook is going to be used in multiple places, create it once in a shared utility/hooks/lib module (`src/utils/`, `src/hooks/`, `src/lib/`) and import/reuse it everywhere. Never repeat identical or copy-pasted logic across multiple files.
- **Single-Responsibility Component Design (High Priority):** Divide and structure components into small, focused subcomponents based on their distinct responsibilities (e.g. extract forms, list/table views, status alerts, header toolbars, and item cards into separate files). Do not bundle forms, tables, and dialogs into one monolithic component file.
- **Check for and Fix Errors/Warnings (High Priority):** Always run checks for build errors, TypeScript compiler warnings, eslint warnings, and formatting/style warnings after completing the work, and fix all of them before concluding the task.
- **Prevent Deployment Failures (High Priority):** Always run `npm run build` before concluding any task that modifies source code. If the build fails, fix all errors within the same task session. Never leave the codebase in a broken build state.
- **Prefer Static Generation & Performance:** Always choose the most optimized and efficient approach. Prefer static generation (SSG) and ISR over `force-dynamic` for public pages. Keep the app fast and responsive. Use the anonymous Supabase client (`@/utils/supabase/server-anon`) for public read-only queries, and the cookie-based client (`@/utils/supabase/server`) only for authenticated operations.
- **Suspense Boundaries for Client Hooks:** Always wrap `useSearchParams()`, `usePathname()`, and similar client hooks that prevent static prerendering inside a `<Suspense>` boundary.
- Use Next.js App Router conventions.
- Build clean, responsive UI components using Tailwind CSS and components from shadcn/ui.
- Use TypeScript with strict type checking. Ensure type annotations are accurate and complete.
- Keep components focused and reusable. Place page-specific layout wrappers inside `src/components/website/pages/`.
- Update the `/memory-bank/` files (`activeContext.md` and `progress.md`) at the end of each session or major task.

### 🟨 Ask First
- Always stay in Ask Mode first to research, find out the conclusion, create an implementation plan, and obtain user approval before starting to edit the codebase.
- Before adding new NPM dependencies or component libraries.
- Before modifying database schemas in `supabase/schema.sql`.
- Before editing auth configuration in `src/utils/supabase/` or `src/middleware.ts`.

### 🟥 Never Do
- **Do not write unit tests** (explicitly requested by owner).
- **Do not configure CI/CD pipelines** (GitHub Actions, etc., are out of scope for now).
- Never hardcode dynamic credentials or database keys; always read from `.env` or `.env.local`.
- Never use legacy pages router routing.

---

## Workspace Layout

- `supabase/`: Supabase database schema, RLS policies, triggers, and migrations (`schema.sql`).
- `public/`: Public assets, including resume PDF, favicon, and project graphics.
- `src/`: Application source code.
  - `app/`: Next.js App Router files. Contains routing pages, route groups (`(auth)`, `(website)`, `(admin)`), and API routes (`api/`).
  - `assets/`: Static image assets.
  - `components/`: UI and generic/reusable React components.
    - `ui/`: shadcn/ui components (buttons, badges, dropdowns, scroll-area).
    - `animations/`: Framer Motion wrapper components (`fade-in.tsx`, `scroll-reveal.tsx`, `animated-divider.tsx`).
    - `website/`: Common elements like menu-btn, logo-heading, toggle-dark-mode-btn.
  - `configs/`: Centralized site settings for server and client.
  - `features/`: Complex page features (header, navbar, profile side section).
  - `lib/`: Data queries layer (`supabase-queries.ts`), Server Actions (`admin-actions.ts`), Redux store, and utility functions.
  - `styles/`: Fonts, global CSS, and main styles.
  - `types/`: Database models (`database.ts`) and TypeScript declarations.
  - `utils/`: Supabase client wrappers (`server.ts` for auth, `server-anon.ts` for public queries, `client.ts` for browser) and icon resolver (`icon-resolver.tsx`).
- `docs/`: Technical and design specifications (`PRD.md`, `TRD.md`, `BACKEND_SCHEMA.md`, `APP_FLOW.md`, `UI_UX_DESIGN_BRIEF.md`).
- `memory-bank/`: Preserved context across work sessions.
