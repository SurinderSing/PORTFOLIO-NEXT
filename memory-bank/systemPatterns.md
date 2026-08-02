# Memory Bank - System Patterns

## Architectural Principles

1. **RSC First Strategy:** All pages inside `src/app/` utilize React Server Components (RSC) by default to keep JS bundles small and ensure high SEO visibility. Client-side states (e.g. Redux inputs, loaders, or animation frames) are isolated within wrapper directories.
2. **Provider Wrapping Hierarchy:** Global states are integrated cleanly inside `src/app/layout.tsx` (and `(auth)/layout.tsx` / `(website)/layout.tsx`) utilizing:
   - `Providers` (`src/app/provider.tsx`) -> Redux Store
   - `AuthProvider` (`src/context/AuthProvider.tsx`) -> NextAuth Session Provider
   - `ThemeProvider` (`src/components/utils/theme-provider`) -> theme provider (NextThemes)
3. **Animations Strategy:** Page components make use of standard structural layouts wrapped inside animate-ready containers (`FadeIn` and `ScrollReveal` components) to avoid layout shifting or hydration warning mismatches.

---

## Code Abstraction Patterns

### 1. State Management Pattern
All API communications and global state variables pass through the Redux store:
- Store is configured at `src/lib/store.ts`.
- Component APIs connect via RTK Query mutation hooks (e.g. `useSignUpMutation` in `src/services/userApi.tsx`).

### 2. Database Connection Wrapper
The Prisma client is cached globally to prevent exhaustion of connection pools during development hot-reloading:
```typescript
// Located in src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### 3. Styling Token Mappings
All elements hook styles to classes or CSS variables in `@layer base` (`src/styles/globals.css`). The Tailwind configuration maps standard UI structures (`border-border`, `bg-background`, `text-primary`) directly to these variable arrays.
- Avoid dynamic string concatenation inside class utility helpers. Instead, use the global utility function `cn` (built with `clsx` and `tailwind-merge` in `src/lib/utils.ts`):
  ```typescript
  import { cn } from '@/lib/utils';
  
  export default function MyComponent({ className }) {
    return <div className={cn("bg-card text-foreground", className)} />;
  }
  ```
