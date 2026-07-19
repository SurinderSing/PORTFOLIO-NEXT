# AGENTS.md - Operational Guide for AI Agents

Welcome! This repository is a Next.js 14 Web Portfolio for Surinder Singh, a Frontend Engineer.
Please read this file before performing any tasks. Detailed specifications are in `/docs/` and `/memory-bank/`.

---

## Setup & Commands

Always run these commands to set up, build, or verify the application:
- **Install dependencies:** `npm install`
- **Start development server:** `npm run dev`
- **Generate Prisma database client:** `npx prisma generate`
- **Build production bundle:** `npm run build`
- **Run lint checks:** `npm run lint`
- **Watch TypeScript compiler (dry-run):** `npm run watch`

---

## Rules and Boundaries

To maintain project integrity, follow this three-tier ruleset:

### 🟩 Always Do
- Use Next.js App Router conventions.
- Build clean, responsive UI components using Tailwind CSS and components from shadcn/ui.
- Use TypeScript with strict type checking. Ensure type annotations are accurate and complete.
- Keep components focused and reusable. Place page-specific layout wrappers inside `src/components/website/pages/`.
- Update the `/memory-bank/` files (`activeContext.md` and `progress.md`) at the end of each session or major task.

### 🟨 Ask First
- Before adding new NPM dependencies or component libraries.
- Before running database migrations (`npx prisma migrate dev`).
- Before modifying database schemas in `prisma/schema.prisma`.
- Before editing auth configuration in `src/app/api/auth/[...nextauth]/options.ts` or `src/middleware.ts`.

### 🟥 Never Do
- **Do not write unit tests** (explicitly requested by owner).
- **Do not configure CI/CD pipelines** (GitHub Actions, etc., are out of scope for now).
- Never hardcode dynamic credentials or database URLs; always read from `.env` or `.env.local`.
- Never use legacy pages router routing.

---

## Workspace Layout

- `prisma/`: Prisma database schema and migrations.
- `public/`: Public assets, including resume PDF and favicon.
- `src/`: Application source code.
  - `app/`: Next.js App Router files. Contains routing pages, route groups (`(auth)` and `(website)`), and API routes (`api/`).
  - `assets/`: Static image assets.
  - `components/`: UI and generic/reusable React components.
    - `ui/`: shadcn/ui components (buttons, badges, dropdowns, scroll-area).
    - `animations/`: Framer Motion wrapper components (`fade-in.tsx`, `scroll-reveal.tsx`).
    - `website/`: Common elements like menu-btn, logo-heading, toggle-dark-mode-btn.
  - `configs/`: Centralized site settings for server and client.
  - `context/`: React context providers (e.g. NextAuth AuthProvider).
  - `features/`: Complex page features (header, navbar, profile side section).
  - `lib/`: Store initialization, Prisma client wrapper, and global utility functions.
  - `services/`: API services (RTK Query mutation endpoints).
  - `styles/`: Fonts, global CSS, and main styles.
  - `types/`: Type definitions and declarations.
  - `utils/`: Common utility functions.
- `docs/`: Technical and design specifications.
- `memory-bank/`: Preserved context across work sessions.

---

## Key References

- **Product Vision:** [PRD.md](file:///c:/Users/ssuri/OneDrive/Documents/projects/PORTFOLIO-NEXT/docs/PRD.md)
- **Technical Blueprint:** [TRD.md](file:///c:/Users/ssuri/OneDrive/Documents/projects/PORTFOLIO-NEXT/docs/TRD.md)
- **Database Details:** [BACKEND_SCHEMA.md](file:///c:/Users/ssuri/OneDrive/Documents/projects/PORTFOLIO-NEXT/docs/BACKEND_SCHEMA.md)
- **Current Tasks:** [activeContext.md](file:///c:/Users/ssuri/OneDrive/Documents/projects/PORTFOLIO-NEXT/memory-bank/activeContext.md)
