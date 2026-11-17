---
activation: always
description: "Repository Architectural Decisions Log tracking key technology, framework, and design choices"
---

# Architectural Decisions Log (`decisions.md`)

**Role:** Principal Knowledge Engineer  
**Scope:** Chronological log of major architectural decisions, rationale, and discarded alternatives  
**Directive:** Consult this file before proposing architectural alterations or structural migrations  
**Pointer Reference:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md)

---

## Decision Records

| Date | Decision | Rationale | Alternatives Considered |
| :--- | :--- | :--- | :--- |
| **2026-10-15** | **Vite + Vue 3 Composition API as Phase 1 Foundation** | Immediate feedback loop, lightning-fast HMR, modern standard `<script setup lang="ts">`, zero boilerplate compared to legacy Options API. | Vue 2 (EOL), Vanilla TypeScript (lacks reactive UI abstractions), Webpack (slower dev build). |
| **2026-10-22** | **Tailwind CSS v4 with Vite Engine Plugin** | Zero-configuration CSS compilation, native cascade layers (`@import "tailwindcss"`), automatic tree-shaking, unified design token utilities. | Tailwind v3 (requires PostCSS config files), UnoCSS, Pure Scoped CSS (higher maintenance, class naming fatigue). |
| **2026-10-28** | **Zod for Runtime Validation & Static Type Inference** | Eliminates dual-maintenance of types and runtime checks. Guarantees compile-time safety and runtime barrier against invalid inputs. | Yup, Joi (lacks clean TS inference), manual TypeScript type guards (error-prone, verbose). |
| **2026-11-03** | **Unidirectional State Flow (Props Down, Emits Up)** | Guarantees predictable component state, prevents child-to-parent mutation leaks, simplifies testing and isolation. | Vue 2 `.sync` modifier, two-way mutable props, anti-pattern direct prop mutation. |
| **2026-11-10** | **Nuxt 3 SSR Adoption for Phase 2 Transition** | Required for SEO discoverability, open graph tags on movie details, instant server-side hydration, and unified Nitro backend API routes. | Retaining pure client-side SPA (poor SEO for movie titles), SSR via custom Express renderer (high maintenance). |
| **2026-11-10** | **Supabase for Authentication & PostgreSQL BaaS** | Built-in Row-Level Security (RLS), first-class Nuxt 3 module (`@nuxtjs/supabase`), OAuth & session cookies handled out of the box. | Firebase Auth (proprietary NoSQL), rolling custom JWT/OAuth server on MongoDB (unnecessary complexity). |
| **2026-11-10** | **Pinia for Global Shared State Isolation** | Official Vue 3 state management standard with full TypeScript support, devtools integration, and SSR-safe state hydration. | Vuex (deprecated), global reactive event bus (untraceable mutations), prop drilling. |
| **2026-11-10** | **Vercel Nitro Cloud Deployment Strategy** | Native Nuxt 3 Nitro preset, zero-config Edge deployments, automatic PR preview environments, integrated Speed Insights. | Self-hosted VPS with Docker/PM2 (operational overhead), Netlify (weaker Nuxt Nitro parity). |
| **2026-11-17** | **Nuxt 4.6.x Adoption over Nuxt 3** | `nuxt@latest` on npm is `4.6.4` (`3x` is maintenance-only). Nuxt 4 `app/`, `server/`, and `shared/` directories separate client, server, and shared Zod contracts cleanly. | Pinning to Nuxt 3 (`3.21.11`) which is in maintenance mode. |
| **2026-11-17** | **Mask TMDB Behind Nitro Endpoints + `@nuxt/image`** | Private `runtimeConfig` (`NUXT_TMDB_API_TOKEN`, `NUXT_TMDB_BASE_URL`), single `server/utils/tmdb.ts` boundary, server-side DTO mapping (`movie-mapper.ts`), cached endpoints (`defineCachedEventHandler`), and `<NuxtImg>` so the browser never calls TMDB directly or sees TMDB credentials. | Client-side TMDB calls or exposing `NUXT_PUBLIC_BASE_URL`. |
| **2026-11-17** | **HttpOnly Cookie JWT via `jose` (Temporary until Session 08)** | SSR cannot read `localStorage`. Moving the session token into an `httpOnly`, `sameSite: 'lax'` cookie with `jose` enables SSR auth hydration (`auth.server.ts`) and edge compatibility, while keeping demo credentials isolated in `server/utils/auth.ts` with `TODO(session-08)`. | Keeping `localStorage` JWT + `jsonwebtoken` (Node-only, causes SSR hydration flash). |
| **2026-11-17** | **`FavoritesRepository` over Nitro `useStorage('data')`** | Replaces Node `fs-extra` + `db.json` with an interface (`useFavoritesRepository`) backed by Nitro `useStorage` + `favorites.seed.json`. Isolates handlers from storage details so Session 08 can swap in Supabase with zero handler changes. | Direct `fs-extra` reads/writes (incompatible with Vercel serverless/Edge) or direct Supabase adoption in Session 07. |
| **2026-11-17** | **Defer Pinia in Favour of Nuxt `useState` + `useFetch` Keys** | Current global state is limited to `auth:user` and `favorites` cache, both cleanly handled SSR-safely by `useState` and keyed `useFetch` (YAGNI/KISS). Pinia remains easy to add later if complex client stores emerge. | Installing `@pinia/nuxt` immediately for two simple resources. |
