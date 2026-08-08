# Memory Bank - Active Context

## Active Focus
The current focus is **Security Hardening (completed)** with two upcoming feature phases queued.

---

## Recently Completed

1. **Zero Internal Schema Exposure:** Removed database table references, column names, User UUIDs, and SQL execution snippets from the user-facing UI.
2. **Production-Grade 403 Forbidden Screen:** Non-admin authenticated users see a clean **Access Denied** error with "Return to Website" and "Sign Out" actions.
3. **Dedicated Sign-Out API Route:** Created `/api/auth/sign-out` for reliable server-side session termination.
4. **Two-Way Cascading Triggers:** Added `on_profile_deleted` trigger to delete from `auth.users` when `public.profiles` is deleted, and `on delete cascade` when deleted from `auth.users`.

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
- **Production Build:** `npm run build` -> 22/22 routes successfully generated.
