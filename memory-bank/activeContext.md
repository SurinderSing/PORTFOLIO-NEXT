# Memory Bank - Active Context

## Active Focus
The current focus is **Dynamic Portfolio Data & Admin Dashboard Integration**. All portfolio data is now fully dynamic via Supabase with robust static fallbacks, an administrative control center exists under `/admin` with role-based access control, and the schema is future-ready for multi-user blog posts, stories, and comments.

---

## Decisions Made & Alignment

1. **Full Database Dynamism:** All portfolio data (contacts, experiences, education, work, about cards, summary, social links, headings, descriptions, resume PDF) is dynamically queryable via `src/lib/supabase-queries.ts` and managed via `/admin`.
2. **Prisma Deprecation Complete:** Removed `@prisma/client`, `prisma`, `mysql2`, `next-auth`, `bcryptjs`, and `nodemailer`. Updated build script to `next build`.
3. **Role-Based Admin Access:** Implemented middleware and Server Action guards requiring `profiles.role = 'ADMIN'`.
4. **Icon Resolver Ecosystem:** Created `src/utils/icon-resolver.tsx` to map database string identifiers to Lucide React icons cleanly.
5. **Future-Ready Multi-User Schema:** Prepared `blog_posts`, `stories`, and `comments` tables with RLS policies in `supabase/schema.sql`.

---

## Current Status & Next Actions

- [x] **Schema Expansion:** Updated `supabase/schema.sql` with 11 tables, triggers, and full seed data.
- [x] **Types & Query Layer:** Created `src/types/database.ts` and `src/lib/supabase-queries.ts`.
- [x] **Icon Resolver:** Created `src/utils/icon-resolver.tsx`.
- [x] **Public Page Refactors:** Updated Home, Resume, Work, Contact, and Layout with dynamic queries.
- [x] **Admin Dashboard:** Built `/admin`, `/admin/site-settings`, `/admin/contacts`, `/admin/social-links`, `/admin/about-cards`, `/admin/skills`, `/admin/experiences`, `/admin/projects`.
- [x] **Server Actions:** Implemented `src/lib/admin-actions.ts` with admin validation and ISR cache revalidation.
- [x] **Dependency Cleanup:** Removed Prisma/NextAuth/nodemailer packages and updated `package.json`.
- [x] **TypeScript & Lint Verification:** Verified with `npx tsc --noEmit` (0 errors) and `npm run lint` (0 errors/warnings).
- [x] **Production Build Verification:** Ran `npm run build` with all 22 routes compiling and optimizing cleanly.
- [x] **Documentation Sync:** Updated PRD, TRD, BACKEND_SCHEMA, APP_FLOW, and UI_UX_DESIGN_BRIEF.
