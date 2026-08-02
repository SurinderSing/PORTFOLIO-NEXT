# UI/UX Design Brief - PORTFOLIO-NEXT

## Design Aesthetic
A sleek, modern developer portfolio featuring curated gradients, dark mode support, fluid responsiveness, and premium micro-animations that engage visitors.

## Design Tokens & Typography

### Fonts
The site uses custom Google fonts configured via `next/font` (mapped to CSS variables in `src/styles/fonts.ts`):
- **Raleway (`--font-raleway`):** Principal body typeface. Clean, geometric, and highly readable.
- **Poppins (`--font-poppins`):** Headings typeface. Offers modern and structured hierarchy.
- **Pacifico (`--font-pacifico`):** Highlight/Accent brand font. Used for cursive signatures or logo branding.

### Spacing & Layout Constraints
- **Main Container:** Wrapped in `.section-container` (defined in `src/styles/main.css`). Max-width is `1200px` with horizontal padding (`px-4`).
- **Responsive Breaks:** Desktop-first configuration using Tailwind max-width media rules:
  - `2xl`: `max-width: 1536px`
  - `xl`: `max-width: 1280px`
  - `lg`: `max-width: 1024px`
  - `md`: `max-width: 768px` (Header collapses, layouts stack vertically)
  - `sm`: `max-width: 640px`
  - `xs`: `max-width: 480px`

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

## Animation Ecosystem

Page entries and interactions use Framer Motion components (`src/components/animations/`):
1. **FadeIn (`fade-in.tsx`):** Container animation supporting staggered children entry delays.
2. **ScrollReveal (`scroll-reveal.tsx`):** Triggered when components intersect viewport boundaries. Animates opacity and vertical translation.
3. **AnimatedDivider (`animated-divider.tsx`):** Scale-in border animation.
4. **Keyframe Animations (Tailwind):**
   - `fade-in-up`: Opacity + translation upward offset.
   - `progress`: Infinite loader bar translation.
   - `pulse-slow`: Subtle scale pulsing.
