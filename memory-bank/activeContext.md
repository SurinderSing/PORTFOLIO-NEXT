# Memory Bank - Active Context

## Active Focus
The current focus is **Phase 15: Dynamic Blog, REST API Layer, Interactive Comments Engine & Admin Blog Manager (Completed)**.

---

## Recently Completed

1. **REST API Routes & Dedicated Services (`/api/...` & `src/services/`):**
   - **Post Likes Route (`/api/blog/like`):** Dedicated Next.js Route Handler for fetching and toggling post likes with session authentication and count aggregation.
   - **Comment Reactions Route (`/api/blog/reaction`):** Dedicated route for toggling upvotes/downvotes per comment.
   - **Centralized Services:**
     - [`src/services/blogApi.ts`](file:///c:/Users/ssuri/OneDrive/Documents/projects/PORTFOLIO-NEXT/src/services/blogApi.ts) with in-flight request deduplication and caching.
     - [`src/services/authApi.ts`](file:///c:/Users/ssuri/OneDrive/Documents/projects/PORTFOLIO-NEXT/src/services/authApi.ts) with centralized `signIn`, `signUp`, `signOut`, and `getUser`.
   - **Component Decoupling Across Entire Codebase:** Eliminated all direct inline database/client calls from all UI components (`LikeButton`, `CommentsSection`, `SignUpForm`, `SignInPage`). All components now interact strictly through the unified service layer.
   - **Like & Comment Count Synchronization:** Fixed PostgREST relational array mapping (`post_likes(id)` and `comments(id)`) in `getBlogPosts()` and `getBlogPostBySlug()` to accurately aggregate live counts across both the main `/blog` feed and individual `/blog/[slug]` article cards. Added instant `revalidatePath('/blog')` on like toggle.
   - **Comment Reactions Synchronization (`GET /api/blog/reaction` & `fetchCommentReactions`):** Created `GET` handler in `/api/blog/reaction` to pre-load the authenticated user's reaction statuses (`like`, `dislike`, or `null`) and accurate live counts for all comments upon page load/refresh. Fixed thumbs-up / thumbs-down toggle logic and active filled states.

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
