# PORTFOLIO-NEXT — Developer Portfolio & Admin Control Center

This is a Next.js 14 Web Portfolio and Admin Dashboard for **Surinder Singh**, built with React Server Components, Tailwind CSS, Framer Motion, Redux Toolkit, and Supabase PostgreSQL.

---

## 🌐 Knowledge Hub & Obsidian Vault

This repository is configured as a connected **Obsidian Vault** with cross-linked documentation, Memory Bank, and Canvas diagrams:

- **Central Map of Content (MOC):** [`PORTFOLIO_GRAPH.md`](file:///c:/Users/ssuri/OneDrive/Documents/projects/PORTFOLIO-NEXT/PORTFOLIO_GRAPH.md)
- **Interactive Canvas Board:** [`PORTFOLIO_GRAPH.canvas`](file:///c:/Users/ssuri/OneDrive/Documents/projects/PORTFOLIO-NEXT/PORTFOLIO_GRAPH.canvas)
- **Direct Obsidian URI Link:** [Open in Obsidian](obsidian://open?path=c%3A%2FUsers%2Fssuri%2FOneDrive%2FDocuments%2Fprojects%2FPORTFOLIO-NEXT)

---

## 📚 Documentation & Specifications

- **[[docs/PRD|Product Requirements Document (PRD)]]** — Features, roadmap, and scope.
- **[[docs/TRD|Technical Requirements Document (TRD)]]** — Architecture, security, and drag-and-drop mechanics.
- **[[docs/APP_FLOW|Application Flow]]** — Routing hierarchy and middleware sequences.
- **[[docs/BACKEND_SCHEMA|Backend Schema]]** — 11 Supabase PostgreSQL tables and RLS policies.
- **[[docs/UI_UX_DESIGN_BRIEF|UI/UX Design Brief]]** — Visual styling, theme tokens, and motion guidelines.
- **[[AGENTS|AGENTS.md]]** — Operational instructions for AI coding assistants.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and supply your Supabase and Formspree credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_FORMSPREE_FORM_ID="xrgwgbye"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 🛠️ Scripts & Tooling

- `npm run dev` — Start Next.js development server
- `npm run build` — Build production bundle
- `npm run lint` — Run ESLint check
- `npm run watch` — TypeScript compiler dry-run watcher
