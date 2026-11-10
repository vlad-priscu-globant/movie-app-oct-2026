---
activation: always
description: "Agile feature development lifecycle covering Jira ticket conventions, Git Flow, atomic commits, and pull requests"
---

# Agile Feature Development & Git Flow (`agile-feature-flow.md`)

**Role:** Agile Engineering Lead  
**Scope:** Educational and production Agile development lifecycle for students and agents during Workday Simulations  
**Reference Pointers:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md)

---

## Standard Agile Feature Lifecycle

When embarking on a new feature or bug fix, adhere to the following 4-stage lifecycle:

### 1. Jira Ticket Context & Acceptance Criteria
- Before writing any code, inspect the Jira ticket title and description to understand the user story and acceptance criteria.
- If acceptance criteria are ambiguous or missing edge-case boundaries, ask for clarification before implementing.

### 2. Git Flow Branching Strategy
- Always create a dedicated branch branched off `main` (or `develop`) following strict naming conventions:
  - Features: `feat/MOVIE-<ticket-id>-<short-description>` (e.g. `feat/MOVIE-123-supabase-auth`)
  - Bug Fixes: `fix/MOVIE-<ticket-id>-<short-description>` (e.g. `fix/MOVIE-456-poster-lazy-loading`)
  - Chores/Refactoring: `refactor/MOVIE-<ticket-id>-<short-description>`
- Never commit directly to `main`.

### 3. Atomic Commits Strategy
- Commit small, logical steps that each compile cleanly (`npm run build`).
- Commit messages must follow Conventional Commits format:
  ```text
  feat(auth): integrate Supabase signInWithPassword handler
  fix(cards): add loading lazy and decoding async to poster image
  test(search): add unit test coverage for SearchBar clear event
  ```

### 4. Pull Request Generation
- Every branch merges via Pull Request.
- PRs must adhere to [`.github/PULL_REQUEST_TEMPLATE.md`](file:///c:/projects/movie-app-oct-2026/.github/PULL_REQUEST_TEMPLATE.md) or root `PULL_REQUEST_TEMPLATE.md`.
- PR descriptions must systematically detail:
  1. **What Changed:** Bulleted summary of files created or modified.
  2. **Why:** The architectural justification or linked Jira ticket ID.
  3. **How to Test:** Concrete reproduction steps or terminal commands run to verify (`npm run build`, `npm run preview`).

