# Memory Bank - Active Context

## Active Focus
The current focus is **Phase 26: Blog Feed Numbered Pagination & Feed UX (Completed)**.

---

## Recently Completed

1. **Blog Feed Numbered Pagination & Feed UX:**
   - **Dedicated Pagination Subcomponent (`src/components/website/pages/blog/blog-pagination.tsx`):** Designed a cyber-styled numbered pagination bar with `Prev`, `Next`, ellipsis windowing (`1 ... 4 5 6 ... 12`), range indicators (`Showing 1–7 of 24 articles`), and accessible disabled states.
   - **Feed Batch Chunking & Scroll-to-Top (`src/components/website/pages/blog/blog-feed-client.tsx`):** Structured blog feed into 7 articles per page (Page 1: 1 Featured Hero + 6 Grid Cards; Page 2+: 7 Grid Cards). Connected search, tag filtering, and view modes with automatic page-1 reset, and added smooth `scrollIntoView` to the top of the feed upon page transitions.
   - **Build & Lint Verification:** Verified `npm run lint` and `npm run build` with 0 errors across all 36 static pages.

1. **Core Web Vitals & Runtime Performance Optimization & Dot Particle Background:**
   - **Stationary Background Dots on Scroll & Delayed Cursor Trailing (`src/components/animations/antigravity-background.tsx`):** Fixed background dots in place so they remain stationary on viewport scroll without artificial vertical displacement, and tuned the mouse coordinate interpolation (`0.07` lerp factor) and particle transition force (`0.10`) so the antigravity repulsion field smoothly glides behind the cursor with a fluid magnetic delay.
   - **Antigravity Micro-Dot Particles with 50% Lighter Opacity (`src/components/animations/antigravity-background.tsx`):** Redesigned the background particle geometry from pins/lines to subtle circular micro-dots (`0.65px–1.0px` radius) with a 50% lighter opacity baseline (`0.11` dark / `0.13` light). Maintained smooth fluid organic repulsion, ambient harmonic floating drift, trail inertia, and theme adaptability.
   - **Session-Aware Non-Blocking Boot Loader (`src/components/ui/global-loader.tsx`, `terminal-loader.tsx`):** Added `sessionStorage` awareness so the terminal boot sequence only plays once per visitor session and never blocks subsequent page transitions. Optimized progression interval to complete in a crisp ~300ms–400ms rather than holding the LCP element for 2.5 seconds.
   - **Idle-Deferred Antigravity Canvas (`src/components/animations/antigravity-background.tsx`):** Deferred canvas particle allocation to `requestIdleCallback` (with timeout fallback), added `visibilitychange` listeners to suspend the 60fps render loop when tabs are inactive, and implemented adaptive particle spacing for mobile viewports (`spacing = 40` on mobile vs `32` on desktop) to eliminate Total Blocking Time (TBT).
   - **RequestAnimationFrame Throttled Custom Cursor (`src/components/animations/custom-cursor.tsx`):** Replaced unthrottled DOM queries in `mousemove` with single-frame RAF batching and passive listeners to eliminate main-thread layout thrashing.
   - **Build Verification:** Verified `npm run lint` and `npm run build` compiled 36 static pages cleanly with 0 errors.

1. **SEO Optimization & #1 Google Ranking Infrastructure:**
   - **Dynamic Database Sitemap (`src/app/sitemap.ts`):** Replaced static array with dynamic async query fetching all published blog posts from Supabase (`getBlogPosts({ status: 'PUBLISHED' })`), assigning accurate `lastModified` dates and priority weightings across all static and dynamic paths.
   - **Structured Data JSON-LD Entity Graph (`src/app/(website)/layout.tsx`):** Implemented a comprehensive Google-compliant `@graph` containing `WebSite`, `ProfilePage`, and `Person` schemas with `sameAs` entity links (LinkedIn, GitHub, previous Netlify portfolio), `knowsAbout`, and `worksFor` specifications to establish Google Knowledge Graph entity recognition.
   - **BreadcrumbList Structured Data:** Injected `BreadcrumbList` schemas across all subpages (`/work`, `/resume`, `/blog`, `/blog/[slug]`, `/contact`) to qualify for rich breadcrumb snippet display in Google SERPs.
   - **App Router Web App Manifest (`src/app/manifest.ts`):** Created `manifest.ts` providing full PWA metadata, standalone display properties, theme colors, and icons for Google mobile-first indexing.
   - **Dynamic Social & OpenGraph Cards (`src/app/(website)/opengraph-image.tsx`, `twitter-image.tsx`):** Implemented high-resolution edge-rendered social card generators for rich link previews in search and social shares.
   - **Robots.txt Directives (`src/app/robots.ts`):** Structured crawler allow/disallow rules, sitemap locator, and host configuration.
   - **Old Portfolio PageRank Transfer (`inder-dev-portfolio`):** Added canonical link (`<link rel="canonical">`), meta-refresh, instant JavaScript redirect in `index.html`, and Netlify `_redirects` file (`/* https://surinder-singh-portfolio.vercel.app/:splat 301!`) to transfer accumulated Google ranking equity and backlinks from the old Netlify deployment to `PORTFOLIO-NEXT`.
   - **Redundant Layout Pruning & Metadata Base Normalization:** Removed conflicting `contact/layout.tsx`, normalized `metadataBase` across all route groups, and fixed Prettier/ESLint formatting. All 36 static/dynamic pages pass `npm run build` with 0 errors.

1. **Sign-Up Form Placeholder Sanitization:**
   - **Neutral Dummy Placeholders (`src/components/auth/sign-up/form/index.tsx`):** Sanitized form input placeholders to replace personal identifiers (`Surinder`, `Singh`, `admin@surinder.dev`, `admin_user`, `+91 9876543210`) with standard, neutral dummy examples (`john_doe`, `John`, `Doe`, `john.doe@example.com`, `+15551234567`). Preserved sign-in form placeholders (`user@example.com`, `••••••••`) as confirmed.

2. **Middleware Dashboard Deprecation & Role-Based Auth Navigation:**
   - **Legacy `/dashboard` Alias Redirection (`src/utils/supabase/middleware.ts`):** Deprecated `/dashboard` route protection since `/dashboard` does not exist; any requests to `/dashboard` or `/dashboard/*` are now cleanly rewritten and redirected to `/admin` or `/admin/*`.
   - **Smart Role-Based Auth Page Redirects (`src/utils/supabase/middleware.ts`):** When an authenticated user visits `/sign-in` or `/sign-up`, the middleware now checks for an explicit `?redirect=` target first; if none, it inspects `profiles.role` to redirect admins to `/admin` and general members to `/blog`.

2. **Vercel Speed Insights & Web Analytics Integration:**
   - **Package Installations (`package.json`):** Added `@vercel/speed-insights` (v2.0.0) for Real Experience Score & Core Web Vitals tracking, and `@vercel/analytics` (v2.0.1) for visitor traffic, page views, and geographic analytics.
   - **Root Website Layout Embedding (`src/app/(website)/layout.tsx`):** Injected `<SpeedInsights />` and `<Analytics />` into the main application layout under `<ThemeProvider>`, ensuring performance telemetry and visitor event collection across the homepage, work portfolio, blog articles, resume, and contact pages.

2. **Auth Flow & Post-Login Redirection Fixes:**
   - **Post-Login Routing Polish (`src/app/(auth)/sign-in/page.tsx`):** Changed default redirect destination from `/admin` to `/blog` when no explicit `?redirect=` target is provided. Updated headings, subtext, and buttons from admin-centric to general user-facing terminology (`Sign In`, `Create Account`, `Continue`).
   - **Middleware Redirection Fix (`src/utils/supabase/middleware.ts`):** Changed signed-in user redirect on `/sign-in` and `/sign-up` from `/dashboard` (non-existent route) to `/blog`.
   - **Multi-Environment Base & Site URL Hardening (`.env`, `.env.example`):** Added `NEXT_PUBLIC_SITE_URL="https://surinder-singh-portfolio.vercel.app"` alongside `NEXT_PUBLIC_BASE_URL="http://localhost:3000"`, ensuring SSR and email redirect construction properly respects the production domain.
   - **Sign-Up Form Copy Generalization (`src/app/(auth)/sign-up/page.tsx`):** Changed page title to `Create Account` and updated instructions to be welcoming for general community members accessing discussion and blog features.
   - **Email Template & Supabase Dashboard Configuration:** Synchronized custom terminal-themed templates (`supabase/templates/confirm-signup.html` and `reset-password.html`) and verified Supabase Site URL / redirect whitelist settings.

1. **Experience & Skills-Aligned Technical Blog Engine:**
   - **Full-Spectrum Technical Catalog (10 In-Depth Articles):** Authored and published 10 comprehensive, authentic technical articles covering Surinder Singh's real-world engineering career (Paytm, Gimmefy AI, Dialmantra, Amotus Online, Drishti IAS) and technical competencies:
     1. *Zero-Downtime Micro-Frontend Deployments: Dockerizing & Orchestrating with Kubernetes* (`Docker`, `Kubernetes`, `DevOps`, `Micro-Frontends`, `Cloud`)
     2. *Advanced Frontend Performance Engineering: Slashing TTFB, LCP & CLS for High-Traffic Web Apps* (`Performance`, `Frontend`, `Core Web Vitals`, `React`, `Optimization`)
     3. *Modern Web Rendering Decoded: Choosing Between SSR, CSR, SSG, and ISR in Next.js 14* (`Next.js`, `SSR`, `ISR`, `React`, `Architecture`)
     4. *Supabase vs Firebase in Production: Row-Level Security, Realtime Subscriptions & SQL Flexibility* (`Supabase`, `Firebase`, `Database`, `PostgreSQL`, `Cloud`)
     5. *Scaling Enterprise Frontend Architecture: Micro-Frontends with Module Federation & Automated CI/CD* (`Micro-Frontends`, `React`, `TypeScript`, `CI/CD`, `Webpack`)
     6. *Building Low-Latency Real-Time Telephony & Screen Sharing: WebSockets, WebRTC & Docker* (`Cloud`, `WebSockets`, `WebRTC`, `Docker`, `System Design`)
     7. *Building Interactive AI Media Canvas Tools: React, Polotno, Redux Toolkit & Generative Pipelines* (`AI`, `Generative AI`, `React`, `Redux Toolkit`, `Vite`)
     8. *Production Kubernetes Blueprint: Nginx Ingress, Cert-Manager SSL & Cloud Native Workflows* (`Kubernetes`, `Cloud`, `Docker`, `Nginx`, `Security`)
     9. *Maximizing Core Web Vitals with Next.js 14 App Router, Server Components & Edge Caching* (`Next.js`, `Performance`, `Cloud`, `React`, `Core Web Vitals`)
     10. *Predictable State at Enterprise Scale: Redux Toolkit, RTK Query & Optimistic Cache Synchronization* (`Redux`, `TypeScript`, `State Management`, `React`, `Frontend`)
   - **Supabase Cloud Population:** Seeded all 10 articles into `public.blog_posts` table via Supabase MCP with `author_id = '2d1bbb65-3a78-4c14-9c84-0379a1a40d0a'` (Surinder Singh Admin), `status = 'PUBLISHED'`, rich markdown content, and authentic community comments/reactions in `public.comments`.
   - **Static & Offline Fallback Synchronization (`src/lib/supabase-queries.ts`):** Synchronized `defaultBlogPosts` and `defaultComments` to mirror the full 10-article dataset for zero-downtime offline development and static prerendering.

1. **Mobile Button Stability & Tap Performance Fixes:**
   - **Global Mobile Touch Enhancement (`src/styles/globals.css`):** Added `touch-action: manipulation;`, `-webkit-appearance: none;`, `appearance: none;`, `-webkit-touch-callout: none;`, `-webkit-user-select: none;`, and `-webkit-tap-highlight-color: transparent;` to base `<button>` styles to eliminate mobile double-tap zoom jitter, iOS button styling artifacts, and touch clipping.
   - **Smooth Hardware-Accelerated UI Button (`src/components/ui/button.tsx`):** Refined `buttonVariants` to use `transform-gpu` and active feedback (`active:scale-[0.98] active:opacity-90`), removing aggressive hover transforms that conflicted with touchscreens and caused subpixel rendering clipping.
   - **Responsive Button Stacking & Layout Protection:**
     - `CommentForm` (`comment-form.tsx`): Stacks elements on narrow viewports (`flex flex-col-reverse sm:flex-row`), adding `shrink-0`, `min-w-[130px]`, `min-h-[38px]`, and a dedicated `<Loader2 />` spinner.
     - `BlogPostForm` (`blog-post-form.tsx`): Made action buttons container responsive (`flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3`), adding `shrink-0`, `min-h-[42px]`, and `<Loader2 />` spinner.
     - Admin `BlogForm` (`blog-form.tsx`), `TerminalContactForm`, and `ContactForm`: Added responsive widths, `shrink-0`, and loaders.

2. **Blog Save Redirect Real-Time Cache Synchronization:**
   - **Comprehensive Server-Side ISR Revalidation (`src/lib/admin-actions.ts`):** Fixed `updateUserBlogPostAction`, `updateBlogPostAction`, `createUserBlogPostAction`, `createBlogPostAction`, `deleteUserBlogPostAction`, and comment actions to capture pre-existing and updated slugs and always invalidate `/blog/[slug]`, `/blog/${slug}`, `/blog`, `/admin/blogs`, and `/` (layout).
   - **Next.js Client-Side Router Cache Purging (`edit-blog-post-client.tsx`, `new-blog-post-client.tsx`):** Added immediate `router.refresh()` upon mutation completion before and after navigating, ensuring the redirected article page displays fresh data without requiring manual browser reload.

3. **Custom Cyber/Terminal Boot Loader (`TerminalLoader`):**
   - **Interactive Terminal Boot Architecture (`src/components/ui/terminal-loader.tsx`):** Engineered a high-performance cyber terminal boot loader inspired by the reference `index.html`, featuring a matrix/scanline background grid, glowing ambient orbs, and Mac/cyber-styled traffic light window controls with live blinking indicator `SYS_BOOT // INDER_DEV_ENGINE v2.4`.
   - **Full Light & Dark Mode Dynamic Theme Adaptation:** Refactored terminal palette, syntax highlighting tokens, grid lines, and progress tracks to automatically synchronize with the active theme (`ThemeProvider`) in both light mode (clean crisp light terminal with emerald accents) and dark mode (neon cyberpunk terminal).
   - **Zero UI Layout Shift & Instant SSR Painting:** Eliminated initial content flash by removing hydration delays in `GlobalLoader` and removing `body.overflow = 'hidden'` scrollbar mutations, preventing viewport jumps and ensuring smooth initial painting and exit transitions.
   - **Syntax-Highlighted Initializer Simulation:** Formatted code block simulating system boot:
     - `// initializing surinder-portfolio.exe`
     - `import { FrontendEngineer } from './surinder-singh';`
     - `// loading frontend & full-stack expertise...`
     - `const skills = await loadStack(['React', 'Next.js', 'TypeScript', 'AI']);`
     - `// connecting to InderDevEngine servers...`
     - `const portfolio = await initialize({ status: 'ready' });`
   - **Neon Glowing Progress Bar & Live Status Ticker:** Built animated progress track with emerald/cyan gradient glow, percentage indicator `[0%] -> [100%]`, and live stage announcements (`INITIALIZING SYSTEM CORE...`, `LOADING FRONTEND & FULL-STACK EXPERTISE...`, `CONNECTING TO INDERDEVENGINE SERVERS...`, `OPTIMIZING ASSETS & RENDERING DOM...`, `SYSTEM READY // ACCESS GRANTED`).
   - **Accessibility & Skip Controls:** Implemented instant bypass via `Escape` key or anywhere-click with subtle helper hint.
   - **WYSIWYG Rich Text Editor (`RichTextEditor`):** Built custom visual document editor with direct text formatting (Headings, Bold, Underline, Strikethrough, Bullet Lists, Numbered Lists, Blockquotes, Code Blocks, Links, Images, and Horizontal Rules) without exposing raw markdown symbols.
   - **Reliable Toolbar Format Toggling & Unwrapping:** Implemented modular smart toggles (`toggleBlockquote`, `toggleHeading`, `toggleCodeBlock`, `toggleList`, `toggleInline`, `handleLink`) with clean DOM unwrapping routines (`unwrapBlockquote`, `unwrapCodeBlock`). Users can now toggle off blockquotes, headings (H1/H2/H3 -> p), code blocks, and inline styles with a single click.
   - **Enhanced Active Format Highlighting:** Implemented `updateActiveFormats` combining `document.queryCommandState()` and hierarchical DOM ancestor inspection for full detection of `h1`, `h2`, `h3`, `p`, `blockquote`, `pre`/`code`, `strong`/`b`, `u`/`ins`, `del`/`s`/`strike`, `ul`, and `ol`.
   - **Lossless & Idempotent Mode Switching:** Engineered idempotent block-based serializer (`markdownToHtml` and `htmlToMarkdown`) with persistent dual DOM containers to eliminate text mutation, line doubling, and clearing when toggling between Visual Editor and Markdown Source. Support added for `<s>`, `<del>`, `<strike>`, and multi-line blockquotes.
   - **Universal Article Content Renderer (`ArticleContent`):** Enhanced parser to seamlessly render both rich HTML tags (`<u>`, `<del>`, `<strong>`, `<h1>`-`<h6>`, `<ol>`, `<ul>`, `<blockquote>`) and Markdown inline elements across all headings, lists, and paragraphs with zero raw markdown leaking.

2. **REST API Routes & Dedicated Services (`/api/...` & `src/services/`):**
   - **Post Likes Route (`/api/blog/like`):** Dedicated Next.js Route Handler for fetching and toggling post likes with session authentication and count aggregation.
   - **Comment Reactions Route (`/api/blog/reaction`):** Dedicated route for toggling upvotes/downvotes per comment.
   - **Centralized Services:**
     - [`src/services/blogApi.ts`](file:///c:/Users/ssuri/OneDrive/Documents/projects/PORTFOLIO-NEXT/src/services/blogApi.ts) with in-flight request deduplication and caching.
     - [`src/services/authApi.ts`](file:///c:/Users/ssuri/OneDrive/Documents/projects/PORTFOLIO-NEXT/src/services/authApi.ts) with centralized `signIn`, `signUp`, `signOut`, and `getUser`.
   - **Component Decoupling Across Entire Codebase:** Eliminated all direct inline database/client calls from all UI components (`LikeButton`, `CommentsSection`, `SignUpForm`, `SignInPage`). All components now interact strictly through the unified service layer.
   - **Blog Article Top Navigation Responsive Optimization:** Optimized the top navigation bar in `src/app/(website)/blog/[slug]/page.tsx` (`Back to all articles` and `cat ./[slug].md` badge). Prevented awkward multiline wrapping on mobile viewports using `whitespace-nowrap`, compact `Back` text for mobile (`hidden sm:inline` for full text), and CSS ellipsis `truncate` on the terminal slug badge.
   - **Custom Developer-Themed Email Templates:** Created modern dark/terminal-themed responsive HTML templates in `supabase/templates/confirm-signup.html` and `supabase/templates/reset-password.html` featuring Mac-style terminal headers, emerald badges, gradient CTA buttons, fallback URLs, and security disclosures compatible across all email clients (Gmail, Apple Mail, Outlook).
   - **Dynamic Auth Redirects & Reverse Proxy Support:** Configured `emailRedirectTo` in `src/services/authApi.ts` and `src/app/api/auth/confirm/route.ts` with multi-environment origin detection (`x-forwarded-host`, `window.location.origin`) ensuring seamless verification redirects to `https://surinder-singh-portfolio.vercel.app/verification-success`.
   - **Like & Comment Count Synchronization:** Fixed PostgREST relational array mapping (`post_likes(id)` and `comments(id)`) in `getBlogPosts()` and `getBlogPostBySlug()` to accurately aggregate live counts across both the main `/blog` feed and individual `/blog/[slug]` article cards. Added instant `revalidatePath('/blog')` on like toggle.
   - **Comment Reactions Synchronization (`GET /api/blog/reaction` & `fetchCommentReactions`):** Created `GET` handler in `/api/blog/reaction` to pre-load the authenticated user's reaction statuses (`like`, `dislike`, or `null`) and accurate live counts for all comments upon page load/refresh. Fixed thumbs-up / thumbs-down toggle logic and active filled states.
   - **DRY Request Debouncing & Cancellation Utility (`src/utils/request-debouncer.ts`):** Created a generic `RequestDebouncer<T>` utility that centralizes per-key timer management and `AbortController` cancellation, eliminating ~200 lines of duplicate boilerplate in `src/services/blogApi.ts`.
   - **Single-Responsibility Comments Refactor:** Decomposed the 461-line monolithic `comments-section.tsx` into modular subcomponents (`CommentsHeader`, `CommentForm`, `CommentItem`) under `src/components/website/pages/blog/comments/`.
   - **Purged Dead Server Actions:** Removed obsolete duplicate actions (`togglePostLikeAction`, `getPostLikeStatusAction`, `toggleCommentReactionAction`) from `src/lib/admin-actions.ts`.

2. **Session & Profile Fetch Deduplication (Global React Context):**
   - Transformed `useClientAuth` into a shared React Context (`AuthProvider`) mounted once in `src/app/provider.tsx`.
   - Replaced multiple component-level `useEffect` instantiations with a single centralized `onAuthStateChange` listener.
   - Added module-level singleton in-memory caching (`cachedProfile` & `profileFetchPromise`) so that profile fetching occurs **exactly once** across all components on page mount, reducing network calls to `profiles` from 3+ down to 1.

3. **Public Blog Architecture (`/blog` & `/blog/[slug]`):**
   - **Feed View (`/blog`):** Live search filter, topic tag chips, featured post hero card, responsive article grid with reading time calculations, author avatar, and engagement counters.
   - **Article Reading View (`/blog/[slug]`):** Deep reading layout with normalized markdown renderer (`ArticleContent`) supporting code blocks with copy-to-clipboard, headings, bullet lists, and like button.
   - **Static Generation & ISR:** Built with cookieless `createAnonClient()` in `src/lib/supabase-queries.ts` and `export const revalidate = 3600;`.

4. **Interactive Comments & Discussion Engine:**
   - Client-side auth integration via reusable `useClientAuth` hook.
   - Interactive comment thread with user avatar, name, and timestamp.
   - Dynamic form unlocking: Active members and admins see their commenter name with live input textarea, while unauthenticated visitors see a clear sign-in CTA with redirect back to the article.
   - Optimistic comment submission via `addCommentAction()` and deletion via `deleteCommentAction()`.

5. **Admin Control Center (`/admin/blogs`):**
   - Management dashboard with filterable table of all articles (Drafts, Published, Archived).
   - Interactive form editor (`BlogForm`) with title, auto-slug generator, tags, excerpt, markdown body, cover image, and live preview toggle.
   - In-app delete confirmation modal and quick status changer.

---

## Verification Status

- **ESLint Validation:** `npm run lint` -> Passed (0 errors, 0 warnings).
- **TypeScript Compiler:** `npx tsc --noEmit` -> Passed.
- **Production Build:** `npm run build` -> Passed with 0 errors across 28 routes.

---

## 🔗 Related Knowledge & System Links
- Central Hub: [[PORTFOLIO_GRAPH|Knowledge Hub (MOC)]]
- Visual Board: [[PORTFOLIO_GRAPH.canvas|Canvas Board]]
- Routing Specs: [[docs/APP_FLOW|App Flow]]
- Database Models: [[docs/BACKEND_SCHEMA|Backend Schema]]
- System Patterns: [[memory-bank/systemPatterns|System Patterns]]
