# CLAUDE.md - Rules for Claude Code Agent

This guide configures Claude Code behavior in the `PORTFOLIO-NEXT` project.

## Project Context
- **Developer Portfolio** for Surinder Singh (Frontend Developer at Gimmefy AI).
- **Core Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Redux Toolkit, Prisma (MySQL).
- **Future database migration:** Planning to transition project/resume details to Supabase database.

## Essential Commands
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Watch TS compilation:** `npm run watch`
- **Prisma Client Gen:** `npx prisma generate`

## Strict Guidelines
- **Stay in Ask Mode first:** Always start in Ask Mode first to research the problem, find out the conclusion, create an implementation plan, and obtain user approval before starting to edit the codebase.
- **Always use TypeScript:** Write components with explicit props type interface.
- **Do not write Unit Tests:** No tests are used or needed in this codebase.
- **No CI/CD:** Do not create pipeline/actions configurations.
- **Maintain design fidelity:** Style sheets use HSL CSS variables mapping Tailwind config variables. Leverage variables (`var(--primary)`, `var(--secondary)`) or HSL classes.
- **Responsive design:** Mobile layout overrides must respect `screens` map where max-widths are defined (`md: max-width 768px`, `sm: max-width 640px`).
- **Memory bank updates:** Make sure to modify `memory-bank/activeContext.md` and `memory-bank/progress.md` with active tasks state.

## Folder Map & Code Abstractions
- Routing & APIs: `src/app/`
- Custom hooks/API query hooks: `src/services/` (RTK Query endpoint structure)
- Base UI Components: `src/components/ui/`
- Layout/Routing Loader: `src/components/ui/route-loader.tsx`, `global-loader.tsx`
- Animation library wrappers: `src/components/animations/`
