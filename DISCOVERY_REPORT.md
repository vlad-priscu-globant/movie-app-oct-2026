# System Discovery & Architectural Baseline Report

**Document ID:** `DISCOVERY_REPORT.md`  
**Role:** Senior Frontend Architect  
**Workspace:** `c:\projects\movie-app-oct-2026`  
**Updated:** 2026-11-17 (Session 07 Nuxt 4 Migration Completed)  
**Status:** Phase 2 — Session 07 Completed (Nuxt 4 SSR + Nitro API + Masked TMDB Proxy)

---

## 1. Executive Summary

The workspace has migrated from the Phase 1 Vite + Vue 3 SPA and standalone Express server (`server.js`) to a unified **Nuxt 4 (`4.6.4`) SSR + Nitro** fullstack application styled with **Tailwind CSS v4** and validated end-to-end with **Zod** and **TypeScript**.

---

## 2. Dependency Audit & Package Version Inventory

Dependency data verified against `package.json` and `package-lock.json`:

### 2.1 Core Frameworks & Runtime

| Package | Declared Version (`package.json`) | Exact Locked Version (`package-lock.json`) | Status / Notes |
| :--- | :--- | :--- | :--- |
| **`nuxt`** | `^4.6.4` | **`4.6.4`** | Installed (Nuxt 4 SSR + Nitro engine) |
| **`vue`** | `^3.5.45` | **`3.5.45`** | Installed (Vue 3 Composition API) |
| **`@nuxt/image`** | `^2.2.1` | **`2.2.1`** | Installed (Poster/backdrop optimization proxy) |
| **`jose`** | `^6.2.17` | **`6.2.17`** | Installed (Edge-compatible JWT signing & verification) |
| **`zod`** | `^4.6.7` | **`4.6.7`** | Installed (Runtime validation & TS type inference) |

### 2.2 Styling

| Package | Declared Version (`package.json`) | Exact Locked Version (`package-lock.json`) | Status / Notes |
| :--- | :--- | :--- | :--- |
| **`tailwindcss`** | `^4.3.5` | **`4.3.5`** | Installed (Tailwind CSS v4) |
| **`@tailwindcss/vite`** | `^4.3.5` | **`4.3.5`** | Installed (Vite plugin registered in `nuxt.config.ts`) |

### 2.3 Tooling, Linting & Testing (`devDependencies`)

| Package | Declared Version (`package.json`) | Exact Locked Version (`package-lock.json`) | Status / Notes |
| :--- | :--- | :--- | :--- |
| **`typescript`** | `~6.0.2` | **`6.0.3`** | Installed |
| **`vue-tsc`** | `^3.3.14` | — | Installed (used by `nuxt typecheck`) |
| **`@nuxt/eslint`** | `^1.17.0` | **`1.17.0`** | Installed |
| **`eslint`** | `^10.15.0` | — | Installed |
| **`@nuxt/test-utils`** | `^4.4.0` | **`4.4.0`** | Installed |
| **`vitest`** | `^5.1.0` | **`5.1.0`** | Installed |
| **`@vue/test-utils`** | `^2.6.0` | — | Installed |
| **`happy-dom`** | `^21.0.4` | — | Installed |

### 2.4 Removed Legacy Packages

Removed during Session 07 cleanup: `express`, `cors`, `body-parser`, `fs-extra`, `jsonwebtoken`, `dotenv`, `concurrently`, `vue-router`, `@vitejs/plugin-vue`, `vite`, `@vue/tsconfig`, `postcss`, `autoprefixer`, and their `@types/*` packages.

---

## 3. Directory Hierarchy & Architectural Mapping

| Concern | Workspace Path | Role |
| :--- | :--- | :--- |
| **Pages** | `app/pages/` | `index.vue`, `login.vue`, `favorites.vue`, `movie/[id].vue` |
| **Layout & Root** | `app/app.vue`, `app/layouts/default.vue`, `app/error.vue` | Shell layout, header/footer, global 404/error view |
| **Components** | `app/components/` | `AppHeader.vue`, `MovieCard.vue`, `MovieListItem.vue`, `SearchBar.vue`, `LoadingSpinner.vue`, `ErrorPanel.vue` |
| **Composables** | `app/composables/` | `useAuth.ts`, `useFavorites.ts` |
| **Middleware & Plugin** | `app/middleware/auth.ts`, `app/plugins/auth.server.ts` | SSR & client auth guard and cookie session hydration |
| **Server API** | `server/api/` | `movies/popular.get.ts`, `movies/[id].get.ts`, `auth/login.post.ts`, `auth/logout.post.ts`, `auth/me.get.ts`, `favorites/*` |
| **Server Utils & Data** | `server/utils/`, `server/data/` | `tmdb.ts`, `movie-mapper.ts`, `auth.ts`, `favorites-repository.ts`, `favorites.seed.json` |
| **Shared Contracts** | `shared/types/` | `movie.ts`, `auth.ts` (Zod schemas + inferred TS types) |
| **Tests** | `test/nuxt/` | `MovieCard.spec.ts`, `SearchBar.spec.ts` |
| **Public Assets** | `public/` | `favicon.svg`, `icons.svg`, `poster-placeholder.svg` |
