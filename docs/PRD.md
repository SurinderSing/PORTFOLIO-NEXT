# Product Requirements Document (PRD) - PORTFOLIO-NEXT

## Product Vision & Objectives
This web portfolio is designed to showcase the professional career, experience, technical skills, and projects of Surinder Singh, a Frontend Engineer.
The application serves as a dynamic resume, a projects gallery, an interactive contact interface, and an administrative control center for content management.

## Target Audience
- Technical recruiters and hiring managers.
- Potential clients or business partners.
- Developers looking for portfolio design inspiration.
- Admin content manager (Surinder Singh).
- Future blog readers and story contributors.

## Feature Inventory

| Feature | Description | Status | Future Goal |
|:---|:---|:---|:---|
| **About/Home** | Professional summary, core values, dynamic "What I do" cards. | Completed | Fully dynamic (Supabase) |
| **Resume Screen** | Date-sorted professional timeline, categorized skills matrix. | Completed | Dynamic database timelines & categories |
| **Work/Portfolio** | Project gallery cards (image, description, tech chips, links). | Completed | Dynamic database projects & ordering |
| **Contact Form** | Client-validated Formspree integration with dynamic contact details. | Completed | Custom in-app messaging |
| **Auth System** | Sign-up, Sign-in credentials, verification emails via Supabase Auth. | Completed | Role-based RBAC permissions |
| **Admin Dashboard**| Administrative control center for updating all portfolio data. | Completed | File uploads via Supabase Storage |
| **Theme Toggle** | System/Light/Dark mode transition via next-themes. | Completed | Custom theme accents |
| **Blog Module** | Shared technical articles and career logs. | Database Schema Ready | Rich text editor UI |
| **Stories Module** | Short stories and updates with user commenting. | Database Schema Ready | Social interactions |

## User Experience Goals
- **Load Performance:** Under 1.5 seconds initial paint. High-score audits on web-vitals.
- **Responsiveness:** Fluid styling layouts matching small device viewport scales. Responsive side sections and drawers.
- **Accessibility:** Readable contrast colors, accessible tab-focus markers, screen-reader compatibility.
- **Polished Aesthetics:** Seamless animations (page transitions and scroll triggers using Framer Motion) providing premium micro-interactions.
- **Zero-Code Updates:** Full content management without touching codebase.

## Constraints & Assumptions
- **No Test Requirement:** Explicitly requested to proceed without unit or integration test suites.
- **Supabase Backend:** All data, authentication, and security policies are hosted on Supabase PostgreSQL.
