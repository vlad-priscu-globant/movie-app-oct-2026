# Master System Architecture Guide (`ARCHITECTURE.md`)

**Target Systems:** Google Antigravity, Claude Code, Cursor AI, OpenAI Codex  
**Project:** Movie Application (`movie-app-oct-2026`)  
**Status:** Phase 1 (Vite SPA Baseline) -> Phase 2 (Nuxt 3 SSR + Supabase + Nitro API Active Roadmap)  
**Pointer Reference:** [`AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md), [`project-preferences.md`](file:///c:/projects/movie-app-oct-2026/project-preferences.md), [`DISCOVERY_REPORT.md`](file:///c:/projects/movie-app-oct-2026/DISCOVERY_REPORT.md)

---

## 1. Tech Stack & Core Libraries

The application is structured for enterprise scalability, moving from a client-side SPA to a high-performance Nuxt 3 Server-Side Rendered (SSR) fullstack platform:

- **Core Framework:** Nuxt 3 / Vue 3 Composition API exclusively utilizing `<script setup lang="ts">`.
- **Rendering & Server Engine:** Nitro Server Engine (H3 event handling, edge-compatible server routes).
- **Styling Architecture:** Tailwind CSS v4 with `@tailwindcss/vite` engine.
- **Data Integrity & Validation:** Zod runtime validation with compile-time TypeScript type inference.
- **Backend-as-a-Service (BaaS):** `@nuxtjs/supabase` / Supabase JS client (Authentication, PostgreSQL Database, Row Level Security).
- **Media Optimization:** `@nuxt/image` (TMDB poster optimization, lazy loading, aspect-ratio reservation).
- **Deployment & Hosting:** Vercel (Edge network, Speed Insights, Web Analytics).

---

## 2. Project Directory Map

When operating in Nuxt 3 / Fullstack mode, directories fulfill the following discrete responsibilities:

```text
movie-app-oct-2026/
├── pages/                # Nuxt file-system routing views (mapped from src/views/)
├── components/           # Modular, presentational Vue SFCs (Props down, Emits up)
├── layouts/              # Reusable page shells (e.g., default.vue with Header & Footer)
├── middleware/           # Client & server navigation route guards (auth protection)
├── server/               # Nitro backend engine
│   ├── api/              # H3 RESTful API endpoints (defineEventHandler)
│   ├── middleware/       # Server request interceptors (JWT validation, logging)
│   └── utils/            # Server-side database helpers and Supabase admin clients
├── composables/          # Stateful business logic (useFavorites, useMovieSearch)
├── types/                # Domain TypeScript models, contracts, and Zod schemas
└── public/               # Public unbundled static assets (favicon.svg, icons.svg)
```

---

## 3. Primary Terminal Verification Commands

```bash
# Launch development server (Vite or Nuxt dev)
npm run dev

# Full production build and bundle compilation
npm run build

# Direct typecheck verification (Zero errors allowed)
npx vue-tsc -b          # (or npx nuxi typecheck in Nuxt 3)

# Linting & code formatting verification
npx eslint .

# Local preview of production build
npm run preview
```

---

## 4. Code Quality & Architectural Guardrails

1. **Absolute Type Safety (Zero `any`):**  
   All props, emits, event handlers, and API payloads must have explicit types. Untyped `unknown` or `any` is blocked.
2. **Reactivity Abstraction:**  
   Never touch the DOM directly (`document.querySelector`, `innerHTML`). Use `ref`, `reactive`, and `computed`.
3. **Component State Isolation:**  
   Props Down (read-only), Emits Up (`defineEmits`). Child components must never directly mutate passed props.
4. **Auto-Imports vs. Explicit Type Imports:**  
   In Nuxt, Vue primitives (`ref`, `computed`, `watch`) and composables are auto-imported. Explicit type imports (`import type { Movie } from '@/types'`) are mandatory.
5. **Nitro API Handlers:**  
   Backend routes in `server/api/` must use `defineEventHandler` and return strictly typed JSON payloads.
6. **Supabase Composables:**  
   Use standard Nuxt/Vue Supabase integration composables (`useSupabaseClient`, `useSupabaseUser`) for authenticated state and database queries.

---

## 5. Model Context Protocol (MCP) Server Protocol

When interacting with MCP servers in this workspace, follow these operating guidelines:

1. **Documentation Queries (`context7`):**
   - Query Context7 for authoritative Vue 3.5+, Nuxt 3, and Tailwind CSS v4 syntax before proposing complex configurations.
2. **Database Queries (`supabase` MCP):**
   - Query Supabase schema definitions and RLS policies prior to modifying server endpoints or client queries.
3. **Deployment & Runtime Logs (`vercel` MCP):**
   - Inspect build logs, runtime errors, and deployment aliases via Vercel MCP when debugging cloud deployments.

