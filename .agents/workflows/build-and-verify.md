---
description: "Sequential automated verification workflow checking types, linting, production build compilation, and Nitro output artifacts"
command: /build-and-verify
---

# Build and Verify Workflow (`build-and-verify.md`)

**Role:** Automation & Release Engineer  
**Trigger:** Executable via slash command `/build-and-verify`  
**Reference:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md)

---

## Verification Pipeline Checklist

Execute the following verification steps in exact sequence. **Halt immediately** if any step fails.

### Step 1: Execute Type Checking
Run the workspace TypeScript compiler check without emitting files:
```bash
npx vue-tsc -b   # In Nuxt 3 mode: npx nuxi typecheck
```
- **Evaluation:** Inspect output for type mismatch errors, missing properties, or invalid generic parameters.
- **Gate:** If exit code $\ne 0$, **HALT IMMEDIATELY**. Review full un-truncated error log, apply fix, and re-run.

### Step 2: Execute ESLint Validation
Run the static code linter:
```bash
npx eslint .
```
- **Evaluation:** Inspect output for syntax errors, formatting deviations, or banned patterns (e.g. `any`, unhandled promises).
- **Gate:** If exit code $\ne 0$, **HALT IMMEDIATELY**. Fix reported linting violations before proceeding.

### Step 3: Execute Production Build
Run the production bundler:
```bash
npm run build
```
- **Evaluation:** Ensure Vite / Nuxt Nitro finishes bundle compilation cleanly without unhandled asset errors or missing imports.
- **Gate:** If exit code $\ne 0$, **HALT IMMEDIATELY**. Diagnose build error from log output.

### Step 4: Inspect Build Artifacts Directory
Verify that build artifacts were cleanly generated:
- For Vite SPA: Confirm `dist/` contains `index.html` and bundled assets in `dist/assets/`.
- For Nuxt 3: Confirm `.output/` contains `.output/server/` (Nitro server bundles) and `.output/public/` (client hydration assets).

### Step 5: Write Execution Log
Record a concise summary in the task walkthrough or verification log:
- **Status:** PASS / FAIL
- **Typecheck Result:** Clean (0 errors)
- **Lint Result:** Clean (0 violations)
- **Build Output:** Verified artifact bundle integrity

