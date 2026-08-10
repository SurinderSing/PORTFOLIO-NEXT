# Memory Bank - Active Context

## Active Focus
The current focus is **Phase 6: File Uploads & Media Management (Completed)** with Phase 7 queued.

---

## Recently Completed

1. **Supabase Storage Server Actions:** Created `@/lib/storage-actions.ts` handling admin-guarded uploads for profile avatar, resume PDF, and project cover images with automatic database sync and layout revalidation.
2. **Interactive Image Cropper Modal:** Built `@/components/ui/image-cropper-modal.tsx` with `react-easy-crop` and HTML5 Canvas WebP export supporting zoom, 90° rotation, and circle/rectangle crop shapes.
3. **Reusable FileUpload Component:** Built `@/components/ui/file-upload.tsx` with drag-and-drop zone, file size/type validation, live progress, image/PDF previews, replace/remove controls, and integrated cropping.
4. **Admin Integration:**
   - Integrated Profile Photo uploader (round crop) & Resume PDF uploader into Admin Site Settings (`/admin/site-settings`).
   - Integrated Project Cover Image uploader (16:9 rect crop) + manual URL fallback into Admin Projects Manager (`/admin/projects`).
5. **Next.js & Supabase Configuration:** Configured `next.config.mjs` with Supabase project remote patterns for image optimization. Documented storage schema and RLS policies in `supabase/schema.sql` and `docs/BACKEND_SCHEMA.md`.

---

## Upcoming Tasks (Pending)

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
