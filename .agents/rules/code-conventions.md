---
activation: always
description: "Code quality standards, Vue 3 Composition API conventions, and architectural rules for movie-app"
---

# Code Style & Component Architecture Conventions (`code-conventions.md`)

**Role:** Lead Code Quality Engineer  
**Audit Scope:** Vue 3 / Nuxt 3 components across `components/`, `pages/`, and `views/`  
**Reference Pointers:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md)

---

## 1. Empirical Codebase Audit

An audit of the existing components and views in `src/` yields the following baseline compliance:

| Component / View | Path | Script Syntax | Reactivity Primitives | Props & Emits Pattern | Naming Standard |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`MovieCard.vue`** | `src/components/` | `<script setup lang="ts">` | Pure presentational (no internal state) | `defineProps<{ movie: Movie, isFavorite?: boolean }>()`<br>`defineEmits<{ (e: 'selectMovie', movie: Movie): void, (e: 'toggleFavorite', movieId: number): void }>()` | PascalCase file |
| **`SearchBar.vue`** | `src/components/` | `<script setup lang="ts">` | Pure input handler | `defineProps<{ modelValue: string, placeholder?: string }>()`<br>`defineEmits<{ (e: 'update:modelValue', value: string): void, (e: 'clear'): void }>()` | PascalCase file |
| **`MovieListItem.vue`**| `src/components/` | `<script setup lang="ts">` | Pure presentational with slots | `defineProps<{ title: string, image?: string }>()` | PascalCase file |
| **`NotFound.vue`** | `src/components/` | `<script setup lang="ts">` | Static template | None | PascalCase file |
| **`HomeView.vue`** | `src/views/` | `<script setup lang="ts">` | `ref`, `computed` | Orchestrates `SearchBar` and `MovieCard` | PascalCase file |
| **`LoginView.vue`** | `src/views/` | `<script setup lang="ts">` | `ref`, `reactive`, `watch` | Zod schema validation (`loginSchema`) | PascalCase file |

---

## 2. Script Setup Standard

Every Vue Single File Component (SFC) in this repository MUST exclusively use `<script setup lang="ts">`.

### Strict Guardrails:
* **No Options API:** Never use `export default defineComponent({ data(), methods: {} })` or Vue 2 Options syntax.
* **No Untyped Setup:** Never omit `lang="ts"`.
* **Zero `any` / Untyped `unknown`:** All props, emits, event handlers, and return values must have explicit, strictly typed signatures.

```vue
<!-- Standard Compliant Structure -->
<script setup lang="ts">
import type { Movie } from '@/types'

const props = defineProps<{
  movie: Movie
  isFavorite?: boolean
}>()

const emit = defineEmits<{
  (e: 'selectMovie', movie: Movie): void
  (e: 'toggleFavorite', movieId: number): void
}>()
</script>

<template>
  <article class="movie-card">
    <!-- Component DOM -->
  </article>
</template>
```

---

## 3. Reactivity Rules (`ref`, `reactive`, `computed`, `watch`)

To prevent reactivity loss and cognitive fragmentation across the codebase, adhere strictly to the following patterns:

### 3.1 `ref` vs `reactive`
1. **Prefer `ref` by Default for Primitive and Object State:**
   - Use `ref` for primitives (`string`, `number`, `boolean`, `null`).
   - Use `ref` for arrays and data collections (`ref<Movie[]>([])`, `ref<Set<number>>(new Set())`).
   - Use `ref` for form data models where reassignment or resetting may occur:
     ```ts
     const form = ref<LoginForm>({
       email: '',
       password: ''
     })
     ```
2. **Use `reactive` Only for Deeply Coupled Dictionaries or Error States:**
   - Permissible for error mappings or grouped UI status flags:
     ```ts
     const errors = reactive<Record<keyof LoginForm, string>>({
       email: '',
       password: ''
     })
     ```
   - **Destructuring Ban:** Never destructure a `reactive` object directly (`const { email } = errors`), as this permanently destroys reactivity. Always use `toRefs()` or `toRef()` if destructuring is necessary.

### 3.2 `computed` Properties (Pure Derived State)
- Computed properties must remain **pure and side-effect free**.
- Never mutate outside reactive state or execute asynchronous network calls within a `computed` getter.
- **Example from `HomeView.vue`:**
  ```ts
  const filteredMovies = computed(() => {
    return movies.value.filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  ```

### 3.3 `watch` and `watchEffect` (Controlled Side Effects)
- When observing a property within a `ref` object, always pass a getter function `() => refObject.value.property` to maintain clean tracking:
  ```ts
  // Example from LoginView.vue
  watch(() => form.value.email, () => {
    if (errors.email) errors.email = ''
  })
  ```
- Always clean up side effects (timers, subscriptions, DOM listeners) using `onWatcherCleanup` or component lifecycle hooks (`onUnmounted`).

---

## 4. Component Naming & Syntax Standard

### 4.1 Filenames (PascalCase)
- All Vue Single File Components in `components/`, `pages/`, and `views/` MUST use multi-word **PascalCase**:
  - `MovieCard.vue`
  - `SearchBar.vue`
  - `MovieListItem.vue`
  - `HomeView.vue`
  - `LoginView.vue`
- Single-word names are strictly banned (with the exception of root layout files such as `App.vue` or `default.vue`).

### 4.2 Template Invocations (Kebab-case in templates)
- In component templates, invocations should follow **kebab-case** or **PascalCase** consistently:
  - `<SearchBar v-model="searchQuery" />` or `<search-bar v-model="searchQuery" />`
  - `<MovieCard :movie="movie" />` or `<movie-card :movie="movie" />`
- Self-closing syntax (`<SearchBar />`) is mandatory for components that do not take children or slots.

---

## 5. SOLID & Single Responsibility Principle (SRP)

Maintain clear architectural boundaries between **Smart View/Page Components** and **Presentational Child Components**:

```
┌─────────────────────────────────────────────────────────────┐
│                 View / Page (Smart Container)               │
│  - Fetches and stores data (API calls, Pinia store)         │
│  - Manages route parameters & page-level state              │
│  - Coordinates event handlers from child components         │
└──────────────────────────────┬──────────────────────────────┘
                               │ Props Down (Read-only)
                               ▼ Emits Up (Events)
┌─────────────────────────────────────────────────────────────┐
│                 Child Component (Presentational)            │
│  - Receives typed props (e.g. `movie: Movie`)               │
│  - Emits user actions (e.g. `@select-movie`, `@toggle-fav`) │
│  - Pure rendering; no direct store or API mutations         │
└─────────────────────────────────────────────────────────────┘
```

1. **View Responsibility (`src/views/`, `pages/`):**
   - Orchestrates page state (`movies`, `searchQuery`, `favoriteIds`).
   - Delegates UI blocks to reusable components.
2. **Component Responsibility (`src/components/`):**
   - **`SearchBar.vue`:** Responsible purely for input capture, clear triggers, and emitting value updates (`v-model` binding).
   - **`MovieCard.vue`:** Responsible purely for visual presentation of a movie poster, title, year, and emitting user interaction events (`selectMovie`, `toggleFavorite`).

---

## 6. DRY & Composables Architecture

1. **Elimination of Duplicate Logic:**
   - Repeated stateful logic (e.g., favorite toggling, pagination, debounced search, API fetch wrappers) must be extracted into composable functions under `src/composables/` (e.g., `useFavorites.ts`, `useMovieSearch.ts`).
2. **Composable Conventions:**
   - File and function names must follow the `use*` prefix pattern (e.g., `useFavorites`).
   - Must return typed refs, computed properties, and action handlers.
   - Example extraction candidate from `HomeView.vue`:
     ```ts
     // src/composables/useFavorites.ts
     import { ref } from 'vue'

     export function useFavorites() {
       const favoriteIds = ref<Set<number>>(new Set())

       const toggleFavorite = (id: number) => {
         if (favoriteIds.value.has(id)) {
           favoriteIds.value.delete(id)
         } else {
           favoriteIds.value.add(id)
         }
       }

       const isFavorite = (id: number) => favoriteIds.value.has(id)

       return { favoriteIds, toggleFavorite, isFavorite }
     }
     ```

---

## 7. Type Safety & Validation Protocols

1. **Runtime & Compile-Time Synergy with Zod:**
   - All forms, network payloads, and untrusted inputs must declare a Zod schema.
   - Infer TypeScript interfaces directly from Zod schemas:
     ```ts
     export const loginSchema = z.object({
       email: z.string().min(1, 'Email-ul este obligatoriu').email('Adresa de email este invalidă'),
       password: z.string().min(6, 'Parola trebuie să conțină minim 6 caractere')
     })

     export type LoginForm = z.infer<typeof loginSchema>
     ```
2. **Prop & Emit Typing:**
   - Always declare props using TypeScript generics `defineProps<{ ... }>()` rather than runtime array or object syntax.
   - Always declare emits using TypeScript call signatures `defineEmits<{ (e: 'event', payload: Type): void }>()`.
