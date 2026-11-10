---
name: component_extractor
description: "Refactors monolithic Vue templates into modular child components with typed Props and Emits."
---

# Component Extractor Skill (`SKILL.md`)

**Role:** Modular Component Architect  
**Purpose:** Systematically extracts tightly-coupled or monolithic template code into reusable, testable Vue Single File Components adhering to Single Responsibility Principle (SRP) and the 4 Core Guardrails.

---

## Extraction Workflow Procedure

Follow this 5-step procedure when refactoring templates:

### 1. Identify Isolated Template Blocks
- Scan the parent view or monolithic component (e.g. `HomeView.vue`, `App.vue`).
- Locate tightly coupled DOM sub-trees, such as:
  - Repeated list/card items (e.g., movie cards, review items).
  - Specialized input controls (e.g., search bars, filter bars, date selectors).
  - Modal dialogues, toolbars, or distinct section banners.
- Map all reactive variables, methods, and external props consumed inside that template block.

### 2. Create Child Component in `src/components/` (or `components/`)
- Choose a multi-word PascalCase filename representing the component (e.g. `MovieCard.vue`, `SearchBar.vue`).
- Create `<script setup lang="ts">`.
- Move the isolated template HTML into the `<template>` block of the new child component.

### 3. Define Strictly Typed Props & Emits
- Define input data contracts using `defineProps<{ ... }>()`:
  ```vue
  <script setup lang="ts">
  import type { Movie } from '@/types'

  const props = defineProps<{
    movie: Movie
    isFavorite?: boolean
  }>()
  </script>
  ```
- Define upward events using `defineEmits<{ ... }>()`:
  ```ts
  const emit = defineEmits<{
    (e: 'selectMovie', movie: Movie): void
    (e: 'toggleFavorite', movieId: number): void
  }>()
  ```
- Replace local state modifications in the child with `emit('eventName', payload)`.

### 4. Replace Parent Template Block
- Import the new child component in the parent `<script setup lang="ts">`:
  ```ts
  import MovieCard from '@/components/MovieCard.vue'
  ```
- Replace the monolithic HTML chunk with the self-closing or slot-enabled child tag:
  ```vue
  <MovieCard
    v-for="movie in filteredMovies"
    :key="movie.id"
    :movie="movie"
    :is-favorite="favoriteIds.has(movie.id)"
    @select-movie="handleSelectMovie"
    @toggle-favorite="handleToggleFavorite"
  />
  ```

### 5. Verify Build & Typecheck
- Execute the verification sequence:
  ```bash
  npm run build
  ```
- Confirm zero compilation errors, zero type errors, and functional parity.

