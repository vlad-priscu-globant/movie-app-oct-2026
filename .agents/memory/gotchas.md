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
