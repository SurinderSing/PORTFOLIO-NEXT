# Memory Bank - Progress Log

## Project Milestones

- [x] Initial Codebase Audit & Setup Research
- [x] Root & Helper Agent Configuration Rules (.cursorrules, CLAUDE.md, copilot-instructions, etc.)
- [x] Technical & Product Documentation (PRD, TRD, APP_FLOW, Design Brief, Schema)
- [x] Context Preservation Setup (Memory Bank initialization)
- [x] Supabase Option A Auth & Database Integration
- [x] Dynamic Portfolio Data Architecture (All personal info, headings, skills, experiences, projects)
- [x] Admin Control Center Dashboard (`/admin/*`)
- [x] Future-Ready Multi-User Blog & Stories Schema Stubs with Comments
- [x] Deprecation & Removal of Prisma, MySQL, and NextAuth packages
- [x] Production Build & Linter Verification (Zero errors)
- [x] Security Hardening (Zero schema exposure, secure 403 screen, sign-out API route, two-way cascade triggers)
- [x] File Upload System (Profile photo with cropper, resume PDF, project cover images via Supabase Storage)
- [x] Live Project Previews (iframe / embed replacing static screenshot uploads)
- [x] HTML5 Drag & Drop Reordering Across All Admin Managers (Experiences, Projects, Skills & Categories, About Cards, Contacts, Social Links)
- [x] DRY Reusable Utilities, Custom Hooks & Single-Responsibility Component Modularization

---

## Detailed Task Checklist

### Phase 9: DRY Reusable Utilities, Custom Hooks & Single-Responsibility Component Modularization (100% Completed)
- [x] Update project and workspace agent rules (`AGENTS.md` and `.agents/AGENTS.md`) with High-Priority DRY and SRP mandates.
- [x] Create pure array reordering utility `src/utils/reorder.ts` (`reorderArray`).
- [x] Create custom drag-and-drop hook `src/hooks/use-drag-drop-reorder.ts` (`useDragDropReorder`).
- [x] Create shared Admin UI components (`AdminStatusBanner`, `AdminPageHeader`, `AdminDragHandle`).
- [x] Deduplicate backend batch reorder logic in `src/lib/admin-actions.ts` with `genericReorderTableItems`.
- [x] Decompose all 6 admin managers into focused subcomponents (About Cards, Contacts, Social Links, Experiences, Projects, Skills).
- [x] Run `npm run lint` and `npm run build` verification (0 warnings, 23/23 routes compiled).

### Phase 8: Drag-and-Drop Reordering in Admin Dashboard (100% Completed)
- [x] Preserve 1-based ascending `sort_order` ordering in database and public server queries.
- [x] Create 7 batch reorder server actions in `src/lib/admin-actions.ts` with `verifyAdmin()` and path revalidation.
- [x] Add drag-and-drop reordering with visual grip handles (`GripVertical`) in `/admin/experiences` (Work & Education).
- [x] Add drag-and-drop reordering in `/admin/projects`.
- [x] Add drag-and-drop reordering in `/admin/skills` for both Skill Categories and Skills within cards.
- [x] Add drag-and-drop reordering in `/admin/about-cards`.
- [x] Add drag-and-drop reordering in `/admin/contacts`.
- [x] Add drag-and-drop reordering in `/admin/social-links`.
- [x] Run `npm run lint` and `npm run build` verification (23/23 routes successfully prerendered).

### Phase 1: Core AI Agent Config (100% Completed)
- [x] Create root `AGENTS.md` operational guide.
- [x] Create `.cursorrules` config for Cursor users.
- [x] Create `CLAUDE.md` rulebook for Claude CLI.
- [x] Create `.github/copilot-instructions.md` for Copilot.
- [x] Create workspace rulebook `.agents/AGENTS.md` for Antigravity.

### Phase 2: Technical Specifications (100% Completed)
- [x] Write `docs/PRD.md` capturing dynamic data & dashboard features.
- [x] Write `docs/TRD.md` outlining frameworks, Server Actions, and env vars.
- [x] Write `docs/APP_FLOW.md` detailing router boundaries, admin groups, and access middleware.
- [x] Write `docs/UI_UX_DESIGN_BRIEF.md` defining typography, colors, and admin tokens.
- [x] Write `docs/BACKEND_SCHEMA.md` showing all 11 PostgreSQL tables, RLS policies, and triggers.

### Phase 3: Memory Bank Context (100% Completed)
- [x] Write `memory-bank/projectbrief.md` scope document.
- [x] Write `memory-bank/productContext.md` UX flows overview.
- [x] Write `memory-bank/systemPatterns.md` code patterns details.
- [x] Write `memory-bank/techContext.md` dependency configurations.
- [x] Write `memory-bank/activeContext.md` active tasks list.
- [x] Write `memory-bank/progress.md` status checklist.

### Phase 4: Dynamic Portfolio Data & Admin Dashboard (100% Completed)
- [x] Design 11 PostgreSQL tables in `supabase/schema.sql` with complete seed data.
- [x] Create database TypeScript models in `src/types/database.ts`.
- [x] Create Lucide icon resolver utility `src/utils/icon-resolver.tsx`.
- [x] Create typed server query layer `src/lib/supabase-queries.ts` with static fallbacks.
- [x] Refactor Home page (`/`) to dynamically pull site settings & about cards.
- [x] Refactor Resume page (`/resume`) with categorized skill chips & timeline entries.
- [x] Refactor Work page (`/work`) with dynamic portfolio cards & JSON-LD.
- [x] Refactor Contact page (`/contact`) with dynamic contact cards & Formspree integration.
- [x] Refactor Layout (`/`) with dynamic structured data schema for SEO.
- [x] Refactor Profile sidebar with dynamic photo, owner info, socials, and contacts.
- [x] Build Admin Dashboard shell layout (`src/app/(admin)/layout.tsx`) with role guards.
- [x] Build Admin Overview dashboard (`/admin`).
- [x] Build Site Settings editor (`/admin/site-settings`).
- [x] Build Contacts manager (`/admin/contacts`).
- [x] Build Social Links manager (`/admin/social-links`).
- [x] Build About Cards manager (`/admin/about-cards`).
- [x] Build Skills & Categories manager (`/admin/skills`).
- [x] Build Experiences timeline manager (`/admin/experiences`).
- [x] Build Projects showcase manager (`/admin/projects`).
- [x] Build Server Actions `src/lib/admin-actions.ts` with role validation and ISR revalidation.
- [x] Remove Prisma and legacy packages from `package.json`.
- [x] Verify `npm run lint` (0 errors) and `npm run build` (22 pages compiled).

### Phase 5: Security Hardening (100% Completed)
- [x] Remove all internal schema exposure (table names, UUIDs, SQL) from user-facing UI.
- [x] Implement secure 403 Access Denied screen for non-admin users.
- [x] Create dedicated `/api/auth/sign-out` route for reliable session termination.
- [x] Add two-way cascading deletion triggers (`auth.users` ↔ `public.profiles`).
- [x] Fix middleware redirect loops for authenticated non-admin users.

### Phase 6: File Uploads & Media Management (100% Completed)
- [x] Configure Supabase Storage `media` bucket architecture and RLS policies.
- [x] Build profile photo uploader with drag-and-drop & interactive image cropper modal.
- [x] Build resume PDF uploader with file size & type validation.
- [x] Build project cover image uploader in Admin Projects Manager.
- [x] Wire uploaded URLs directly to database fields (`profile_photo_url`, `resume_pdf_url`, `image_url`).
- [x] Configure Next.js remote patterns for Supabase Storage image optimization.

### Phase 7: Live Project Previews (100% Completed)
- [x] Add `preview_url` and `preview_mode` fields to `projects` table for iframe source and mode selection.
- [x] Build responsive sandboxed `LivePreview` component for Work page project cards.
- [x] Implement 6-second timeout fallback to static image when iframe is blocked or unavailable (X-Frame-Options/CSP).
- [x] Add non-interactive click overlay to ensure cards link cleanly to target URLs.
- [x] Add preview toggle and preview URL settings in Admin Projects manager (`/admin/projects`).
- [x] Update database models, default fallback data, documentation, and memory bank.

