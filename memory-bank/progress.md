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
- [x] Navigation Performance Optimization & Route Transition Polish
- [x] Complete Portfolio UI/UX Redesign Aligned with Figma Specifications
- [x] Phase 15: Dynamic Blog, REST API Layer, Interactive Comments Engine & Admin Blog Manager
- [x] Phase 16: Custom Cyber/Terminal Boot Loader & Visual Boot Sequence
- [x] Phase 17: WYSIWYG Editor Smart Toggle & Robust DOM Unwrapping Engine
- [x] Phase 18: Mobile Button Stability & Blog Save Cache Synchronization
- [x] Phase 19: Experience & Skills-Aligned Technical Blog System (10 In-Depth Articles)
- [x] Phase 20: Auth Flow, Verification Redirection & Post-Login Navigation Polish
- [x] Phase 21: Vercel Speed Insights & Web Analytics Integration
- [x] Phase 22: Middleware Dashboard Deprecation & Role-Based Auth Redirects
- [x] Phase 23: Sign-Up Form Placeholder Sanitization
- [x] Phase 24: SEO Optimization & #1 Google Ranking Infrastructure
- [x] Phase 25: Core Web Vitals & Runtime Performance Optimization

---

## Detailed Task Checklist

### Phase 25: Core Web Vitals & Runtime Performance Optimization (100% Completed)
- [x] Configure stationary background dots on scroll and smooth delayed cursor trailing field in AntigravityBackground.
- [x] Redesign AntigravityBackground particle geometry from lines/pins to circular micro-dots with 50% lighter opacity.
- [x] Optimize `GlobalLoader` to be session-aware using `sessionStorage` so it only displays once per browsing session.
- [x] Accelerate `TerminalLoader` progression rate to ~300ms-400ms without altering aesthetics or cyber status stages.
- [x] Defer `AntigravityBackground` particle canvas with `requestIdleCallback`, adaptive mobile spacing, and `visibilitychange` suspension.
- [x] Throttle `CustomCursor` DOM traversals via `requestAnimationFrame` and passive listeners.
- [x] Verify `npm run lint` and `npm run build` compile cleanly with 0 errors across 36 static pages.

### Phase 24: SEO Optimization & #1 Google Ranking Infrastructure (100% Completed)
- [x] Create dynamic async sitemap (`src/app/sitemap.ts`) fetching published blog posts from database with accurate priorities.
- [x] Construct Google-compliant JSON-LD `@graph` with `WebSite`, `ProfilePage`, and `Person` schemas in `src/app/(website)/layout.tsx`.
- [x] Ingest `BreadcrumbList` structured data across all subpages (`/work`, `/resume`, `/blog`, `/blog/[slug]`, `/contact`).
- [x] Implement Web App Manifest (`src/app/manifest.ts`) for PWA and mobile indexing.
- [x] Add dynamic OpenGraph and Twitter card image generators (`src/app/(website)/opengraph-image.tsx`, `twitter-image.tsx`).
- [x] Refine `robots.ts` with host and crawling directives.
- [x] Add 301 Netlify redirect (`_redirects`), canonical link, and meta-refresh in `inder-dev-portfolio` to transfer PageRank to `PORTFOLIO-NEXT`.
- [x] Remove redundant `src/app/(website)/contact/layout.tsx`.
- [x] Run `npm run lint` and `npm run build` to verify 0 errors across 36 static pages.

### Phase 23: Sign-Up Form Placeholder Sanitization (100% Completed)
- [x] Replace personal details (`Surinder`, `Singh`, `admin@surinder.dev`, `admin_user`, `+91 9876543210`) in `src/components/auth/sign-up/form/index.tsx` with generic placeholders (`john_doe`, `John`, `Doe`, `john.doe@example.com`, `+15551234567`).
- [x] Retain confirmed neutral placeholders on `/sign-in`.
- [x] Run `npm run build` to verify 0 errors.

### Phase 22: Middleware Dashboard Deprecation & Role-Based Auth Redirects (100% Completed)
- [x] Redirect `/dashboard` and `/dashboard/*` to `/admin` and `/admin/*` in `src/utils/supabase/middleware.ts`.
- [x] Route signed-in users on `/sign-in` and `/sign-up` to `/admin` if role is `ADMIN`, or `/blog` if general member.
- [x] Verify production build passes with 0 errors via `npm run build`.

### Phase 21: Vercel Speed Insights & Web Analytics Integration (100% Completed)
- [x] Install `@vercel/speed-insights` and `@vercel/analytics` in `package.json`.
- [x] Integrate `<SpeedInsights />` and `<Analytics />` into `src/app/(website)/layout.tsx`.
- [x] Verify production build passes with 0 errors via `npm run build`.

### Phase 20: Auth Flow, Verification Redirection & Post-Login Navigation Polish (100% Completed)
- [x] Update `src/app/(auth)/sign-in/page.tsx` default redirect target to `/blog` (preserving dynamic `?redirect=` param for protected routes).
- [x] Generalize `/sign-in` and `/sign-up` headings, placeholder values, and action buttons to be user-friendly for all members.
- [x] Update `src/utils/supabase/middleware.ts` to redirect authenticated visitors from `/sign-in` and `/sign-up` to `/blog` instead of `/dashboard`.
- [x] Retain `NEXT_PUBLIC_BASE_URL="http://localhost:3000"` while adding `NEXT_PUBLIC_SITE_URL="https://surinder-singh-portfolio.vercel.app"` in `.env` and `.env.example`.
- [x] Synchronize email templates in Supabase Dashboard and configure Site URL & Redirect whitelist for production.
- [x] Run `npm run build` verification to ensure 0 build errors.

### Phase 19: Experience & Skills-Aligned Technical Blog System (100% Completed)
- [x] Author 10 authentic, industry-grade technical blog articles aligning with Surinder's career (Paytm, Gimmefy AI, Dialmantra, Amotus Online, Drishti IAS) and skills (Docker, Kubernetes, Cloud, SSR/CSR/SSG/ISR, Supabase, Firebase, WebSockets/WebRTC, AI Canvas, Next.js 14, Redux Toolkit).
- [x] Seed and publish all 10 blog posts in Supabase cloud database (`public.blog_posts`) under Admin author.
- [x] Seed authentic discussion comments and author replies into `public.comments`.
- [x] Update `src/lib/supabase-queries.ts` with comprehensive fallback dataset (`defaultBlogPosts` and `defaultComments`) for static build generation and offline resilience.
- [x] Run `npm run build` and `npm run lint` verification.

### Phase 18: Mobile Button Stability & Blog Save Cache Synchronization (100% Completed)
- [x] Enhance base button CSS resets with `touch-action: manipulation;`, `-webkit-appearance: none;`, `appearance: none;`, and touch callout resets.
- [x] Refine `buttonVariants` in `src/components/ui/button.tsx` to use GPU-accelerated active feedback without aggressive scale distortion.
- [x] Enhance `CommentForm` with responsive stacking, `shrink-0`, `min-w-[130px]`, `min-h-[38px]`, and `<Loader2 />` spinner.
- [x] Enhance `BlogPostForm` and admin `BlogForm` action buttons with responsive wrapping, `shrink-0`, `min-h`, and loaders.
- [x] Enhance `TerminalContactForm` and `ContactForm` submit buttons with spinners and non-squishing min-widths.
- [x] Update `updateUserBlogPostAction`, `updateBlogPostAction`, `createUserBlogPostAction`, and comment actions to ensure complete cache revalidation (`/blog/[slug]`, `/blog/${slug}`, `/blog`, `/admin/blogs`, `/`).
- [x] Purge Next.js client router cache on article edit/creation redirects via `router.refresh()`.
- [x] Run `npm run lint` (0 errors) and `npm run build` (27/27 routes compiled successfully).

### Phase 17: WYSIWYG Editor Smart Toggle & Robust DOM Unwrapping Engine (100% Completed)
- [x] Implement robust `toggleBlockquote` handler in `src/components/website/pages/blog/rich-text-editor.tsx` that unwraps blockquotes when active.
- [x] Implement smart `toggleHeading` handler to toggle active headings (H1/H2/H3) back to `<p>` paragraphs and unwrap outer blockquotes/pre blocks.
- [x] Implement `toggleCodeBlock` to unwrap `<pre><code>` blocks into editable paragraphs.
- [x] Implement `toggleList`, `toggleInline`, and robust link editing/removal (`handleLink`).
- [x] Enhance `updateActiveFormats` to inspect both DOM hierarchy and native query states for accurate toolbar active button feedback.
- [x] Support `<s>`, `<del>`, `<strike>`, and multi-line blockquotes in `htmlToMarkdown` & `markdownToHtml`.
- [x] Run `npm run build` and `npm run lint` verification.

### Phase 16: Custom Cyber/Terminal Boot Loader & Visual Boot Sequence (100% Completed)
- [x] Design and build modular, typed `TerminalLoader` component (`src/components/ui/terminal-loader.tsx`).
- [x] Integrate cyber terminal styling, traffic light indicators, and pulsing status dot `INDER_DEV_ENGINE // v2.4`.
- [x] Implement syntax-highlighted code simulation block with custom lines requested by user.
- [x] Build glowing neon progress bar with dynamic percentage counter and contextual status ticker.
- [x] Implement instant skip/fast-forward via Escape key and click listener.
- [x] Integrate with `GlobalLoader` (`src/components/ui/global-loader.tsx`) with client hydration safety.
- [x] Validate build with `npm run lint` (0 errors) and `npm run build` (28/28 routes compiled).

### Phase 15: Dynamic Blog, REST API Layer, Interactive Comments Engine & Admin Blog Manager (100% Completed)
- [x] Build dedicated REST API endpoints (`/api/blog/like`, `/api/blog/reaction`) with server-side auth validation.
- [x] Create centralized client API service (`src/services/blogApi.ts`) with in-flight request deduplication and caching.
- [x] Decouple UI components (`LikeButton`, `CommentsSection`) from inline database queries into clean service calls.
- [x] Optimize `useClientAuth` hook to eliminate duplicate session and profile queries.
- [x] Create public blog feed (`/blog`) with search, tag filtering, reading time estimates, and engagement stats.
- [x] Create article reader (`/blog/[slug]`) with normalized markdown, code copying, bullet lists, and cover images.
- [x] Create admin blog management dashboard (`/admin/blogs`) with interactive editor and live preview.
- [x] Run `npm run lint` (0 warnings/errors) and `npm run build` (28/28 routes compiled).

### Phase 12: Custom Cursor, In-App Modals, Dynamic HTML Heading & Experience Achievements (100% Completed)
- [x] Build reusable in-app delete confirmation modal (`AdminDeleteModal`) with monospace styling and loading indicators.
- [x] Replace native `window.confirm()` across all 6 admin managers with `AdminDeleteModal` and isolate drag events.
- [x] Add `description` (bullet points) and `technologies` columns to `public.experiences` in Supabase with live row migration.
- [x] Update Admin Experience manager form and table with multi-line textarea and technology tags.
- [x] Implement dual-layer spring-smoothed `CustomCursor` with shape morphing (Pointer, Text I-Beam, Form Beacon, Drag Ring).
- [x] Mount `CustomCursor` with top-level `zIndex: 999999` across website and admin control center.
- [x] Add HTML parsing support (`html-react-parser`) to `HeroSection` for `home_heading` with `<h1>` `<span>` green accent styling.
- [x] Perform comprehensive dynamic data audit across all pages and components.
- [x] Synchronize database schema (`supabase/schema.sql`), specification docs (`docs/BACKEND_SCHEMA.md`), and memory bank records.

### Phase 11: Complete Portfolio UI/UX Redesign Aligned with Figma Specifications (100% Completed)
- [x] Integrate Google Fonts `JetBrains_Mono` (`--font-mono`) and `Inter` (`--font-sans`).
- [x] Configure Emerald Green (`#22C55E` / `142 71% 45%`) color tokens and dark/light mode palette in `globals.css` and `main.css`.
- [x] Implement unified `TopNavbar` with dynamic brand logo, status dot indicator, navigation items, and theme toggle.
- [x] Implement dynamic `Footer` with DB-driven ownership credits and social media links.
- [x] Build single-page flowing Home experience with `HeroSection` (`$ whoami`), `SkillsGrid`, `ExperiencePreview`, `FeaturedWork`, and `ContactTeaser`.
- [x] Redesign Work page (`/work`) with terminal breadcrumb (`$ ls -la ./projects`), Systems & Architecture cards, and GitHub callout.
- [x] Redesign Resume page (`/resume`) with terminal breadcrumb (`$ cat resume.md`), profile header with PDF download, and skills matrix.
- [x] Redesign Contact page (`/contact`) with interactive code transmission form (`~/contact/transmission.sh`), System Status panel, and Network Nodes.
- [x] Redesign Auth pages (`/sign-in`, `/sign-up`) with monospace aesthetic, terminal branding, and theme toggle support.
- [x] Refresh Admin Control Center (`/admin/*`) with new typography and status indicators.
- [x] Run `npm run lint` (0 warnings/errors), `npx tsc --noEmit` (0 errors), and `npm run build` (23/23 routes compiled and prerendered).

### Phase 10: Navigation Performance Optimization & Route Transition Polish (100% Completed)
- [x] Replace full-screen blocking overlay (`fixed inset-0 z-[9999]`) in `src/app/(website)/loading.tsx` with non-blocking inline page skeleton.
- [x] Create dedicated `src/app/(admin)/admin/loading.tsx` skeleton for instant feedback across all admin subpages.
- [x] Add `<Suspense><RouteLoader /></Suspense>` progress bar to `src/app/(admin)/layout.tsx`.
- [x] Optimize Next.js middleware matcher in `src/middleware.ts` to only target auth-protected routes.
- [x] Add fast-path bypass in `src/utils/supabase/middleware.ts` to skip Supabase `getUser()` network calls on public routes.
- [x] Run `npm run lint` (0 warnings/errors) and `npm run build` (23/23 routes compiled successfully).

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

### Phase 13: Resume Content Synchronization, Dynamic Parity & UI Polishing (100% Completed)
- [x] Seed real production resume data in Supabase across `site_settings`, `experiences`, `projects`, `skill_categories`, and `skills`.
- [x] Integrate Paytm (*Senior Software Engineer*), Teemuno/Gimmefy AI (*Frontend Engineer*), Collaberus Technologies (*Frontend Engineer*), and Drishti IAS (*Frontend & Technical Associate*) with granular bullet points and technologies.
- [x] Update project catalog (Gimmefy AI, Dialmantra Dialer, Amotus Online, Drishti IAS Platform) with production descriptions, tags, and iframe previews.
- [x] Optimize Admin Sidebar with zero-scroll sticky viewport layout (`h-14` header match, active tab highlighting, pinned user info).
- [x] Remove legacy override maps in `experience-formatter.ts`, enable flexible thumbnail fallback matching, and remove category regex stripping.
- [x] Remove MapPin location icon from Hero Section bio paragraph.
- [x] Fix duplicate `<>` brackets on "View Source" button in project cards.
- [x] Synchronize defaults in `src/lib/supabase-queries.ts` and `supabase/schema.sql`.
- [x] Synchronize all specifications in `/docs/` (`PRD.md`, `TRD.md`, `APP_FLOW.md`, `UI_UX_DESIGN_BRIEF.md`, `BACKEND_SCHEMA.md`) and `/memory-bank/`.
- [x] Full validation with `npm run lint` (0 errors), `npx tsc --noEmit` (0 errors), and `npm run build` (23/23 routes compiled).

### Phase 14: Obsidian Vault Integration & Interactive Knowledge Graph View (100% Completed)
- [x] Configure `.obsidian/app.json` with ignore filters for `node_modules`, `.next`, `.git`, `.vscode`, `dist`, `build`, and scratch assets.
- [x] Configure `.obsidian/graph.json` with physics forces, arrow vectors, and color-coded node clusters (Memory Bank, Specs, Rules, Hubs).
- [x] Enable core plugins (`graph`, `canvas`, `backlink`, `outgoing-link`, `switcher`, `global-search`) in `.obsidian/core-plugins.json`.
- [x] Create central Map of Content (MOC): `PORTFOLIO_GRAPH.md` with full bi-directional wikilinks.
- [x] Create native Obsidian Canvas board: `PORTFOLIO_GRAPH.canvas` for visual exploration.
- [x] Interlink all existing markdown documentation across `memory-bank/*.md`, `docs/*.md`, and `README.md`.
- [x] Verify production build and compilation with `npm run build`.

### Phase 15: Dynamic Blog, Interactive Comments Engine & Admin Blog Manager (100% Completed)
- [x] Implement cookieless queries (`getBlogPosts`, `getBlogPostBySlug`, `getCommentsByPostId`) and rich seed fallback articles in `src/lib/supabase-queries.ts`.
- [x] Implement Server Actions (`createBlogPostAction`, `updateBlogPostAction`, `deleteBlogPostAction`, `addCommentAction`, `deleteCommentAction`) in `src/lib/admin-actions.ts`.
- [x] Build public blog feed (`/blog`) with live search, tag filtering pills, featured hero card, and article card grid (`BlogCard`, `BlogFeedClient`).
- [x] Build article reading view (`/blog/[slug]`) with markdown content renderer (`ArticleContent`), like button, metadata, and author card.
- [x] Build interactive comments engine (`CommentsSection`) with unauthenticated sign-in prompt, live commenting, deletion, and upvote/downvote reactions.
- [x] Build admin blogs management dashboard (`/admin/blogs`) with table, status badges (`DRAFT`, `PUBLISHED`, `ARCHIVED`), Markdown editor form (`BlogForm`), and delete modal.
- [x] Integrate "Blog" into `TopNavbar`, "Blog Posts" into `AdminSidebar`, and `/blog` into `sitemap.ts`.
- [x] Full build verification with `npm run build`.

---

## 🔗 Related Knowledge & System Links
- Central Hub: [[PORTFOLIO_GRAPH|Knowledge Hub (MOC)]]
- Visual Board: [[PORTFOLIO_GRAPH.canvas|Canvas Board]]
- Active Context: [[memory-bank/activeContext|Active Context]]



