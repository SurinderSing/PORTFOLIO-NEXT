# Memory Bank - Technical Context

## Tech Stack Dependencies

The application runs on the following key dependencies (from `package.json`):
- **Core:** `next: 14.2.3`, `react: ^18`, `react-dom: ^18`
- **Database/ORM:** `@supabase/supabase-js`, `@supabase/ssr` (Prisma remains in package.json but is unused for page queries)
- **State/API Client:** `@reduxjs/toolkit: ^2.8.2`, `react-redux: ^9.2.0`
- **Animations:** `framer-motion: ^12.35.0`
- **Validation/Forms:** `zod: ^3.25.67`, `react-hook-form: ^7.58.1`, `@hookform/resolvers: ^5.1.1`
- **Email/Contact:** `@formspree/react: ^3.0.0`, `nodemailer: ^6.10.0`
- **Utilities:** `clsx: ^2.1.1`, `tailwind-merge: ^3.0.2`, `tailwindcss-animate: ^1.0.7`, `next-themes: ^0.4.4`
- **Linters/Prettier:** `eslint: ^8`, `eslint-config-next: ^14.2.5`, `prettier: ^3.3.3`

---

## Environment Variables Configuration

The following variables must be configured in `.env` or `.env.local` to support Supabase database and auth operations:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key"

# Base Application Host (e.g. localhost during dev)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

---

## Tooling & Dev Commands

- **Local Server:** `npm run dev`
- **Compiler dry-run watch:** `npm run watch` (monitors TS types dynamically without emitting files)
- **Production Build:** `npm run build`
- **Linter Checker:** `npm run lint`

---

## Target Runtime & Deployment Platform
- **Hosting Platform:** **Vercel**
- **Database Service:** Supabase (PostgreSQL)
- **Target Node.js Version:** `v18.x` or `v20.x` LTS.
- **RSC Render Mode:** Hybrid (SSG pages revalidated dynamically + SSR dashboard routes).
