---
activation: always
description: "Always-active Antigravity workspace rules enforcing TypeScript strictness, Vue SFC naming, import ordering, and error boundaries"
---

# Core Conventions & Guardrails (`core-conventions.md`)

**Role:** Lead Context Engineer & Frontend Architect  
**Scope:** Always-active Antigravity workspace enforcement  
**Master Blueprint:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md)

---

## 1. Strict TypeScript Rules (Zero `any`)

1. **No `any` or Untyped `unknown`:**
   - The use of `any` is strictly banned. Any untyped variable, parameter, or escape hatch fails verification.
   - For unknown incoming data (e.g. user input, third-party API), use `unknown` combined with Zod schema parsing (`schema.safeParse()`) or explicit type predicates (`isType(val): val is T`).
2. **Strict Props & Emits Typing:**
   - Always declare component props using pure TypeScript generics:
     ```ts
     const props = defineProps<{
       movie: Movie
       isFavorite?: boolean
     }>()
     ```
   - Always declare component emits using strongly typed function call signatures:
     ```ts
     const emit = defineEmits<{
       (e: 'selectMovie', movie: Movie): void
       (e: 'toggleFavorite', movieId: number): void
     }>()
     ```

---

## 2. Component Naming & Template Usage

1. **PascalCase Filenames:**
   - All Vue Single File Components (SFCs) in `components/`, `pages/`, and `views/` MUST use multi-word PascalCase filenames:
     - `MovieCard.vue`
     - `SearchBar.vue`
     - `MovieListItem.vue`
   - Single-word filenames are prohibited, except for root framework entry points (`App.vue` or `default.vue`).
2. **Kebab-Case in Templates:**
   - In template markup, invocations of custom components should consistently use kebab-case:
     ```vue
     <movie-card 
       :movie="movie" 
       :is-favorite="isFavorite" 
       @select-movie="handleSelect" 
       @toggle-favorite="handleToggle" 
     />
     ```
   - Self-closing syntax (`<search-bar v-model="searchQuery" />`) is mandatory for child components with no default slot or child elements.

---

## 3. Required Import Ordering Standard

To maintain clean diffs and avoid circular dependency bugs, organize script imports in the following strict order:

```ts
// 1. Vue & Core Framework Imports
import { ref, computed, watch, onMounted } from 'vue'

// 2. Third-Party Packages & Libraries (Vue Router, Zod, Pinia)
import { useRouter, useRoute } from 'vue-router'
import { z } from 'zod'

// 3. Components (Presentational & Child SFCs)
import MovieCard from '@/components/MovieCard.vue'
import SearchBar from '@/components/SearchBar.vue'

// 4. Composables & Utilities
import { useFavorites } from '@/composables/useFavorites'
import { formatDate } from '@/utils/formatters'

// 5. Types & Interfaces (Always use explicit `import type`)
import type { Movie, UserCredentials } from '@/types'
```

---

## 4. Error Boundary & Defensive Patterns

1. **Async Operations Error Boundary:**
   - Wrap asynchronous network calls or database operations in standard `try / catch / finally` blocks.
   - Set an explicit reactive error state (`const errorMessage = ref<string | null>(null)`) to display user-friendly error UI.
2. **Nuxt Error Boundary Component:**
   - In Nuxt 3 views, wrap unstable or dynamic third-party widgets in `<NuxtErrorBoundary>`:
     ```vue
     <NuxtErrorBoundary>
       <!-- Unstable / External API dependent block -->
       <template #error="{ error, clearError }">
         <div class="p-4 bg-red-950/40 border border-red-800 rounded-lg text-red-400">
           <p>Failed to load component: {{ error.message }}</p>
           <button @click="clearError" class="mt-2 text-xs underline">Retry</button>
         </div>
       </template>
     </NuxtErrorBoundary>
     ```
3. **No Swallowed Exceptions:**
   - Empty catch blocks (`catch (e) {}`) are strictly banned. Errors must be logged or surfaced to reactive state.

