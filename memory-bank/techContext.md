# Memory Bank - Technical Context

## Tech Stack Dependencies

The application runs on the following key dependencies (from `package.json`):
- **Core:** `next: 14.2.3`, `react: ^18`, `react-dom: ^18`
- **Database/ORM:** `@prisma/client: ^6.4.0`, `prisma: ^6.4.0`, `mysql2: ^3.12.0`
- **State/API Client:** `@reduxjs/toolkit: ^2.8.2`, `react-redux: ^9.2.0`
- **Auth:** `next-auth: ^4.24.11`, `bcryptjs: ^3.0.2`
- **Animations:** `framer-motion: ^12.35.0`
- **Validation/Forms:** `zod: ^3.25.67`, `react-hook-form: ^7.58.1`, `@hookform/resolvers: ^5.1.1`
- **Email/Contact:** `@formspree/react: ^3.0.0`, `nodemailer: ^6.10.0`
- **Utilities:** `clsx: ^2.1.1`, `tailwind-merge: ^3.0.2`, `tailwindcss-animate: ^1.0.7`, `next-themes: ^0.4.4`
- **Linters/Prettier:** `eslint: ^8`, `eslint-config-next: ^14.2.5`, `prettier: ^3.3.3`

---

## Environment Variables Configuration

The following variables must be configured in `.env` or `.env.local` to support database and auth operations:

```bash
# Prisma MySQL Connection URI
DATABASE_URL="mysql://username:password@hostname:3006/database_name"

# Base Application Host (e.g. localhost during dev)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# NextAuth Encryption Secret
NEXTAUTH_SECRET="your-32-character-secret-hash-here"

# SMTP Nodemailer Credentials
EMAIL_USER="your-auth-email@domain.com"
EMAIL_PASS="your-secure-app-password"
```

---

## Tooling & Dev Commands

- **Local Server:** `npm run dev`
- **Compiler dry-run watch:** `npm run watch` (monitors TS types dynamically without emitting files)
- **Generate Client:** `npx prisma generate` (must run after schema edits or before project build compilation)
- **Production Build:** `npm run build`
- **Linter Checker:** `npm run lint`

---

## Target Runtime & Deployment Platform
- **Hosting Platform:** **Vercel**
- **Database Service:** Managed MySQL instance (planned for Supabase PostgreSQL replacement in future steps).
- **Target Node.js Version:** `v18.x` or `v20.x` LTS.
- **RSC Render Mode:** Hybrid (SSG canonical portfolio pages + SSR dynamic dashboard routes).
