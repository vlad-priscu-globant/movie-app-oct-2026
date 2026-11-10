# Master Agent Rule File (`AGENTS.md`)

**Role:** Multi-Tool Context Engineering Standard  
**Target Agents:** OpenAI Codex, GitHub Copilot, Google Antigravity, Claude Code, Cursor AI  
**Master Blueprint Pointer:** Read `@ARCHITECTURE.md`

---

## 1. Master Context Links & References

All AI coding assistants MUST inspect and adhere to the master context pointers:

1. **System Architecture Guide:** [`ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md) (Core blueprint, Nuxt 3, Supabase, Express API)
2. **Project Preferences:** [`project-preferences.md`](file:///c:/projects/movie-app-oct-2026/project-preferences.md) (Tech stack evolution, Phase 1-3 roadmap, strict rules)
3. **Discovery Report:** [`DISCOVERY_REPORT.md`](file:///c:/projects/movie-app-oct-2026/DISCOVERY_REPORT.md) (Installed dependencies & directory structure)
4. **Persona & Operating Rules:** [`.agents/rules/persona-and-principles.md`](file:///c:/projects/movie-app-oct-2026/.agents/rules/persona-and-principles.md)
5. **Code Conventions:** [`.agents/rules/code-conventions.md`](file:///c:/projects/movie-app-oct-2026/.agents/rules/code-conventions.md)
6. **Fact Checking & Verification:** [`.agents/rules/fact-checking.md`](file:///c:/projects/movie-app-oct-2026/.agents/rules/fact-checking.md)
7. **Architectural Decisions Log:** [`.agents/memory/decisions.md`](file:///c:/projects/movie-app-oct-2026/.agents/memory/decisions.md)
8. **Gotchas & API Quirks Log:** [`.agents/memory/gotchas.md`](file:///c:/projects/movie-app-oct-2026/.agents/memory/gotchas.md)
9. **Error Recovery Protocol:** [`.agents/rules/error-recovery.md`](file:///c:/projects/movie-app-oct-2026/.agents/rules/error-recovery.md)
10. **Supabase Operations Protocol:** [`.agents/rules/supabase-operations.md`](file:///c:/projects/movie-app-oct-2026/.agents/rules/supabase-operations.md)
11. **Vercel Operations Protocol:** [`.agents/rules/vercel-operations.md`](file:///c:/projects/movie-app-oct-2026/.agents/rules/vercel-operations.md)

---

## 2. Core Architectural Guardrails

Every AI interaction and code edit MUST comply with the following 4 rules:

* **Rule 1: Script Setup Syntax Standard**  
  Every Vue Single-File Component (SFC) must exclusively use `<script setup lang="ts">`.
* **Rule 2: Absolute Type Safety (Zero `any`)**  
  Zero `any` or untyped `unknown` escape hatches. All domain models, API responses, props, and emits must be strictly typed.
* **Rule 3: Reactivity Abstraction (No Direct DOM Access)**  
  Direct DOM manipulation (`document.getElementById`, `querySelector`, `innerHTML`) is banned. Use Vue `ref`, `reactive`, and `computed`.
* **Rule 4: Component State Isolation**  
  State flow follows **Props Down (read-only), Emits Up (`defineEmits`)**. Direct mutation of props in child components is prohibited.

---

## 3. Technology Stack Evolution Roadmap

* **Phase 1 (Sessions 1–4) [COMPLETED]:** Vite + Vue 3 Composition API + Tailwind CSS v4 + TypeScript + Zod.
* **Phase 2 (Sessions 5–8) [ACTIVE - Session 05]:** Component Architecture + Express Backend + Nuxt 3 (SSR) + Supabase Auth & DB.
* **Phase 3 (Sessions 9–12) [PENDING]:** Vercel Deployment + Agile Workday Simulation (Jira, Git Flow, PR Reviews).

---

## 4. CLI Verification Commands

```bash
# Development server launch
npm run dev

# Production build & typecheck
npm run build

# Direct typecheck verification
npm run typecheck   # (npx vue-tsc --noEmit)

# Linting & code formatting verification
npm run lint        # (npx eslint .)
```

---

## 5. Skills & Preference Access Protocol (`git diff`)

* **Context Discovery:** To verify newly generated skills, updated project preferences (`project-preferences.md`), or pending context changes made by other AI agent tools, agents MUST execute:
  ```bash
  git diff
  git status
  ```
* **Soft Conflict Protocol:** If a user or tool requests a non-compliant pattern, issue a warning citing the rule, offer an idiomatic Vue 3 / Nuxt 3 alternative, and confirm before proceeding.
