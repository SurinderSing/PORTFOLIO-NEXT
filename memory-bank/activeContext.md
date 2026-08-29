# Memory Bank - Active Context

## Active Focus
The current focus is **Phase 16: Custom Cyber/Terminal Boot Loader & Visual Boot Sequence (Completed)**.

---

## Recently Completed

1. **Custom Cyber/Terminal Boot Loader (`TerminalLoader`):**
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
   - **Active Format Toolbar Highlighting:** Implemented `updateActiveFormats` with `document.queryCommandState()` and DOM selection inspection to dynamically highlight active toolbar buttons in emerald when cursor enters formatted text.
   - **Lossless & Idempotent Mode Switching:** Engineered idempotent block-based serializer (`markdownToHtml` and `htmlToMarkdown`) with persistent dual DOM containers to eliminate text mutation, line doubling, and clearing when toggling between Visual Editor and Markdown Source.
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
