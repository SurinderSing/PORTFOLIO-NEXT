# Memory Bank - Active Context

## Active Focus
The current focus is **Deployment Fix & Performance Optimization (completed)** with two upcoming feature phases queued.

---

## Recently Completed

1. **Anonymous Supabase Server Client:** Created `@/utils/supabase/server-anon` — a cookieless, stateless client using `@supabase/supabase-js` for public read-only queries. All query functions in `supabase-queries.ts` now use this client, enabling static generation (SSG) and ISR revalidation on public pages instead of forced dynamic rendering.
2. **Suspense Boundary for Sign-In:** Wrapped `useSearchParams()` in the `/sign-in` page inside a `<Suspense>` boundary to satisfy Next.js 14 prerendering requirements.
3. **Deployment Safety Rules:** Added high-priority rules to both `AGENTS.md` and `.agents/AGENTS.md` requiring build verification (`npm run build`) before concluding tasks, preferring static generation, and documenting the Supabase client architecture.
4. **All Public Pages Now Statically Generated:** `/`, `/contact`, `/resume`, `/work`, `/sign-in`, `/sign-up` are all `○ Static` in the build output — served from CDN edge.

---

## Upcoming Tasks (Pending)

### Phase 6: File Uploads & Media Management
- Set up Supabase Storage bucket(s) for media assets.
- Build **profile photo uploader** in Admin Site Settings.
- Build **resume PDF uploader** in Admin Site Settings.
- Build **about card image uploader** (if custom images beyond Lucide icons are needed).
- Build **blog post cover image uploader** (for future blog feature).
- Wire uploaded file URLs to the corresponding database fields (`profile_photo_url`, `resume_pdf_url`, `cover_image_url`).
- Add image optimization and file size validation.

### Phase 7: Live Project Previews
- Replace static `image_url` screenshot approach with **live website previews** (iframe/embed).
- Add `preview_url` field to `projects` table for iframe source URL.
- Build responsive iframe preview component for the Work page project cards.
- Add fallback to static image when iframe is unavailable (sites blocking via X-Frame-Options).
- Add toggle in Admin Projects manager (iframe live preview vs. static image).
- Handle loading states, error states, and sandbox security for embedded iframes.

---

## Verification Status

- **TypeScript Compilation:** `npx tsc --noEmit` -> 0 errors.
- **ESLint Validation:** `npm run lint` -> 0 errors/warnings.
- **Production Build:** `npm run build` -> 22/22 routes successfully generated (all public pages static ○, admin pages dynamic ƒ).
