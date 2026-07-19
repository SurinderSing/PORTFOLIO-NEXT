# Memory Bank - Active Context

## Active Focus
The current focus is **Making the PORTFOLIO-NEXT repository 100% AI Agent Ready**. This involves writing detailed, standardized documentation (PRD, TRD, Application Flow, Design Brief, Backend Schema) and AI configuration guidelines (AGENTS.md, .cursorrules, CLAUDE.md, copilot-instructions.md).

---

## Decisions Made & Alignment

1. **Memory Bank Implementation:** Adopted the universal file-based Memory Bank context preservation technique to keep short-term focus, current progress, and architectural context saved in files.
2. **Testing Limitations:** Explicitly defined a **No Unit Tests** constraint. No test framework configs or spec files will be written.
3. **Pipeline Limitations:** Explicitly defined a **No CI/CD Pipeline** constraint.
4. **Supabase Transition Plan:** Acknowledged the owner's plan to replace local MySQL and Prisma servers with Supabase client bindings for dynamic resume data and portfolio information details in the future.
5. **Multi-Agent Compatibility:** Written customized instructions for Claude Code (`CLAUDE.md`), Cursor (`.cursorrules`), Copilot (`.github/copilot-instructions.md`), and Gemini/Antigravity (`.agents/AGENTS.md`) mapping the identical technical boundaries.

---

## Current Status & Next Actions

- [/] **Root & Configuration Files:** Completed the core universal AGENTS.md, .cursorrules, CLAUDE.md, copilot-instructions.md, and .agents/AGENTS.md files.
- [/] **Docs Directory:** Completed PRD.md, TRD.md, APP_FLOW.md, UI_UX_DESIGN_BRIEF.md, and BACKEND_SCHEMA.md.
- [/] **Memory Bank Initialization:** Creating the 6 core memory bank files.
- [ ] **Verification:** Validate formatting, check markdown links for errors, and perform a dry-run compile using `npm run lint`.
