# Memory Bank - Technical Context

## Tech Stack Dependencies

The application runs on the following dependencies (from `package.json`):
- **Core:** `next: 14.2.3`, `react: ^18`, `react-dom: ^18`
- **Database & Auth:** `@supabase/supabase-js: ^2.111.0`, `@supabase/ssr: ^0.12.4`
- **State Management:** `@reduxjs/toolkit: ^2.8.2`, `react-redux: ^9.2.0`
- **Animations:** `framer-motion: ^12.35.0`
- **Validation/Forms:** `zod: ^3.25.67`, `react-hook-form: ^7.58.1`, `@hookform/resolvers: ^5.1.1`
- **Email/Contact:** `@formspree/react: ^3.0.0`
- **Utilities:** `clsx: ^2.1.1`, `tailwind-merge: ^3.0.2`, `tailwindcss-animate: ^1.0.7`, `next-themes: ^0.4.4`, `lucide-react: ^0.476.0`
- **Linters/Prettier:** `eslint: ^8`, `eslint-config-next: ^14.2.5`, `prettier: ^3.3.3`

---

## Environment Variables Configuration

The following variables should be configured in `.env` or `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key"

# (Optional) Service role key for administrative tasks
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Base Application Host (e.g. localhost during dev or Vercel domain)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Formspree Form ID for contact form submissions
NEXT_PUBLIC_FORMSPREE_FORM_ID="xrgwgbye"
```

---

## Tooling & Dev Commands

- **Local Server:** `npm run dev`
- **Production Build:** `npm run build`
- **Linter Checker:** `npm run lint`
- **Compiler dry-run watch:** `npm run watch`

---

## 🔗 Related Knowledge & System Links
- Central Hub: [[PORTFOLIO_GRAPH|Knowledge Hub (MOC)]]
- System Patterns: [[memory-bank/systemPatterns|System Patterns]]
- Technical Specifications: [[docs/TRD|TRD]]
- Active Context: [[memory-bank/activeContext|Active Context]]

