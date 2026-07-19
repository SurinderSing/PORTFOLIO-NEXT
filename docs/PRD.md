# Product Requirements Document (PRD) - PORTFOLIO-NEXT

## Product Vision & Objectives
This web portfolio is designed to showcase the professional career, experience, technical skills, and projects of Surinder Singh, a Frontend Engineer.
The application serves as a dynamic resume, a projects gallery, and an interactive contact interface.

## Target Audience
- Technical recruiters and hiring managers.
- Potential clients or business partners.
- Developers looking for portfolio design inspiration.
- AI scrapers/agents parsing resume details.

## Feature Inventory

| Feature | Description | Status | Future Goal |
|:---|:---|:---|:---|
| **About/Home** | Professional summary, core values, "What I do" grid. | Completed | Static -> Dynamic (Supabase) |
| **Resume Screen** | Date-sorted professional timeline, structured skills list. | Completed | Download resume button enhancement |
| **Work/Portfolio** | Project gallery cards (image, description, tech chips, links). | Completed | Search/filters for projects |
| **Contact Form** | Client-validated Formspree integration for secure email sending. | Completed | In-app message history dashboard |
| **Auth System** | Sign-up, Sign-in credentials, verification emails. | Completed | Supabase Auth transition |
| **Theme Toggle** | System/Light/Dark mode transition via tailwind-themes. | Completed | Custom neon theme accent |
| **Admin Dashboard**| Administrative control center for updating portfolio data. | In Progress / Planned | Supabase integration |
| **Blog Module** | Shared technical articles and career logs. | Commented Out / Planned | MDX-based or Supabase CMS |

## User Experience Goals
- **Load Performance:** Under 1.5 seconds initial paint. High-score audits on web-vitals.
- **Responsiveness:** Fluid styling layouts matching small device viewport scales. Responsive side sections and drawers.
- **Accessibility:** Readable contrast colors, accessible tab-focus markers, screen-reader compatibility.
- **Polished Aesthetics:** Seamless animations (page transitions and scroll triggers using Framer Motion) providing premium micro-interactions.

## Constraints & Assumptions
- **No Test Requirement:** Explicitly requested to proceed without unit or integration test configurations.
- **Static Hardcoded Data:** The active profile data (experience, details, links) is currently hardcoded in local React constants.
- **MySQL Backend:** Managed via local Prisma schema, to be shifted or connected to Supabase in a future phase.
