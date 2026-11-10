---
activation: always
description: "Component refactoring rules and workflow triggered when refactoring monolithic views or templates into modular components"
---

# Component Refactoring Workflow Rule (`component-refactoring.md`)

**Role:** Workflow Engineer  
**Trigger:** Whenever instructed to *"Refactor view X into components"* or when breaking down monolithic views  
**Reference Pointers:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md), [`fact-checking.md`](file:///c:/projects/movie-app-oct-2026/.agents/rules/fact-checking.md)

---

## Mandatory Refactoring Execution Pipeline

Whenever triggered to refactor any view or page into modular components, all AI assistants MUST follow this 4-step pipeline:

### 1. Step 1: Complete Source Inspection (No Code Guessing)
- **Prime Directive:** In accordance with [`fact-checking.md`](file:///c:/projects/movie-app-oct-2026/.agents/rules/fact-checking.md), **never guess** the internal variables, methods, or styles of the target view.
- Perform a full file read on the source view (e.g. `src/views/HomeView.vue`, `src/views/LoginView.vue`).
- Map all reactive states, computed properties, handlers, and external prop requirements before authoring new files.

### 2. Step 2: Extract Sub-Views & Repeated UI Blocks (`src/components/`)
- Isolate distinct DOM sections, repeated cards, input controls, or sub-views.
- Create child components in `src/components/` (or `components/`) using multi-word **PascalCase** filenames (e.g. `MovieCard.vue`, `SearchBar.vue`, `LoginForm.vue`).
- Ensure child components use `<script setup lang="ts">` exclusively with zero `any` types.

### 3. Step 3: Wire Two-Way Bindings & Props/Emits
- Follow the **Props Down, Emits Up** architecture:
  - Input synchronization: Use Vue 3 `v-model` binding with typed `modelValue` prop and `update:modelValue` emit:
    ```ts
    defineProps<{ modelValue: string; placeholder?: string }>()
    defineEmits<{ (e: 'update:modelValue', value: string): void }>()
    ```
  - Custom events: Use explicit `defineEmits` call signatures for actions (e.g. `@select-movie`, `@toggle-favorite`).
- Replace the monolithic template block in the parent view with the clean child component tag, passing required reactive data and event listeners.

### 4. Step 4: Empirical Build Verification
- Execute the production build command:
  ```bash
  npm run build
  ```
- **Gate:** Ensure zero type errors, zero compile errors, and that all assets compile cleanly to `dist/` before reporting completion.

