# UI/UX Design Brief - PORTFOLIO-NEXT

## Design Aesthetic
A sleek, modern developer portfolio featuring curated gradients, dark mode support, fluid responsiveness, and premium micro-animations that engage visitors, paired with a clean, functional administrative control center.

## Design Tokens & Typography

### Fonts
The site uses custom Google fonts configured via `next/font` (mapped to CSS variables in `src/styles/fonts.ts`):
- **Raleway (`--font-raleway`):** Principal body typeface. Clean, geometric, and highly readable.
- **Poppins (`--font-poppins`):** Headings typeface. Offers modern and structured hierarchy.
- **Pacifico (`--font-pacifico`):** Highlight/Accent brand font. Used for cursive signatures or logo branding.

### Typography Hierarchy

| Style | Element/Class | Size | Font Family | Properties |
|:---|:---|:---|:---|:---|
| **Heading 1** | `h1` | `28px` | Poppins | `font-medium`, `scroll-mt-48` |
| **Heading 2** | `h2` | `26px` | Poppins | `font-medium`, `scroll-mt-48` |
| **Heading 3** | `h3` | `20px` | Poppins | `font-medium` |
| **Heading 4** | `h4` | `18px` | Poppins | `font-semibold` |
| **Body Large** | `.para-1` | `14px` | Raleway | `line-height: 24px` |
| **Body Small** | `.para-2` | `12px` | Raleway | `line-height: 20px` |
| **Caption Bold**| `.para-3` | `10px` | Raleway | `line-height: 20px`, `font-semibold` |

---

## Brand Theme & Color System

The application leverages HSL variables mapped dynamically for light/dark themes:

| Token Name | Light Theme Value (HSL) | Dark Theme Value (HSL) | CSS Variable |
|:---|:---|:---|:---|
| **Primary** | `5, 93%, 48%` (Crimson) | `5, 93%, 48%` (Crimson) | `var(--primary)` |
| **Secondary**| `34, 100%, 55%` (Orange) | `34, 100%, 55%` (Orange) | `var(--secondary)` |
| **Background**| `214, 37%, 96%` (Light Gray-Blue)| `0, 0%, 3.9%` (Jet Black) | `var(--background)` |
| **Foreground**| `0, 0%, 3.9%` (Dark Gray) | `0, 0%, 98%` (Off-White) | `var(--foreground)` |
| **Card** | `33, 100%, 93%` (Soft Peach) | `0, 0%, 3.9%` (Jet Black) | `var(--card)` |
| **Tertiary** | `0, 0%, 100%` (White) | `0, 0%, 9%` (Deep Gray) | `var(--tertiary)` |
| **Tertiary-2**| `210, 30%, 91%` (Muted Blue-Gray) | `0, 0%, 9%` (Deep Gray) | `var(--tertiary-2)` |

### Theme Gradients
- **Main Action/Buttons:** `.main-gradient-1` (`bg-gradient-to-r from-secondary to-primary`)
- **Text Highlights:** `.main-text-gradient` (`bg-gradient-to-b from-primary to-secondary text-transparent bg-clip-text`)

---

## Dynamic Icon Resolution Ecosystem
All icon strings stored in the database (e.g. `code-xml`, `brain`, `phone`, `mail`, `github`, `linkedin`) are dynamically resolved into Lucide React components using `src/utils/icon-resolver.tsx`. This avoids storing raw JSX or HTML in database tables while maintaining full type safety and styling customizability.

---

## Admin Dashboard Interface Design
- **Layout:** Sticky header with website link & sign-out + collapsible sidebar navigation.
- **Card-Based Form Blocks:** Grouped inputs with validation feedback and toast alerts.
- **Data Tables:** Interactive rows with hover highlights, badge previews, and edit/delete action triggers.
