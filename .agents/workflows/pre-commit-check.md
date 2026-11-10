---
description: "Non-skippable pre-commit validation workflow checking secrets, type safety, linting, and conventional commit format"
command: /pre-commit-check
---

# Pre-Commit Quality & Security Verification Workflow (`pre-commit-check.md`)

**Role:** Release & Automation Engineer  
**Executable Command:** `/pre-commit-check`  
**Gate:** NON-SKIPPABLE. All steps must pass with exit code `0` before code is staged or committed.  
**Reference Pointers:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md), [`fact-checking.md`](file:///c:/projects/movie-app-oct-2026/.agents/rules/fact-checking.md)

---

## Pre-Commit Verification Pipeline

Execute each step sequentially. **Halt immediately** upon any error.

### Step 1: Secret Scan (Credential & Token Protection)
Scan all staged and tracked repository files for exposed credentials:
- Check for hardcoded API keys:
  - TMDB API keys or bearer tokens (`api_key=`, `bearer eyJ...`)
  - Supabase `service_role` secrets or private database connection strings (`postgresql://...`)
  - JWT signing secrets or unencrypted private keys
- Confirm `.env`, `.env.local`, and `.env.production` remain untracked in `.gitignore`.
- **Gate:** If any secret is detected in git-tracked files, **HALT IMMEDIATELY**. Purge credentials and rotate keys.

### Step 2: Static Type Checking
Run the TypeScript compiler verification:
```bash
npx vue-tsc -b   # (or npx nuxi typecheck in Nuxt 3 mode)
```
- **Gate:** If exit code $\ne 0$, **HALT IMMEDIATELY**. Zero type errors or implicit `any` escapes allowed.

### Step 3: Linting & Code Hygiene Audit
Run the linter across all source files:
```bash
npx eslint .
```
- **Gate:** If exit code $\ne 0$, **HALT IMMEDIATELY**. Fix all linting and syntax violations.

### Step 4: Conventional Commits Audit
Verify that the proposed git commit message strictly adheres to the Conventional Commits specification:
- **Format:** `<type>(<scope>): <short description>`
- **Permitted Types:**
  - `feat`: A new feature (e.g. `feat(auth): add login validation schema`)
  - `fix`: A bug fix (e.g. `fix(cards): add loading lazy to poster images`)
  - `refactor`: Code change that neither fixes a bug nor adds a feature (e.g. `refactor(views): extract movie card to component`)
  - `style`: Changes that do not affect code logic (whitespace, formatting)
  - `test`: Adding or correcting tests (e.g. `test(search): add unit tests for SearchBar`)
  - `chore`: Changes to build process, dependencies, or configs (e.g. `chore(deps): update zod`)
  - `docs`: Documentation updates (e.g. `docs(agents): update discovery report`)
- **Gate:** Reject any commit message formatted ambiguously (e.g., `"updates"`, `"fixed stuff"`, `"wip"`).

### Step 5: Execution Summary Report
Generate and append a structured verification table to the task walkthrough or commit summary:
- **Secret Scan:** PASSED (0 secrets detected)
- **Typecheck:** PASSED (0 errors)
- **Linter:** PASSED (0 warnings / errors)
- **Commit Format:** PASSED (`type(scope): description` validated)
- **Status:** READY TO COMMIT
