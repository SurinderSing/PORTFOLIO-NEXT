# Memory Bank - Active Context

## Active Focus
The current focus is **Security Hardening, Role Verification, and Dynamic Data Activation**. 

---

## Security Hardening & Best Practices

1. **Zero Internal Schema Exposure:** Removed database table references (`public.profiles`), column names, User UUIDs, and SQL execution snippets from the user-facing UI.
2. **Production-Grade 403 Forbidden Screen:** Non-admin authenticated users attempting to access `/admin` receive a standard, clean **Access Denied (403)** error with navigation options to return to the website or sign out.
3. **Two-Way Cascading Triggers:** Added `on_profile_deleted` trigger to delete from `auth.users` when `public.profiles` is deleted, and `on delete cascade` when deleted from `auth.users`.

---

## Verification Status

- **TypeScript Compilation:** `npx tsc --noEmit` -> 0 errors.
- **ESLint Validation:** `npm run lint` -> 0 errors/warnings.
- **Production Build:** `npm run build` -> 22/22 routes successfully generated.
