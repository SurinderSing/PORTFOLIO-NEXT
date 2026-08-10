# Memory Bank - Active Context

## Active Focus
The current focus is **Phase 9: DRY Reusable Utilities, Custom Hooks & Single-Responsibility Component Modularization (Completed)**.

---

## Recently Completed

1. **Updated Agent Operational Rules (High Priority):**
   - Updated `AGENTS.md` and `.agents/AGENTS.md` with strict rules mandating:
     - **DRY & Centralized Reusable Utilities:** Reusable logic/helpers/hooks must be centralized in `@/utils/`, `@/hooks/`, or `@/lib/` and imported everywhere.
     - **Single-Responsibility Component Design:** Monolithic managers must be decomposed into small, focused subcomponents (separate form modals, tables/lists, header bars, status banners, card items).
2. **Backend Server Action Deduplication:**
   - Centralized all 7 reorder actions in `src/lib/admin-actions.ts` to call a single generic `genericReorderTableItems` helper with transactional updates and targeted ISR path revalidations.
3. **Shared Utilities & Hooks:**
   - Created pure array reordering math in `src/utils/reorder.ts` (`reorderArray`).
   - Created custom hook `src/hooks/use-drag-drop-reorder.ts` (`useDragDropReorder`) encapsulating HTML5 drag events, optimistic updates, and server persistence.
4. **Shared Admin UI Components:**
   - `AdminStatusBanner` (`src/components/admin/admin-status-banner.tsx`)
   - `AdminPageHeader` (`src/components/admin/admin-page-header.tsx`)
   - `AdminDragHandle` (`src/components/admin/admin-drag-handle.tsx`)
5. **Component Decomposition Across All 6 Admin Modules:**
   - **About Cards:** `about-card-form.tsx`, `about-cards-table.tsx`, `about-cards-manager.tsx`
   - **Contacts:** `contact-form.tsx`, `contacts-table.tsx`, `contacts-manager.tsx`
   - **Social Links:** `social-link-form.tsx`, `social-links-table.tsx`, `social-links-manager.tsx`
   - **Experiences:** `experience-form.tsx`, `experiences-table.tsx`, `experiences-manager.tsx`
   - **Projects:** `project-form.tsx`, `projects-table.tsx`, `projects-manager.tsx`
   - **Skills:** `skill-category-form.tsx`, `skill-category-card.tsx`, `skills-manager.tsx`
6. **Documentation & Memory Bank:** Concurrently updated `docs/TRD.md`, `memory-bank/activeContext.md`, `memory-bank/progress.md`, and created `walkthrough.md`.

---

## Verification Status

- **ESLint Validation:** `npm run lint` -> 0 warnings, 0 errors.
- **Production Build:** `npm run build` -> 23/23 routes successfully generated and prerendered.
