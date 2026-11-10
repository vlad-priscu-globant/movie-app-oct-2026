# System Discovery & Architectural Baseline Report

**Document ID:** `DISCOVERY_REPORT.md`  
**Role:** Senior Frontend Architect  
**Workspace:** `c:\projects\movie-app-oct-2026`  
**Execution Timestamp:** 2026-11-10T14:12:00+02:00  
**Status:** Baseline Completed (Transition from Phase 1 SPA to Phase 2 Nuxt 3 / Fullstack Roadmap)

---

## 1. Executive Summary

This Discovery Phase conducts a comprehensive structural, dependency, and architectural audit of the Movie Application workspace. The current codebase is established as a **Vite + Vue 3 Composition API SPA (Single Page Application)** styled with **Tailwind CSS v4** and typed with **TypeScript + Zod**.

In accordance with [`AGENTS.md`](./AGENTS.md), the project is completing **Phase 1** and preparing for **Phase 2** (migration to Nuxt 3 SSR, Supabase Auth/DB, and an Express/Nitro backend API layer).

---

## 2. Dependency Audit & Package Version Inventory

Dependency data was verified against `package.json` and locked configurations in `package-lock.json` (Lockfile v3).

### 2.1 Core Frameworks & Runtime

| Package | Declared Version (`package.json`) | Exact Locked Version (`package-lock.json`) | Status / Notes |
| :--- | :--- | :--- | :--- |
| **`vue`** | `^3.5.39` | **`3.5.39`** | Installed (Vue 3 Composition API) |
| **`vue-router`** | `^4.6.3` | **`4.6.4`** | Installed (Client-side HTML5 history routing) |
| **`nuxt`** | *N/A* | **Not Installed** | Pending Phase 2 SSR migration |

### 2.2 Language, Compilers & Tooling

| Package | Declared Version (`package.json`) | Exact Locked Version (`package-lock.json`) | Status / Notes |
| :--- | :--- | :--- | :--- |
| **`typescript`** | `~6.0.2` | **`6.0.3`** | Installed (TypeScript engine) |
| **`vue-tsc`** | `^3.3.5` | **`3.3.7`** | Installed (Vue SFC type-checker) |
| **`vite`** | `8.3.3` | **`8.3.3`** | Installed (Next-gen build tool & dev server) |
| **`@vitejs/plugin-vue`** | `^6.0.7` | **`6.0.8`** | Installed (Vite Vue SFC compiler plugin) |
| **`@vue/tsconfig`** | `^0.9.1` | **`0.9.1`** | Installed (Base TS configuration) |
| **`@types/node`** | `^24.13.2` | **`24.13.3`** | Installed (Node runtime typings) |

### 2.3 Styling & Post-Processing

| Package | Declared Version (`package.json`) | Exact Locked Version (`package-lock.json`) | Status / Notes |
| :--- | :--- | :--- | :--- |
| **`tailwindcss`** | `^4.3.2` | **`4.3.2`** | Installed (Tailwind CSS v4 engine) |
| **`@tailwindcss/vite`** | `^4.3.2` | **`4.3.2`** | Installed (Official Tailwind v4 Vite plugin) |
| **`postcss`** | `8.5.23` | **`8.5.23`** | Installed (CSS AST processor) |
| **`autoprefixer`** | `^10.5.3` | **`10.5.3`** | Installed (Vendor prefixing) |

### 2.4 Schema Validation & Cloud Infrastructure

| Package | Declared Version (`package.json`) | Exact Locked Version (`package-lock.json`) | Status / Notes |
| :--- | :--- | :--- | :--- |
| **`zod`** | `^4.4.3` | **`4.4.3`** | Installed (Runtime schema validation & TS inference) |
| **`supabase`** (`@supabase/supabase-js`) | *N/A* | **Not Installed** | Target Phase 2 (Session 05–08) |
| **`vercel insights`** (`@vercel/analytics`, `@vercel/speed-insights`) | *N/A* | **Not Installed** | Target Phase 3 (Session 09–12) |

---

## 3. Directory Hierarchy & Architectural Mapping

The codebase reflects a Vite Single Page Application layout. Below is the comparative audit mapping target Nuxt/Fullstack paradigms against the actual workspace directory structure:

| Standard Architectural Target | Actual Workspace Path | Presence | Architectural Evaluation |
| :--- | :--- | :--- | :--- |
| **`pages/`** | `src/views/` | ⚠️ Mapped as `views/` | Vue Router-driven views (`HomeView.vue`, `LoginView.vue`). To be migrated to `pages/` under Nuxt 3 file-system routing. |
| **`components/`** | `src/components/` | ✅ Present | Houses atomic and composite components (`MovieCard.vue`, `SearchBar.vue`, `MovieListItem.vue`, `NotFound.vue`, `HelloWorld.vue`). |
| **`layouts/`** | `src/App.vue` | ⚠️ Monolithic in `App.vue` | No standalone `layouts/` directory. App shell (Header, Nav, Footer, and `<RouterView />`) is directly embedded in `src/App.vue`. |
| **`server/`** | *None* | ❌ Missing | No Express backend or Nuxt Nitro server API present yet. Server directory will be established in Phase 2. |
| **`types/`** | `src/types/` | ✅ Present | Centralized domain interface declarations (`src/types/index.ts` defining `Movie` and `UserCredentials`). |
| **`public/`** | `public/` | ✅ Present | Static assets served unbundled (`favicon.svg`, `icons.svg`). |
| **`assets/`** | `src/assets/` | ✅ Present | Bundled static media (`hero.png`, `vite.svg`, `vue.svg`). |
| **`router/`** | `src/router/` | ✅ Present | Client-side routing configuration (`src/router/index.ts`). |

---

## 4. Routing Layout & Active Page Views

The routing system is managed via `vue-router` (`4.6.4`) utilizing HTML5 history mode (`createWebHistory()`) in `src/router/index.ts`.

```
====================================================================================
ROUTE CONFIGURATION (src/router/index.ts)
====================================================================================
Path                Route Name    Component View             Component File
------------------------------------------------------------------------------------
/                   home          HomeView                   src/views/HomeView.vue
/login              login         LoginView                  src/views/LoginView.vue
/:pathMatch(.*)     404           NotFound                   src/components/NotFound.vue
====================================================================================
```

### 4.1 View Breakdown

1. **`HomeView.vue` (`/`)**:
   - **Role:** Main catalogue & discovery feed.
   - **State:**
     - `movies`: Reactive collection of `Movie` records (`id`, `title`, `year`, `image`).
     - `searchQuery`: Bound two-way to `SearchBar.vue`.
     - `favoriteIds`: Reactive `Set<number>` for state tracking of favorites.
     - `filteredMovies`: Computed property filtering movies case-insensitively by title.
   - **Child Components:**
     - `SearchBar.vue`: Emits `update:modelValue` and `clear`.
     - `MovieCard.vue`: Renders movie cards in a responsive CSS grid (`grid-cols-1 md:grid-cols-3 lg:grid-cols-5`), emitting `@select-movie` and `@toggle-favorite`.

2. **`LoginView.vue` (`/login`)**:
   - **Role:** User authentication portal.
   - **State & Validation:**
     - Zod Schema (`loginSchema`): Validates email format and password length ($\ge 6$ characters).
     - Type Inference: `LoginForm = z.infer<typeof loginSchema>`.
     - Reactivity: Uses `ref<LoginForm>` for form data, `reactive<Record<keyof LoginForm, string>>` for granular error messaging.
     - Watchers: Real-time clearing of validation error messages on user input.

3. **`NotFound.vue` (`/:pathMatch(.*)`)**:
   - **Role:** Wildcard 404 fallback page.

### 4.2 Application Shell & Layout Container (`src/App.vue`)

- **Top Navigation Bar:** Sticky header with linear gradient backdrop, branding (`MovieApp`), quick search bar (responsive hide on mobile), and an authentication link CTA (`Autentificare`).
- **Main Viewport (`<main>`):** Houses `<RouterView />` with padding and flex-grow layout.
- **Global Footer:** Semantic footer with copyright metadata.

---

## 5. Visual ASCII Architectural Layout

### 5.1 Workspace Physical Directory Tree

```text
movie-app-oct-2026/
├── .git/                                 # Git version control metadata
├── .idea/                                # IDE project settings
├── dist/                                 # Production build output
├── node_modules/                         # Installed package dependencies
├── public/                               # Unbundled public static assets
│   ├── favicon.svg                       # Browser tab favicon
│   └── icons.svg                         # SVG sprite sheet
├── src/                                  # Application source code
│   ├── assets/                           # Bundled visual assets
│   │   ├── hero.png                      # Hero promotional image
│   │   ├── vite.svg                      # Vite brand logo
│   │   └── vue.svg                       # Vue brand logo
│   ├── components/                       # Reusable Vue SFC components
│   │   ├── HelloWorld.vue                # Default template counter & links
│   │   ├── MovieCard.vue                 # Movie card presentation & favorite toggle
│   │   ├── MovieListItem.vue             # Alternative list item presentation
│   │   ├── NotFound.vue                  # 404 Fallback view
│   │   └── SearchBar.vue                 # Search input with clear handler
│   ├── router/                           # Vue Router 4 configuration
│   │   └── index.ts                      # Route definitions & createWebHistory
│   ├── types/                            # TypeScript type definitions
│   │   └── index.ts                      # Movie & UserCredentials interfaces
│   ├── views/                            # Routable view components
│   │   ├── HomeView.vue                  # Home catalogue & movie filtering
│   │   └── LoginView.vue                 # Authentication form with Zod schema
│   ├── App.vue                           # Root component & global shell layout
│   ├── main.ts                           # Application entry point (createApp, router)
│   └── style.css                         # Global CSS with @import "tailwindcss"
├── .gitignore                            # Git ignore patterns
├── agentic-setup-prompts.md              # Multi-Tool Context Engineering prompts
├── AGENTS.md                             # Master Agent Rule file & guardrails
├── index.html                            # HTML5 single-page host shell
├── package.json                          # Package declarations & script commands
├── package-lock.json                     # Locked dependency resolution tree (v3)
├── README.md                             # Project setup documentation
├── tsconfig.app.json                     # TS compiler config for application
├── tsconfig.json                         # Solution-style root TS configuration
├── tsconfig.node.json                    # TS compiler config for Vite tooling
└── vite.config.ts                        # Vite configuration (Vue & Tailwind plugins)
```

### 5.2 Architectural Component & Data Flow Topology

```text
+-----------------------------------------------------------------------------------+
|                                   index.html                                      |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|                                   src/main.ts                                     |
|                      createApp(App).use(router).mount('#app')                     |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|                                   src/App.vue                                     |
|  +-----------------------------------------------------------------------------+  |
|  | <header> [MovieApp Brand -> /] [Search Input] [Login Button -> /login]      |  |
|  +-----------------------------------------------------------------------------+  |
|  | <main class="flex-grow">                                                    |  |
|  |                                                                             |  |
|  |   <RouterView />  ◄─── Managed by vue-router (src/router/index.ts)          |  |
|  |         │                                                                   |  |
|  |         ├───► Path: "/"               ──► [ HomeView.vue ]                  |  |
|  |         │                                        │                          |  |
|  |         │      ┌─────────────────────────────────┴───────────────────┐      |  |
|  |         │      ▼                                                     ▼      |  |
|  |         │  Props: modelValue                                   Props: movie |  |
|  |         │  Emits: update:modelValue, clear                     Props: isFav |  |
|  |         │  [ SearchBar.vue ]                         [ MovieCard.vue (xN) ] |  |
|  |         │                                              Emits: selectMovie   |  |
|  |         │                                              Emits: toggleFav     |  |
|  |         │                                                                   |  |
|  |         ├───► Path: "/login"          ──► [ LoginView.vue ]                 |  |
|  |         │                                        │                          |  |
|  |         │                                        ▼                          |  |
|  |         │                               Runtime Validation                  |  |
|  |         │                                [ Zod loginSchema ]                |  |
|  |         │                                                                   |  |
|  |         └───► Path: "/:pathMatch(.*)" ──► [ NotFound.vue ]                  |  |
|  |                                                                             |  |
|  +-----------------------------------------------------------------------------+  |
|  | <footer> &copy; 2026 MovieApp. All rights reserved.                         |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 6. Architectural Observations & Next Steps

1. **Compliance with `AGENTS.md` Guardrails:**
   - **Rule 1 (Script Setup):** Fully satisfied across all components (`<script setup lang="ts">`).
   - **Rule 2 (Type Safety):** High compliance. Domain models defined in `src/types/index.ts`; `LoginView.vue` utilizes Zod schema inference (`z.infer<typeof loginSchema>`).
   - **Rule 3 (Reactivity Abstraction):** DOM manipulation is cleanly abstracted via Vue reactive primitives (`ref`, `reactive`, `computed`, `watch`).
   - **Rule 4 (Component Isolation):** Unidirectional data flow is strictly upheld: Props Down (`:movie`, `:is-favorite`), Emits Up (`@select-movie`, `@toggle-favorite`, `@update:modelValue`).

2. **Roadmap Transition (Phase 1 -> Phase 2):**
   - **Nuxt 3 Migration:** Transition client-side `src/views/` and `src/router/` into Nuxt's file-based `pages/` routing engine.
   - **Layout Extraction:** Extract `src/App.vue` layout primitives into `layouts/default.vue`.
   - **Backend & Database:** Install and configure `@supabase/supabase-js` and initialize the `server/` directory (Express API / Nuxt Nitro routes) to replace mock arrays in `HomeView.vue`.

