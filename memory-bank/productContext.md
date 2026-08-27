# Memory Bank - Product Context

## User Experience Goals
We want visitors and administrators to experience high performance, clean typography, dynamic flexibility, and responsive ergonomics:
- **Fast Load Speed:** Sub-second server rendering with Next.js App Router and static fallbacks.
- **Visual Contrast & Animation:** Curated HSL themes, system dark/light switching, Framer Motion staggered reveals.
- **Admin Ease:** Complete control over content from `/admin` without code edits or manual deployments.

---

## Core Interfaces & Modules

### 1. Root Portal Page (`/`)
- Dynamic professional heading and summary paragraph from `site_settings`.
- Dynamic "What I do!" grid with 6 expertise cards from `about_cards` (resolved via `icon-resolver.tsx`).

### 2. Resume Screen (`/resume`)
- Dynamic professional summary from `site_settings.resume_summary`.
- Split timeline cards for Education and Work experiences from `experiences`.
- Categorized skill chips dynamically rendered by categories from `skill_categories` & `skills`.

### 3. Portfolio Showcase (`/work`)
- Dynamic intro paragraph from `site_settings.work_description`.
- Dynamic project showcase cards from `projects` with technologies, links, and covers.
- Structured Data JSON-LD for search crawler indexing.

### 4. Contact Form (`/contact`)
- Dynamic contact cards (Phone, Email, Location) from `contacts`.
- Formspree form submission with success confirmation and dynamic Form ID from `site_settings.formspree_id`.

### 5. Admin Control Center (`/admin/*`)
- **Overview:** Dashboard metrics and status checks.
- **Site Settings:** Edit owner info, headings, summaries, descriptions, resume PDF.
- **Contacts:** CRUD phone, email, location.
- **Social Links:** CRUD platform URLs.
- **About Cards:** CRUD homepage cards.
- **Skills & Categories:** CRUD technical categories and skill chips.
- **Experiences:** CRUD work and education timelines.
- **Projects:** CRUD portfolio showcase items.

---

## 🔗 Related Knowledge & System Links
- Central Hub: [[PORTFOLIO_GRAPH|Knowledge Hub (MOC)]]
- Architecture Patterns: [[memory-bank/systemPatterns|System Patterns]]
- Routing & Middleware: [[docs/APP_FLOW|App Flow]]
- Database Models: [[docs/BACKEND_SCHEMA|Backend Schema]]
- Visual System: [[docs/UI_UX_DESIGN_BRIEF|UI/UX Design Brief]]

