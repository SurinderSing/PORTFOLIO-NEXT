# UI/UX Design Brief - PORTFOLIO-NEXT (Redesign)

## Design Aesthetic
A sleek, modern developer portfolio featuring an engineered terminal aesthetic, developer-focused monospace typography, Emerald Green (`#22C55E`) primary accents, dark/light theme switching via `next-themes`, and clean single-page flowing layouts paired with an intuitive administrative control center.

## Design Tokens & Typography

### Fonts
The site uses Google fonts configured via `next/font/google` (mapped to CSS variables in `src/styles/fonts.ts`):
- **JetBrains Mono (`--font-mono`):** Primary typeface used across all headings, code blocks, terminals, navigation items, cards, badges, and body content. High legibility and developer-engineered feel.
- **Inter (`--font-sans`):** Clean fallback interface typeface.

### Typography Hierarchy

| Style | Element/Class | Size | Font Family | Properties |
|:---|:---|:---|:---|:---|
| **Heading 1** | `h1` | `26px` (sm: `22px`) | JetBrains Mono | `font-semibold`, `tracking-tight` |
| **Heading 2** | `h2` | `22px` (sm: `18px`) | JetBrains Mono | `font-semibold`, `tracking-tight` |
| **Heading 3** | `h3` | `17px` | JetBrains Mono | `font-semibold` |
| **Heading 4** | `h4` | `15px` | JetBrains Mono | `font-medium` |
| **Body Large** | `.para-1` | `14px` | JetBrains Mono | `line-height: 24px` |
| **Body Small** | `.para-2` | `12px` | JetBrains Mono | `line-height: 20px` |
| **Caption Mono**| `.para-3` | `11px` | JetBrains Mono | `line-height: 16px`, `font-medium` |

---

## Brand Theme & Color System

The application leverages HSL variables mapped dynamically for light and dark themes:

| Token Name | Light Theme Value (HSL) | Dark Theme Value (HSL) | CSS Variable |
|:---|:---|:---|:---|
| **Primary** | `142, 71%, 45%` (#22C55E Emerald) | `142, 71%, 45%` (#22C55E Emerald) | `var(--primary)` |
| **Secondary**| `142, 60%, 35%` (Deep Forest) | `142, 60%, 35%` (Deep Forest) | `var(--secondary)` |
| **Background**| `0, 0%, 100%` (Pure White)| `0, 0%, 4%` (Jet Black #0A0A0A) | `var(--background)` |
| **Foreground**| `0, 0%, 9%` (Dark Gray #171717) | `0, 0%, 98%` (Off-White #FAFAFA) | `var(--foreground)` |
| **Card** | `0, 0%, 98%` (Subtle Zinc #FAFAFA) | `0, 0%, 7%` (Charcoal #121212) | `var(--card)` |
| **Tertiary** | `0, 0%, 98%` | `0, 0%, 9%` (#171717) | `var(--tertiary)` |
| **Tertiary-2**| `0, 0%, 94%` (Muted Zinc) | `0, 0%, 13%` (Deep Zinc) | `var(--tertiary-2)` |
| **Border** | `0, 0%, 89.8%` | `0, 0%, 16%` (#262626) | `var(--border)` |

### Theme Accents & Buttons
- **Primary Actions:** `bg-primary text-primary-foreground` (`#22C55E` emerald with dark text/white contrast)
- **Text Accents:** `text-primary font-mono`
- **Badges:** `border-border bg-tertiary-2 text-muted-foreground`

---

## Layout Architecture

1. **Top Navigation Bar (`TopNavbar`):**
   - Left: Dynamic logo title (`{owner_name}.dev` / `DevEngine v1.0`) with green pulsating status dot.
   - Center/Right: Navigation links (`Home`, `Resume`, `Work`, `Contact`).
   - Right: Minimalist theme toggle + mobile hamburger menu.
2. **Footer (`Footer`):**
   - Dynamic branding: `DevEngine v1.0 — © {year} {owner_name}. All rights reserved.`
   - Social links integration (`GitHub`, `LinkedIn`, etc.).
3. **Home Page (`/`):**
   - Single-page scrollable architecture featuring: Hero Section (`$ whoami`), Technical Skills 4-column matrix, Experience preview with "View Full Resume →", Featured Work 2-column cards with "View All Projects →", and Contact Teaser CTA.
4. **Work Page (`/work`):**
   - Terminal breadcrumb (`$ ls -la ./projects`), Systems & Architecture heading, 2-column project deployment cards with Live Demo and View Source triggers, GitHub callout banner.
5. **Resume Page (`/resume`):**
   - Terminal breadcrumb (`$ cat resume.md`), Profile summary card with photo & PDF download, Categorized Technical Skills cards, Work Experience timeline, and Education timeline.
6. **Contact Page (`/contact`):**
   - Terminal breadcrumb (`$ init --contact`), Two-column layout: Left interactive code terminal contact form (`~/contact/transmission.sh`), Right System Status panel (`● ONLINE`, `~12ms`, location) and Network Nodes panel with coordinate radar target (`NODE: DELHI, IN`).
7. **Auth Pages (`/sign-in`, `/sign-up`):**
   - Monospace terminal authentication cards with green action buttons and full theme toggle support.
8. **Admin Control Center (`/admin/*`):**
   - Dark/Light responsive dashboard shell with icon-based navigation sidebar, Supabase synchronization status banner, and content management cards.
