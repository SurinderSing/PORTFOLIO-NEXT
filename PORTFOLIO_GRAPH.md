# 🌐 PORTFOLIO-NEXT — Knowledge Hub & Map of Content (MOC)

Welcome to the central Map of Content for the **PORTFOLIO-NEXT** project repository. This vault integrates the documentation, memory bank, database architecture, and Next.js 14 App Router codebase into a bi-directionally linked knowledge graph.

---

## 🧠 Memory Bank (Project Brain)
The Memory Bank preserves the project's living context, active sprint states, and patterns:
- [[memory-bank/projectbrief|Project Brief]] — Core mission, scope, and explicit non-goals (no unit tests, no CI/CD).
- [[memory-bank/productContext|Product Context]] — User experience goals, target personas, and core interfaces.
- [[memory-bank/systemPatterns|System Patterns]] — RSC architecture, Server Action mutation patterns, icon resolvers.
- [[memory-bank/techContext|Tech Context]] — Dependencies (Next.js 14, Supabase SSR, Redux Toolkit, Framer Motion, Tailwind).
- [[memory-bank/activeContext|Active Context]] — Current sprint focus, active developments, and immediate roadmap.
- [[memory-bank/progress|Progress Tracker]] — Completed features, verified deliverables, and backlog tasks.

---

## 📑 Technical Documentation & Specifications
Comprehensive architectural and design specifications:
- [[docs/PRD|Product Requirements Document (PRD)]] — High-level requirements, audience, and feature status table.
- [[docs/TRD|Technical Requirements Document (TRD)]] — Next.js App Router architecture, security policies, drag-and-drop mechanics.
- [[docs/APP_FLOW|Application Flow Document]] — Routing tree, access middleware flow, and Server Action sequence.
- [[docs/BACKEND_SCHEMA|Backend & Database Schema]] — Supabase PostgreSQL table schemas, reverse triggers, and RLS policies.
- [[docs/UI_UX_DESIGN_BRIEF|UI/UX Design Brief]] — Design system, dark/light theme tokens, typography, and motion choreography.

---

## 🤖 AI Governance & Rules
Rules and conventions guiding AI agent pair programming:
- [[AGENTS|AGENTS.md]] — Supreme rules (Doc Sync, DRY utilities, Single-Responsibility, Build Checks).
- [[.agents/AGENTS|.agents/AGENTS.md]] — Workspace-scoped Antigravity agent instructions.
- [[CLAUDE|CLAUDE.md]] — Anthropic Claude developer configuration.
- [[.github/copilot-instructions|.github/copilot-instructions.md]] — GitHub Copilot operational guidance.

---

## ⚡ Next.js 14 App Router Architecture

### 1. Public Portfolio (`src/app/(website)/`)
- **Home Portal** (`/`) — Hero section, dynamic "What I do!" cards.
- **Resume Page** (`/resume`) — Professional timeline cards & categorized skills matrix.
- **Portfolio Showcase** (`/work`) — Interactive project cards with JSON-LD structured data.
- **Engineering Blog** (`/blog` & `/blog/[slug]`) — Technical insights, tag filters, and interactive comments.
- **Contact Terminal** (`/contact`) — Contact cards & Formspree submission engine.

### 2. Admin Control Center (`src/app/(admin)/admin/`)
- **Dashboard Overview** (`/admin`) — Sync metrics & status indicators.
- **Site Settings** (`/admin/site-settings`) — Global texts, headings, owner metadata, resume PDF.
- **Blog Posts Manager** (`/admin/blogs`) — CRUD technical articles with Markdown editor, tags, and status.
- **Contacts Management** (`/admin/contacts`) — Phone, email, location CRUD with HTML5 Drag & Drop reordering.
- **Social Links** (`/admin/social-links`) — Social media platforms CRUD with Drag & Drop reordering.
- **About Cards** (`/admin/about-cards`) — Homepage expertise cards CRUD with Drag & Drop reordering.
- **Skills Matrix** (`/admin/skills`) — Skill categories and chips CRUD with Drag & Drop reordering.
- **Experiences** (`/admin/experiences`) — Education & career timeline CRUD with Drag & Drop reordering.
- **Projects** (`/admin/projects`) — Portfolio projects CRUD with Drag & Drop reordering.

### 3. Authentication & API (`src/app/(auth)/` & `src/app/api/`)
- **Sign In** (`/sign-in`) — Supabase auth credentials login.
- **Sign Up** (`/sign-up`) — Admin account creation.
- **Verification Success** (`/verification-success`) — Supabase OTP token verification callback.
- **Auth APIs** (`/api/auth/confirm`, `/api/auth/sign-out`) — Session validation & logout.

---

## 🗄️ Database & Security Architecture (Supabase)
Central database models and security controls:
- **Tables (11):** `profiles`, `site_settings`, `contacts`, `social_links`, `about_cards`, `skill_categories`, `skills`, `experiences`, `projects`, `blog_posts`, `stories`, `comments`.
- **Query Layer:** `src/lib/supabase-queries.ts` (uses cookieless `server-anon.ts` for static generation / ISR).
- **Mutation Layer:** `src/lib/admin-actions.ts` (uses cookie-based `server.ts` with `profiles.role = 'ADMIN'` RBAC check).
- **Edge Middleware:** `src/middleware.ts` & `src/utils/supabase/middleware.ts`.

---

## 🎨 Interactive Graph View
- Open Obsidian Graph View (<kbd>Ctrl</kbd> + <kbd>G</kbd>) to view this interactive network.
- Visual Canvas: Open [[PORTFOLIO_GRAPH.canvas|Interactive Canvas Board]] for structured visual exploration.
