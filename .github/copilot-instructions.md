# GitHub Copilot Instructions for PORTFOLIO-NEXT

When assisting developers in this repository, GitHub Copilot must follow these guidelines:

## Core Technical Context
- **Next.js Version:** 14.2.3 (App Router). Always construct routing and page layouts using route groups (e.g. `(website)` and `(auth)` layouts).
- **TypeScript:** Strict type checking enabled. Ensure props interfaces are declared.
- **Styling:** Tailwind CSS 3.4. Custom Tailwind colors map HSL CSS variables defined in `@layer base` (`src/styles/globals.css`).
- **Prisma + MySQL:** Prisma ORM handles database operations. Keep schemas clean and indexed properly (e.g. `@@index([email])`).
- **Redux:** Redux Toolkit handles store actions, RTK Query performs API requests.

## Workflow Rules & Guidelines
1. **Keep Documentation Updated (Highest Priority):** Always keep all project documentation, specifications in `/docs/`, editor rules, and memory bank files up to date alongside any codebase modifications. Documentation updates must happen concurrently with related code changes.
2. **Ask First & Plan:** Always stay in Ask Mode first to research the problem, find out the conclusion, create an implementation plan, and obtain user approval before starting to edit the codebase.
3. **No Unit Tests:** Do not generate or suggest unit tests.
4. **No CI/CD Configurations:** Do not recommend or build GitHub Action files.
5. **Database Migration to Supabase:** Design frontend services and dynamic views to be database-agnostic where possible, anticipating a future migration to Supabase.
6. **CSS variables for layouts:** Always utilize existing custom class hierarchy (like `para-1`, `para-2` for text formatting, `section-container` for layout constraints).
7. **Interactive UI animations:** Incorporate framer motion wrapper animations (`FadeIn`, `ScrollReveal`) for clean interactive micro-interactions.
8. **Code standards:** Match Prettier rules (2 tab space, single quotes, es5 trailing commas).

