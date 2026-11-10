# 12-Session Curriculum & Milestone Progress Tracker (`tracking.md`)

**Role:** Curriculum Coordinator  
**Workspace:** `movie-app-oct-2026`  
**Current Milestone:** Session 05 (Completed) $\rightarrow$ Transitioning to Session 06  
**Reference Blueprint:** [`ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`project-preferences.md`](file:///c:/projects/movie-app-oct-2026/project-preferences.md)

---

## Curriculum Overview & Status Summary

| Phase | Sessions | Focus | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1: SPA Foundation** | Sessions 01–04 | Vite, Vue 3 Composition API, Tailwind v4, Routing, Reactivity, Zod | ✅ **COMPLETED** |
| **Phase 2: Fullstack & SSR** | Sessions 05–08 | Component Architecture, AI Agentic Layer, Express, Nuxt 3 SSR, Supabase | 🔄 **ACTIVE (Session 05 Done)** |
| **Phase 3: Production & Agile** | Sessions 09–12 | Vercel Deployment, CI/CD, Agile Workday Simulation (Jira, Git Flow, PRs) | ⏳ **PENDING** |

---

## Detailed Session Breakdown & Deliverables

- [x] **Session 01: Environment Setup, Git, GitHub & Jira Integration (Workday Simulation Overview)**
  - *Deliverables:* Local dev environment initialized, Git repository configured, Jira board integration, clean branch hygiene established.

- [x] **Session 02: Transitioning from Vanilla JS to Vue 3, Vite & Tailwind CSS Setup**
  - *Deliverables:* Migration from imperative DOM manipulation to declarative Vue 3 Single-File Components (`<script setup lang="ts">`), Vite bundling, Tailwind CSS v4 setup.

- [x] **Session 03: SPA UI Architecture, Vue Router, Responsive Layouts & Slots**
  - *Deliverables:* Vue Router 4 integration (`createRouter`, `createWebHistory`), responsive movie catalog layout, navigation shell (`App.vue`), and slot-based components (`MovieListItem.vue`).

- [x] **Session 04: Vue 3 Advanced Reactivity (ref, reactive, computed, watch) & Schema Validation with Zod**
  - *Deliverables:* Mastered `ref` vs `reactive`, pure `computed` filters, input cleanup with `watch`, runtime validation and TypeScript inference using Zod schemas (`loginSchema`).

- [x] **Session 05: Component Architecture (Props & Emits) & Agentic AI Setup (Discovery & Configs)**
  - *Deliverables:*
    - Deconstructed monolithic views into reusable child components (`MovieCard.vue`, `SearchBar.vue`).
    - Established Props Down, Emits Up state isolation.
    - Executed Discovery Phase ([`DISCOVERY_REPORT.md`](file:///c:/projects/movie-app-oct-2026/DISCOVERY_REPORT.md)).
    - Configured multi-tool agentic AI context engineering layer (`AGENTS.md`, `ARCHITECTURE.md`, `project-preferences.md`, `.agents/rules/`, `.agents/workflows/`, `.agents/skills/`, `CLAUDE.md`, `.cursorrules`).

- [ ] **Session 06: Early Backend Integration & External APIs (Local Express Server, TMDB API, JWT Auth)**
  - *Deliverables:* Express REST API layer (`server/`), external API consumption (The Movie Database - TMDB), API key security, JWT authentication endpoints.

- [ ] **Session 07: Nuxt 3 Migration (SSR vs SPA), Performance & Speed Insights**
  - *Deliverables:* Migration from Vite SPA to Nuxt 3 Server-Side Rendering (SSR), Nitro server routes, `@nuxt/image` optimization, Core Web Vitals audit.

- [ ] **Session 08: Backend As a Service (Supabase Authentication, Database Integration & RLS)**
  - *Deliverables:* `@nuxtjs/supabase` integration, PostgreSQL movie & favorites schema, Row-Level Security (RLS) policies, session-based auth state.

- [ ] **Session 09: CI/CD, Deployment on Vercel, Staging & Production Environments**
  - *Deliverables:* GitHub Actions / Vercel CI/CD pipelines, preview deployments, environment variable management, production monitoring via Vercel Analytics & Speed Insights.

- [ ] **Session 10: Workday Simulation Part 1 – Agile Sprint Planning, Ticket Creation & Branching Strategy**
  - *Deliverables:* Sprint planning ceremony, Jira backlog grooming, ticket acceptance criteria drafting, Git Flow branching (`feat/`, `fix/`).

- [ ] **Session 11: Workday Simulation Part 2 – Feature Development, Code Reviews & Pull Request Flow**
  - *Deliverables:* Autonomous ticket implementation, self-healing diagnostic recovery, standardized PR creation (`PULL_REQUEST_TEMPLATE.md`), peer code reviews.

- [ ] **Session 12: Workday Simulation Part 3 – Sprint Retrospective, Production Delivery & Portfolio Presentation**
  - *Deliverables:* Sprint demo & retrospective, production release tagging, final portfolio-ready repository documentation.

