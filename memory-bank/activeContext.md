# Memory Bank - Active Context

## Active Focus
The current focus is **Integrating Supabase (Option A)**. This involves replacing NextAuth with native Supabase Auth (`@supabase/ssr`) and refactoring static arrays to fetch experiences and projects dynamically from Supabase database tables, with safe static fallbacks.

---

## Decisions Made & Alignment

1. **Option A Selected:** Decided to replace NextAuth with native Supabase Auth (`@supabase/ssr`) and use the Supabase JS client for server-side and browser-side queries.
2. **Obsoleted Prisma & Credentials auth:** Deleted obsolete NextAuth routes, dependencies, and `AuthProvider` components.
3. **Trigger-Based Profiling:** Designed a trigger-based user sync mechanism that automatically duplicates Supabase auth sign-ups into a public `profiles` table to maintain administrative user roles.
4. **Dynamic Timelines with Fallbacks:** Work and Resume timeline arrays query the Supabase Server Client dynamically, defaulting gracefully to local static variables if the database is unconfigured.
5. **Experiences Sort Ordering:** Updated Resume timeline query to order by `sort_order` descending (`ascending: false`), placing the latest experiences (highest `sort_order` integer) at the top of the list.
6. **Middleware Crash Prevention:** Fixed `MIDDLEWARE_INVOCATION_FAILED` on Edge runtime by making Supabase middleware client crash-safe with fallback values and try/catch error handling.

---

## Current Status & Next Actions

- [x] **Install packages:** Installed `@supabase/supabase-js` and `@supabase/ssr`.
- [x] **Implement client configurations:** Created browser, server, and middleware clients.
- [x] **Rewrite middleware:** Integrated Supabase session handling and route guards with crash-safe fallbacks.
- [x] **Auth views:** Built beautiful, premium Sign-In, Sign-Up, and Verification Success panels.
- [x] **OTP Confirm Link exchange:** Implemented `/api/auth/confirm` route handler.
- [x] **Schema SQL script:** Created `supabase/schema.sql` including triggers and initial project/experience seeds.
- [x] **RSC Database Queries:** Refactored Work and Resume pages to dynamically pull database items ordered by sort_order descending.
- [x] **Clean NextAuth:** Deassigned NextAuth layouts wrappers and deleted AuthProvider/endpoints files.
- [x] **Documentation Sync:** Updated PRD, TRD, APP_FLOW, BACKEND_SCHEMA, schema.sql, and memory bank details.
- [x] **Update Agent Rules:** Added high-priority rule to check and fix errors, warnings, and formatting/style issues across configuration files.
- [x] **Configure Deployment URL:** Configured sitemap, robots, and layouts with `https://surinder-singh-portfolio.vercel.app/` base URL and added warning comments.
- [x] **Verification:** User configured `.env` variables and imported `supabase/schema.sql` to execute schema setup on Supabase.
