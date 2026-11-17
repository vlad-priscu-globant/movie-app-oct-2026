---
activation: always
description: "Repository-specific bug history, framework quirks, API gotchas, and proven resolutions"
---

# Gotchas & API Quirks Log (`gotchas.md`)

**Role:** Principal Knowledge Engineer  
**Scope:** Cumulative memory bank of repository-specific bugs, framework edge cases, and runtime quirks  
**Directive:** Consult this file before debugging complex issues or proposing framework refactorings  
**Pointer Reference:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md)

---

## Gotcha Records

| Gotcha Title | Component/File | Symptom | Root Cause | Solution |
| :--- | :--- | :--- | :--- | :--- |
| **Tailwind v4 Directive Deprecation** | `src/style.css` | `@tailwind base;` warnings or build errors under Vite plugin. | Tailwind CSS v4 replaces legacy `@tailwind` directives with a single `@import "tailwindcss";` entry point. | Use `@import "tailwindcss";` exclusively in `src/style.css` and use `@tailwindcss/vite` in `vite.config.ts`. |
| **`ref(new Set())` In-Place Mutation Reactivity** | `src/views/HomeView.vue` | Toggling favorite IDs with `favoriteIds.value.add()` fails to trigger template re-renders in some Vue 3 reactivity contexts. | `ref` tracks assignment to `.value`. In-place mutations on the raw `Set` instance bypass shallow reactivity triggers. | Reassign `favoriteIds.value = new Set(favoriteIds.value)` on change or wrap state inside an exported composable (`useFavorites`). |
| **Plaintext Password Logging** | `src/views/LoginView.vue` | Sensitive credential disclosure in browser devtools / console logs. | `console.log(result.data)` logs raw unencrypted password string. | Remove password logging; log only non-sensitive metadata (`{ email: result.data.email }`). |
| **TMDB API Rate Limits & CORS** | `server/api/movies` | 429 Too Many Requests or CORS blocking when calling TMDB directly from client browser. | Client-side requests expose TMDB API keys and encounter browser origin/rate restriction policies. | Route all TMDB calls through backend Nitro/Express endpoints in `server/api/` with cached responses (`defineCachedEventHandler`). |
| **Supabase SSR Cookie Synchronization** | `middleware/auth.ts` | Auth state mismatch between SSR HTML render and client hydration (hydration flash or unauthorized redirect). | Server-side Nitro engine and browser client must synchronize auth sessions via HTTP-only cookies rather than localStorage. | Use official `@nuxtjs/supabase` module with `useSupabaseUser()` and server cookie handlers; avoid manual localStorage token inspection. |
| **Nitro Edge Serverless `fs` Module Incompatibility** | `server/` routes | `Module not found: Can't resolve 'fs'` when deployed to Vercel Edge Runtime. | Vercel Edge Functions run in a V8 worker environment without Node.js standard library modules (`fs`, `child_process`, `path`). | Use Nitro `useStorage()` virtual file driver or Web-standard APIs (`fetch`, `crypto`, `Streams`) instead of Node.js `fs`. |
| **Nitro `$fetch.raw` `TS2321` Stack Depth on External APIs** | `server/utils/tmdb.ts` | `error TS2321: Excessive stack depth comparing types` when typing `ReturnType<typeof $fetch.raw>` or calling `$fetch.raw(path)` with a dynamic `string` path. | Nitro augments `$fetch` with a recursive route-scoring type union over all internal app routes (`InternalApi`). | Use Web-standard `fetch` (with `URL` + `URLSearchParams`) for external upstream APIs like TMDB, then validate `response.json()` with Zod. |
| **`navigateTo()` Return Type in Typed Event Handlers** | `app/pages/index.vue`, `favorites.vue` | `TS2322: Type 'false \| void \| Promise<...>' is not assignable to type 'Promise<void>'` when returning `navigateTo(...)` directly. | `navigateTo` can return synchronous `void \| false` in certain guard/abort paths. | Make the handler `async` and `await navigateTo(...)` instead of `return navigateTo(...)`. |
| **Nitro `useStorage('data')` Persistence on Serverless** | `server/utils/favorites-repository.ts` | Favorites added in production on serverless hosts do not persist across cold starts/instances. | Nitro's default `data` storage is filesystem-backed locally (`.data/kv`) and ephemeral in serverless environments. | Documented as temporary for Session 07; swap `useFavoritesRepository()` to Supabase PostgreSQL in Session 08. |
| **Un-awaited `useFetch` inside Composables on SSR** | `app/composables/useFavorites.ts`, `app/pages/favorites.vue` | SSR renders loading spinner instead of favorites list if page setup doesn't await the shared `useFetch`. | Returning only `{ data, status, refresh }` from a composable without awaiting `asyncData` lets SSR flush before the API call resolves. | Expose `whenReady: () => asyncData.then(() => undefined)` from `useFavorites` and `await whenReady()` on pages that require favorites at SSR render time. |
