# Memory Bank - Active Context

## Active Focus
The current focus is **Phase 15: Dynamic Blog, Interactive Comments Engine & Admin Blog Manager (Completed)**.

---

## Recently Completed

1. **Public Blog Architecture (`/blog` & `/blog/[slug]`):**
   - **Feed View (`/blog`):** Live search filter, topic tag chips, featured post hero card, responsive article grid with reading time calculations, author avatar, and engagement counters.
   - **Article Reading View (`/blog/[slug]`):** Deep reading layout with markdown renderer (`ArticleContent`) supporting code blocks with copy-to-clipboard, headings, bullet lists, and like button.
   - **Static Generation & ISR:** Built with cookieless `createAnonClient()` in `src/lib/supabase-queries.ts` and `export const revalidate = 3600;`.

2. **Interactive Comments & Discussion Engine:**
   - Client-side auth integration via reusable [`useClientAuth`](file:///c:/Users/ssuri/OneDrive/Documents/projects/PORTFOLIO-NEXT/src/hooks/use-client-auth.ts) hook that immediately resolves active Supabase sessions, user profiles, and admin roles.
   - Interactive comment thread with user avatar, name, and timestamp.
   - Dynamic form unlocking: Active members and admins see their commenter name with live input textarea, while unauthenticated visitors see a clear sign-in CTA with redirect back to the article.
   - Optimistic comment submission via `addCommentAction()` and deletion via `deleteCommentAction()`.
   - Upvote / downvote reaction buttons for feedback.

3. **Admin Control Center (`/admin/blogs`):**
   - Management dashboard with filterable table of all articles (Drafts, Published, Archived).
   - Interactive form editor (`BlogForm`) with title, auto-slug generator, tags, excerpt, markdown body, cover image, and live preview toggle.
   - In-app delete confirmation modal and quick status changer.

4. **Navigation & Overview Integration:**
   - Added "Blog" link to top navigation bar (`TopNavbar`).
   - Added "Blog Posts" to Admin Sidebar (`AdminSidebar`).
   - Added Blog card to Admin Overview dashboard metrics.
   - Added `/blog` to `sitemap.ts`.

---

## Verification Status

- **ESLint Validation:** `npm run lint` -> Passed.
- **TypeScript Compiler:** `npx tsc --noEmit` -> Passed.
- **Production Build:** `npm run build` -> Passed with 0 errors.

---

## 🔗 Related Knowledge & System Links
- Central Hub: [[PORTFOLIO_GRAPH|Knowledge Hub (MOC)]]
- Visual Board: [[PORTFOLIO_GRAPH.canvas|Canvas Board]]
- Routing Specs: [[docs/APP_FLOW|App Flow]]
- Database Models: [[docs/BACKEND_SCHEMA|Backend Schema]]
- System Patterns: [[memory-bank/systemPatterns|System Patterns]]
