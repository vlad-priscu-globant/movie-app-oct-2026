# Master System Architecture Guide (`ARCHITECTURE.md`)

**Target Systems:** Google Antigravity, Claude Code, Cursor AI, OpenAI Codex  
**Project:** Movie Application (`movie-app-oct-2026`)  
**Status:** Phase 2 — Session 07 Completed (Nuxt 4 SSR + Nitro API + Masked TMDB Proxy) → Next: Session 08 (Supabase Auth & DB)  
**Pointer Reference:** [`AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md), [`project-preferences.md`](file:///c:/projects/movie-app-oct-2026/project-preferences.md), [`DISCOVERY_REPORT.md`](file:///c:/projects/movie-app-oct-2026/DISCOVERY_REPORT.md)

---

## 1. Tech Stack & Core Libraries

The application is a Nuxt 4 Server-Side Rendered (SSR) fullstack platform backed by Nitro:

- **Core Framework:** Nuxt 4 (`4.6.x`) / Vue 3 Composition API exclusively utilizing `<script setup lang="ts">`.
- **Rendering & Server Engine:** Nitro Server Engine (H3 event handling, cached server routes, edge-compatible).
- **Styling Architecture:** Tailwind CSS v4 with `@tailwindcss/vite` engine (`app/assets/css/main.css`).
- **Data Integrity & Validation:** Zod runtime validation with compile-time TypeScript type inference (`shared/types/`).
- **Authentication (Session 07):** Edge-compatible JWT (`jose`) stored in an `httpOnly` cookie (`auth_token`). *(Supabase Auth & DB planned for Session 08).*
- **Media Optimization:** `@nuxt/image` (`<NuxtImg>`) proxying TMDB posters through the app's own image endpoint.
- **Testing & Linting:** Vitest + `@nuxt/test-utils` (`test/nuxt/`) and `@nuxt/eslint`.
- **Deployment & Hosting:** Vercel (Edge network, Speed Insights, Web Analytics — Phase 3).

---

## 2. Project Directory Map

Nuxt 4 places client source in `app/`, server code in `server/`, and shared contracts in `shared/`:

```text
movie-app-oct-2026/
├── app/
│   ├── assets/css/       # Global Tailwind v4 entry (main.css)
│   ├── components/       # Modular, presentational Vue SFCs (Props down, Emits up)
│   ├── composables/      # Stateful business logic (useAuth, useFavorites)
│   ├── layouts/          # Reusable page shells (default.vue with AppHeader & footer)
│   ├── middleware/       # SSR & client navigation route guards (auth.ts)
│   ├── pages/            # Nuxt file-system routing views (index, login, favorites, movie/[id])
│   ├── plugins/          # SSR auth hydration plugin (auth.server.ts)
│   ├── app.vue           # Root Nuxt shell (<NuxtLayout>, <NuxtPage>)
│   └── error.vue         # Global 404 / error boundary
├── server/
│   ├── api/              # H3 RESTful API endpoints (defineEventHandler / defineCachedEventHandler)
│   ├── data/             # Seed data for local favorites storage (favorites.seed.json)
│   └── utils/            # Server-side TMDB client, DTO mappers, auth helpers, FavoritesRepository
├── shared/
│   └── types/            # Shared Zod schemas & inferred TS types (#shared/types/*)
├── test/
│   └── nuxt/             # Vitest + @nuxt/test-utils component tests
└── public/               # Public unbundled static assets (favicon.svg, icons.svg, poster-placeholder.svg)
```

---

## 3. Primary Terminal Verification Commands

```bash
# Launch development server (Nuxt SSR + Nitro)
npm run dev

# Full production build and bundle compilation
npm run build

# Direct typecheck verification (Zero errors allowed)
npm run typecheck   # (nuxt typecheck)

# Linting & code formatting verification
npm run lint        # (eslint .)

# Component & integration tests
npm run test        # (vitest run)

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
   In Nuxt, Vue primitives (`ref`, `computed`, `watch`) and composables are auto-imported. Explicit type imports (`import type { Movie } from '#shared/types/movie'`) are mandatory.
5. **Nitro API Handlers & TMDB Masking:**  
   Backend routes in `server/api/` must use `defineEventHandler` / `defineCachedEventHandler`, validate inputs with Zod, and return strictly typed app DTOs. TMDB tokens, base URLs, and raw payloads must never cross into client bundles or client API responses.
6. **Repository & Boundary Isolation:**  
   Handlers depend on `server/utils` abstractions (`FavoritesRepository`, `tmdb.ts`), allowing Session 08 to swap in Supabase without changing route handlers.

---

## 5. Model Context Protocol (MCP) Server Protocol

When interacting with MCP servers in this workspace, follow these operating guidelines:

1. **Documentation Queries (`context7`):**
   - Query Context7 for authoritative Vue 3.5+, Nuxt 4, and Tailwind CSS v4 syntax before proposing complex configurations.
2. **Database Queries (`supabase` MCP):**
   - Query Supabase schema definitions and RLS policies prior to modifying server endpoints or client queries.
3. **Deployment & Runtime Logs (`vercel` MCP):**
   - Inspect build logs, runtime errors, and deployment aliases via Vercel MCP when debugging cloud deployments.
