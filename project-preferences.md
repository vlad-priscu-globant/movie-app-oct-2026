# Project Preferences & Technology Roadmap (`project-preferences.md`)

**Role:** Senior Staff Architect  
**Workspace:** `movie-app-oct-2026`  
**Reference Pointers:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md)

---

## 1. Active Technology Stack Evolution Roadmap

The application architecture follows a phased 12-session curriculum and production development roadmap:

### Phase 1 (Sessions 1–4) [COMPLETED]
- **Foundational Architecture:** Vite Single Page Application (SPA) + Vue 3 Composition API.
- **Styling:** Tailwind CSS v4 + PostCSS + Autoprefixer.
- **Language & Types:** TypeScript with strict type checking (`vue-tsc`).
- **Validation:** Zod schemas for runtime validation and static type inference.
- **Client Routing:** `vue-router` v4 with HTML5 Web History mode.

### Phase 2 (Sessions 5–8) [ACTIVE - Current Phase]
- **Session 05:** Component Architecture (Atomic design, Props & Emits) & Multi-Tool Agentic AI Context Setup.
- **Session 06:** Early Backend Integration & External APIs (Local Express server, TMDB API, JWT authentication).
- **Session 07:** Nuxt 3 Migration (Transition from Vite SPA to Nuxt 3 SSR, Nitro engine, Performance & Speed Insights).
- **Session 08:** Backend As A Service (Supabase Auth, PostgreSQL Database Integration, Row-Level Security / RLS).

### Phase 3 (Sessions 9–12) [PENDING]
- **Session 09:** CI/CD & Cloud Deployment on Vercel (Staging & Production environments, Edge middleware).
- **Session 10:** Workday Simulation Part 1 — Agile Sprint Planning, Jira ticket integration, branching strategy (`feat/`, `fix/`).
- **Session 11:** Workday Simulation Part 2 — Feature development, PR reviews, code quality gates.
- **Session 12:** Workday Simulation Part 3 — Sprint Retrospective, Production delivery, and portfolio presentation.

---

## 2. Strict Architectural Rules (Non-Negotiable)

Every AI interaction, manual contribution, or code edit MUST strictly uphold these 4 core guardrails:

1. **Rule 1: Exclusive `<script setup lang="ts">` Standard**  
   Every Vue Single-File Component (SFC) must use `<script setup lang="ts">`. Options API and untyped script blocks are prohibited.
2. **Rule 2: Absolute Type Safety (Zero `any`)**  
   Zero `any` or untyped `unknown` escape hatches. All domain models, API responses, props, and emits must be strictly typed.
3. **Rule 3: Reactivity Abstraction (No Direct DOM Access)**  
   Direct DOM manipulation (`document.getElementById`, `querySelector`, `innerHTML`) is banned. Use Vue `ref`, `reactive`, and `computed`.
4. **Rule 4: Component State Isolation**  
   State flow follows **Props Down (read-only), Emits Up (`defineEmits`)**. Direct mutation of props in child components is strictly prohibited.

---

## 3. Soft Conflict & Architectural Warning Protocol

If a user prompt, third-party library, or automated tool requests a pattern that contradicts these preferences:
1. **Issue an Immediate Warning:** Cite the specific violated rule or roadmap phase.
2. **Offer an Idiomatic Alternative:** Propose an idiomatic Vue 3 / Nuxt 3 Composition API solution.
3. **Seek User Confirmation:** Prompt for confirmation before applying non-standard code patterns.

