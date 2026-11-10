# Claude Code Assistant Guidelines (`CLAUDE.md`)

**Master System Blueprint:** Read [`ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md) and [`AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md) before executing code modifications.

---

## 1. Primary Terminal Commands

```bash
# Start local development server
npm run dev

# Run TypeScript compilation check
npx vue-tsc -b          # (or npx nuxi typecheck in Nuxt 3)

# Run ESLint linter
npx eslint .

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 2. Core Architectural Conventions

- **Component Standard:** Every Vue Single File Component must exclusively use `<script setup lang="ts">`. Options API is banned.
- **Type Safety:** Zero `any` or untyped `unknown`. Use strict TypeScript interfaces (`src/types/index.ts`) and Zod schemas for runtime validation.
- **Reactivity:** No direct DOM manipulation (`querySelector`, `innerHTML`). Use `ref`, `reactive`, and `computed`.
- **State Flow:** Props Down (read-only), Emits Up (`defineEmits`). Never mutate parent props in child components.
- **Nuxt 3 & Supabase Conventions:**
  - Auto-import Vue reactivity primitives and composables, but explicitly import TypeScript types (`import type { Movie } from '@/types'`).
  - Use `useSupabaseClient()` and `useSupabaseUser()` for authentication and database interactions.
  - Server routes in `server/api/` must use H3 `defineEventHandler()`.
- **Refactoring & Diffs:** Make surgical, minimal edits. Do not reformat unrelated lines or touch whitespace unnecessarily.

