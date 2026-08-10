# Memory Bank - Active Context

## Active Focus
The current focus is **Phase 7: Live Project Previews & Embeds (Completed)**.

---

## Recently Completed

1. **Database Schema & Types:** Added `preview_url` (text) and `preview_mode` ('image' | 'iframe', default 'iframe') to `public.projects` in `supabase/schema.sql`, `src/types/database.ts`, and fallback records in `src/lib/supabase-queries.ts`.
2. **LivePreview Component:** Built `@/components/website/pages/work/live-preview.tsx` featuring:
   - Sandboxed iframe with scaled 2x responsive viewport (`transform scale-50`).
   - Loading skeleton state with spinning indicator.
   - Automatic 6-second timeout fallback to static project cover image if iframe fails or is blocked by `X-Frame-Options` / CSP.
   - Non-interactive transparent overlay ensuring smooth click-through card navigation to project URLs.
   - Visual "Live Preview" status badge.
3. **Project Card Integration:** Updated `@/components/website/pages/work/porject-card/index.tsx` and `@/app/(website)/work/page.tsx` to conditionally render live iframes or static images based on `preview_mode`.
4. **Admin Projects Manager:** Added interactive preview mode switcher (Live Iframe vs. Static Image), custom `preview_url` input, and preview mode badges in `/admin/projects`.
5. **Documentation:** Updated `docs/BACKEND_SCHEMA.md` and memory bank files.

---

## Verification Status

- **TypeScript Compilation:** `npx tsc --noEmit` -> 0 errors.
- **ESLint Validation:** `npm run lint` -> 0 errors/warnings.
- **Production Build:** `npm run build` -> 23/23 routes successfully generated (all public pages static ○, admin & preview-check dynamic ƒ).
