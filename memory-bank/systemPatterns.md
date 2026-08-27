# Memory Bank - System Patterns

## Architectural Principles

1. **RSC First Strategy:** All public website pages (`src/app/(website)/`) and admin pages (`src/app/(admin)/`) use React Server Components (RSC) by default to keep JS bundles small and ensure high SEO visibility. Client-side interactive forms are isolated within subcomponents.
2. **Provider Wrapping Hierarchy:** Global states are integrated inside `src/app/layout.tsx` (and `(auth)/layout.tsx` / `(website)/layout.tsx` / `(admin)/layout.tsx`):
   - `Providers` (`src/app/provider.tsx`) -> Redux Store
   - `ThemeProvider` (`src/components/utils/theme-provider`) -> theme provider (NextThemes)
3. **Data Access Pattern:** All data fetching passes through `src/lib/supabase-queries.ts`, which returns typed Supabase data with fallback datasets when unseeded.
4. **Admin Mutations Pattern:** All mutations execute via Next.js Server Actions (`src/lib/admin-actions.ts`), which check `profiles.role = 'ADMIN'`, run Supabase updates, and trigger `revalidatePath()` to bust the cache.
5. **Icon Resolution Pattern:** All database icon strings are mapped to Lucide React icons via `src/utils/icon-resolver.tsx`.

---

## Code Abstraction Patterns

### 1. Centralized Data Access Layer
```typescript
import { getSiteSettings, getProjects, getSkillsByCategory } from '@/lib/supabase-queries';

export default async function Page() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getProjects()
  ]);
  // Renders with data or graceful fallback
}
```

### 2. Server Action Mutation Pattern
```typescript
'use server';
export async function updateProjectAction(id: number, data: Partial<Project>): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('projects').update(data).eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/work');
  return { success: true, message: 'Project updated.' };
}
```

### 3. Styling Token Mappings
All elements hook styles to classes or CSS variables in `@layer base` (`src/styles/globals.css`). The Tailwind configuration maps standard UI structures (`border-border`, `bg-card`, `bg-background`, `text-primary`, `main-gradient-1`) directly to these variable arrays.

---

## 🔗 Related Knowledge & System Links
- Central Hub: [[PORTFOLIO_GRAPH|Knowledge Hub (MOC)]]
- Technical Dependencies: [[memory-bank/techContext|Tech Context]]
- Technical Specs: [[docs/TRD|TRD]]
- Flow & Routing: [[docs/APP_FLOW|App Flow]]
- Database Schema: [[docs/BACKEND_SCHEMA|Backend Schema]]
- Agent Rules: [[AGENTS|AGENTS.md]]

