# Application Flow Document - PORTFOLIO-NEXT

This document outlines the routing structure, access middleware, and page hierarchies.

## Routing Map

The application utilizes Next.js 14 App Router organized into separated route groups:

```
src/app/
├── (website)/               # Publicly viewable portfolio pages (SSR / Static Prerendered)
│   ├── blog/                # Engineering articles feed with search & tags
│   │   └── [slug]/          # Single article reading view with interactive comments
│   ├── contact/             # Terminal contact form + System Status & Network Nodes
│   ├── resume/              # Profile summary, categorized skills matrix & timelines
│   ├── work/                # Systems & Architecture project showcase cards
│   ├── layout.tsx           # Global website frame (TopNavbar, Main Container, Footer)
│   └── page.tsx             # Root home screen (Hero, Skills, Experience, Work, Contact Teaser)
│
├── (admin)/                 # Administrative management control center (Protected)
│   ├── layout.tsx           # Admin shell (Navigation sidebar, header, role guard)
│   └── admin/
│       ├── page.tsx         # Dashboard overview with sync metrics & quick navigation
│       ├── site-settings/   # Edit global texts, owner info, resume PDF URL
│       ├── blogs/           # CRUD engineering articles & publication status
│       ├── contacts/        # CRUD phone, email, and location entries
│       ├── social-links/    # CRUD LinkedIn, GitHub, Instagram links
│       ├── about-cards/     # CRUD "What I do!" homepage cards
│       ├── skills/          # CRUD skill categories & individual skills
│       ├── experiences/     # CRUD work & education timelines
│       └── projects/        # CRUD portfolio projects & tech chips
│
├── (auth)/                  # Session registration routes (Supabase Auth)
│   ├── sign-in/             # Terminal sign-in login panel
│   ├── sign-up/             # Create admin account form
│   ├── verification-success/# Verified status landing page
│   └── layout.tsx           # Minimalistic authentication layout with theme toggle
│
├── api/                     # Backend API endpoints
│   ├── auth/
│   │   ├── confirm/         # Supabase OTP token verification callback
│   │   └── sign-out/        # Supabase sign out route
│   ├── preview-check/       # Iframe embedding header validation endpoint
│   └── route.ts             # Health check HEAD test endpoint
│
├── provider.tsx             # Redux Store wrapper provider
├── sitemap.ts               # Canonical XML sitemap compiler script
└── robots.ts                # Search scraper crawler instructions index
```

---

## Access Controls & Role-Based Middleware Flow

The application routing is protected by edge middleware (`src/utils/supabase/middleware.ts`):

```mermaid
sequenceDiagram
    autonumber
    actor User as Client Browser
    participant MW as Middleware (Supabase)
    participant Signin as /sign-in
    participant Admin as /admin/*
    participant Home as /

    User->>MW: Requests /admin/*
    alt Unauthenticated
        MW->>Signin: Redirect to /sign-in?redirect=/admin
    else Authenticated
        MW->>MW: Query profiles.role for user.id
        alt role == 'ADMIN'
            MW->>Admin: Allow Request
        else role != 'ADMIN'
            MW->>Home: Redirect to / (Forbidden)
        end
    end

    User->>MW: Requests /sign-in or /sign-up
    alt Authenticated
        MW->>Home: Redirect to /
    else Unauthenticated
        MW->>Signin: Forward Request
    end
```

---

## Admin Mutation Flow (Server Actions)

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin User
    participant Page as Admin Client Form
    participant Action as Server Action (admin-actions.ts)
    participant Supabase as Supabase DB
    participant Cache as Next.js Cache (revalidatePath)

    Admin->>Page: Fill form & click "Save Changes"
    Page->>Action: Call Server Action (e.g. updateSiteSettingsAction)
    Action->>Supabase: Verify session & check profiles.role == 'ADMIN'
    Action->>Supabase: Execute Mutation (insert/update/delete)
    Action->>Cache: revalidatePath('/', 'layout'), revalidatePath('/resume'), etc.
    Action-->>Page: Return { success: true, message: 'Saved.' }
    Page-->>Admin: Show success toast notification
```

---

## 🔗 Related Specifications & Knowledge Nodes
- Central Hub: [[PORTFOLIO_GRAPH|Knowledge Hub (MOC)]]
- Technical Requirements: [[docs/TRD|TRD]]
- Database Schema: [[docs/BACKEND_SCHEMA|Backend Schema]]
- System Patterns: [[memory-bank/systemPatterns|System Patterns]]
- Product Context: [[memory-bank/productContext|Product Context]]

