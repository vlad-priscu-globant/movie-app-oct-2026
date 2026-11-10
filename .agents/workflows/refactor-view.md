---
description: "Step-by-step workflow for decomposing monolithic views into modular components"
command: /refactor-view
---

# View Deconstruction & Refactoring Workflow (`refactor-view.md`)

**Role:** Workflow Engineer  
**Executable Command:** `/refactor-view`  
**Reference:** [`@.agents/rules/component-refactoring.md`](file:///c:/projects/movie-app-oct-2026/.agents/rules/component-refactoring.md)

---

## Refactoring Execution Steps

1. **[Inspection]** Inspect target view file completely (`read_file`). Map reactive variables, computed state, and DOM fragments.
2. **[Extraction]** Author child SFC in `src/components/` using `<script setup lang="ts">` and PascalCase naming.
3. **[Binding]** Establish typed `defineProps` and `defineEmits` (`v-model` or custom events). Replace extracted DOM in parent view.
4. **[Verification]** Run `npm run build` (or `npx vue-tsc -b`). Confirm 0 compilation and type errors.

