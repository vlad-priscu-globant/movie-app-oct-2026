# Agentic Project Setup & Engineering Prompts

This document provides a production-grade collection of prompts in English for setting up and operating a **Multi-Tool Context Engineering System**. Each prompt is designed to actively inspect the codebase and **generate persistent, Git-tracked Markdown rule files** (`ARCHITECTURE.md`, `.agents/rules/*.md`, `.agents/workflows/`, `CLAUDE.md`, `.cursorrules`, `AGENTS.md`) so that any user or AI assistant who clones the repository operates under identical project guidelines.

---

## 🔍 Stage 1: Discovery & Audit Prompts (Generating Project Baseline)

Use these prompts when onboarding onto a new or existing codebase to automatically inspect the workspace and write baseline architectural reports.

### Prompt 1.1: Tech Stack & Architecture Discovery (Generates `DISCOVERY_REPORT.md`)

```text
Role: Senior Frontend Architect
Task: Execute a Discovery Phase on the workspace and generate `DISCOVERY_REPORT.md` at the project root.

Inspect key configuration files (`package.json`, `tsconfig.json`, `nuxt.config.ts`, `vite.config.ts`, or equivalent). Write a structured Markdown report containing:
1. Exact installed versions of Vue, Nuxt, TypeScript, Tailwind CSS, Supabase, Vercel insights, and auxiliary libraries.
2. Directory hierarchy map (`pages/`, `components/`, `layouts/`, `server/`, `types/`, `public/`).
3. Routing layout and active page views.
4. A visual ASCII tree representing the architectural layout of the application.

Action: Save the report to `DISCOVERY_REPORT.md` at the project root.
```

### Prompt 1.2: Code Style & Pattern Mapping (Generates `.agents/rules/code-conventions.md`)

```text
Role: Lead Code Quality Engineer
Task: Audit existing Vue 3 / Nuxt 3 components in `components/`, `pages/`, and `views/`, and create `.agents/rules/code-conventions.md`.

Inspect the codebase and write a persistent rule file with YAML frontmatter (`activation: always`) detailing:
1. Script Setup Standard: Confirm exclusive usage of `<script setup lang="ts">`.
2. Reactivity Rules: Map when `ref` vs `reactive` is used, and how `computed` and `watch` are structured.
3. Component Naming: Enforce PascalCase for component filenames (`MovieCard.vue`) and kebab-case in templates (`<movie-card />`).
4. SOLID & SRP Assessment: Guidelines for separating UI view components from reusable child components.
5. DRY & Composables: Rules for extracting repeated logic into reusable composables or helper utilities.

Action: Save the output to `.agents/rules/code-conventions.md`.
```

---

## 🛡️ Stage 2: Fact-Checking & Grounding Prompts (Generates `.agents/rules/fact-checking.md`)

These prompts establish file-backed rules enforcing strict grounding so that AI agents inspect source code before making assumptions.

### Prompt 2.1: Strict File & Schema Inspection Rule (No Code Guessing Directive)

```text
Role: Verification & Compliance Auditor
Task: Create `.agents/rules/fact-checking.md` with YAML frontmatter (`activation: always`).

Write explicit guardrails for all AI assistants working in this workspace:
1. Directive: ABSOLUTELY NO CODE GUESSING.
2. Never infer file paths, component prop names, type interfaces, or API contracts from memory or intuition.
3. Perform file reads or search queries to inspect authoritative source definitions before generating or modifying code.
4. Inspect exact symbol definitions (interfaces, types, enums, composables) before consuming them in code edits.
5. Verify parameter structures (e.g., positional arguments vs. destructured options) against source definitions.

Action: Create `.agents/rules/fact-checking.md`.
```

### Prompt 2.2: Empirical Verification Protocol (Appends to `.agents/rules/fact-checking.md`)

```text
Role: Quality Assurance Lead
Task: Append the Empirical Verification Protocol to `.agents/rules/fact-checking.md`.

Add the following mandatory rules to `.agents/rules/fact-checking.md`:
1. Never declare a feature implemented, a bug fixed, or a refactoring complete without running concrete terminal verification commands (e.g., `npx nuxi typecheck`, `npx eslint .`, `npm run build`).
2. When an error occurs, read the FULL un-truncated error log before proposing a fix. Never swallow exceptions or return dummy fallback data.
3. Formulate diagnostic hypotheses strictly after reviewing concrete log output.

Action: Append these rules to `.agents/rules/fact-checking.md`.
```

---

## 🎭 Stage 3: Personas & Architectural Principles Prompts (Generates `.agents/rules/persona-and-principles.md`)

Configure AI personas and core engineering principles as persistent file-backed workspace rules.

### Prompt 3.1: Persona & Behavioral Guidelines Rule Generation

```text
Role: Lead Systems Architect
Task: Create `.agents/rules/persona-and-principles.md` with YAML frontmatter (`activation: always`).

Define the primary AI persona ("The Pragmatic Tech Lead" & "The Skeptic") and behavioral rules:
1. Tone & Persona: Confident, concise, technically precise, constructively analytical ("Let's clean this up").
2. Code Refactoring Rule: Keep diffs minimal and clean. Do not reformat unrelated code.
3. Edge-Case Focus: Search for race conditions, null/undefined crashes, unhandled rejections, and missing validation boundaries.
4. Pragmatic Pushback: If a user request introduces tech debt or breaks separation of concerns, warn: "I can implement this, but trade-off warning: [Issue]. Recommended alternative: [Solution]."

Action: Create `.agents/rules/persona-and-principles.md`.
```

### Prompt 3.2: Software Architecture Principles Rule (KISS, DRY, SOLID)

```text
Role: Principal Code Quality Architect
Task: Append KISS, DRY, and SOLID principles to `.agents/rules/persona-and-principles.md`.

Add strict software design rules that all future code modifications must obey:
- KISS (Keep It Simple, Stupid): Prefer simple, readable implementations over over-engineered abstractions.
- DRY (Don't Repeat Yourself): Extract repeated template structures, styling patterns, or state logic into reusable Vue components or composables.
- SOLID Principles:
  - Single Responsibility (SRP): Components must do one thing well (e.g., `SearchBar.vue` handles input; `HomeView.vue` orchestrates state).
  - Open/Closed (OCP): Design components to be extensible via props and slots without modifying internal code.
  - Liskov Substitution (LSP) & Interface Segregation (ISP): Define small, explicit TypeScript interfaces for props and events.
  - Dependency Inversion (DIP): Depend on abstractions (TypeScript interfaces/types) rather than concrete implementations.

Action: Append these principles to `.agents/rules/persona-and-principles.md`.
```

---

## 🛠️ Stage 4: Project Configuration & Portable Context Prompts (`AGENTS.md` / `.agents/` / `ARCHITECTURE.md`)

Prompts for setting up agent preference files, git-committed rules, custom skills, workflows, MCP server protocols, and 12-session roadmap tracking across Google Antigravity, Claude Code, Cursor, and Codex.

### Prompt 4.1: Master Preferences & Project Roadmap Generation

```text
Role: Senior Staff Architect
Task: Generate `project-preferences.md` in the project root.

Include the following sections:
1. Active Tech Stack Evolution:
   - Phase 1 (Sessions 1-4): Vite + Vue 3 Composition API + Tailwind CSS + TypeScript + Zod.
   - Phase 2 (Sessions 5-8): Component Architecture + Express Backend + Nuxt 3 (SSR) + Supabase Auth & DB.
   - Phase 3 (Sessions 9-12): Vercel Deployment + Agile Workday Simulation (Jira, Git Flow, PR Reviews).
2. Strict Architectural Rules:
   - Use `<script setup lang="ts">` exclusively.
   - Zero `any` types allowed.
   - No direct DOM manipulation (use `ref` / `reactive`).
   - Component state isolation (Props down, Emits up).
3. Soft Conflict Protocol:
   - Warn on architectural violations and provide alternatives before proceeding.
```

### Prompt 4.2: Portable Multi-Tool Context Engineering Layer (Git-Committed Setup)

```text
Role: Lead Context Engineer & Frontend Architect
Task: Construct, organize, and enforce a multi-tool context engineering system optimized for Google Antigravity while maintaining seamless compatibility with Claude Code, Cursor, and Codex.

Generate the following 5 core items across `.agents/`, root `ARCHITECTURE.md`, `CLAUDE.md`, and `.cursorrules`:

======================================================================
ITEM 1: Single Source of Truth (`ARCHITECTURE.md` at Project Root)
======================================================================
Action: Analyze workspace and generate `ARCHITECTURE.md`.
Required Sections:
- Tech Stack & Core Libraries: Nuxt 3, Vue 3 Composition API (<script setup lang="ts">), Tailwind CSS, @nuxtjs/supabase, @nuxt/image, Nitro engine, Vercel deployment.
- Project Directory Map: Responsibilities of `pages/`, `components/`, `layouts/`, `middleware/`, `server/` (Nitro API routes & middleware), `types/`, and `public/`.
- Primary Terminal Commands: `npm run dev`, `npx nuxi typecheck`, `npx eslint .`, `npm run build`, `npm run preview`.
- Code Quality Guardrails: Zero `any` types, Composition API script setup, Vue refs/reactive, Nuxt auto-imports vs explicit interface imports, H3 event handlers in `server/api/`, Supabase composables (`useSupabaseClient`, `useSupabaseUser`).
- MCP Servers Protocol: Guidelines for querying `context7` (Vue/Nuxt documentation), Supabase MCP (DB schema & RLS policies), and Vercel MCP (logs and deployments).

======================================================================
ITEM 2: Antigravity Always-Active Workspace Rules (`.agents/rules/core-conventions.md`)
======================================================================
Action: Create `.agents/rules/core-conventions.md` with YAML frontmatter.
Requirements:
- Frontmatter: Set `activation: always`
- Reference `@ARCHITECTURE.md` directly.
- Define explicit guardrails: Strict TypeScript rules (no `any`), PascalCase Vue component filenames (`MovieCard.vue`), kebab-case template usage (`<movie-card />`), required import order, and error boundary patterns.

======================================================================
ITEM 3: Antigravity Multi-Step Workflows (`.agents/workflows/build-and-verify.md`)
======================================================================
Action: Create `.agents/workflows/build-and-verify.md`.
Requirements:
- Checklist executable via `/build-and-verify`:
  Step 1: Execute Nuxt type checking (`npx nuxi typecheck`). Halt on error.
  Step 2: Execute ESLint validation (`npx eslint .`). Halt on error.
  Step 3: Execute production build (`npm run build`).
  Step 4: Inspect `.output/` Nitro build artifact directory for integrity.
  Step 5: Write a concise execution log to the task walkthrough.

======================================================================
ITEM 4: Custom Skill Definition (`.agents/skills/component-extractor/SKILL.md`)
======================================================================
Action: Create custom skill file with YAML frontmatter.
Requirements:
- Frontmatter: `name: component_extractor`, `description: Refactors monolithic Vue templates into modular child components with typed Props and Emits.`
- Workflow: Identify isolated template blocks -> Create child component in `components/` -> Define `defineProps`/`defineEmits` -> Replace template block -> Verify build.

======================================================================
ITEM 5: Cross-Tool Compatibility Layer (`CLAUDE.md`, `.cursorrules`, `AGENTS.md`)
======================================================================
Action: Create pointer context files at workspace root.
1. `CLAUDE.md`: Instruct Claude Code to read `@ARCHITECTURE.md`, list CLI commands (`dev`, `build`, `typecheck`, `lint`), and detail Nuxt 3 / Supabase conventions.
2. `.cursorrules`: Direct Cursor AI to `@ARCHITECTURE.md` and specify ignored directories (`.nuxt/`, `.output/`, `node_modules/`).
3. `AGENTS.md`: Fallback master rule file for general Codex/Copilot agents linking to `@ARCHITECTURE.md`.
```

### Prompt 4.3: Refactoring Workflows & Automation Rules

```text
Role: Workflow Engineer
Task: Establish a component refactoring workflow rule.

Whenever triggered to "Refactor view X into components":
1. Inspect the source view file completely (Fact-checking rule: No code guessing).
2. Extract sub-views or repeated UI blocks into child components (`src/components/`).
3. Wire two-way data bindings using `v-model` (`:modelValue` / `@update:modelValue`) or explicit Props/Emits.
4. Execute `npm run build` to confirm compilation success.
```

### Prompt 4.4: 12-Session Goal & Progress Tracking (`tracking.md`)

```text
Role: Curriculum Coordinator
Task: Generate and initialize `july-august/tracking.md` covering all 12 sessions.

Structure the tracker with status checkboxes `[x]` / `[ ]` and key deliverables for each session:

- [x] Session 01: Environment Setup, Git, GitHub & Jira Integration (Workday Simulation Overview).
- [x] Session 02: Transitioning from Vanilla JS to Vue 3, Vite & Tailwind CSS Setup.
- [x] Session 03: SPA UI Architecture, Vue Router, Responsive Layouts & Slots.
- [x] Session 04: Vue 3 Advanced Reactivity (ref, reactive, computed, watch) & Schema Validation with Zod.
- [x] Session 05: Component Architecture (Props & Emits) & Agentic AI Setup (Discovery & Configs).
- [ ] Session 06: Early Backend Integration & External APIs (Local Express Server, TMDB API, JWT Auth).
- [ ] Session 07: Nuxt 3 Migration (SSR vs SPA), Performance & Speed Insights.
- [ ] Session 08: Backend As a Service (Supabase Authentication, Database Integration & RLS).
- [ ] Session 09: CI/CD, Deployment on Vercel, Staging & Production Environments.
- [ ] Session 10: Workday Simulation Part 1 – Agile Sprint Planning, Ticket Creation & Branching Strategy.
- [ ] Session 11: Workday Simulation Part 2 – Feature Development, Code Reviews & Pull Request Flow.
- [ ] Session 12: Workday Simulation Part 3 – Sprint Retrospective, Production Delivery & Portfolio Presentation.
```

---

## 💡 Stage 5: Helper Prompts (Quality Assurance, Debugging & Performance)

Additional helper prompts to assist during code review, test generation, and bundle analysis.

### Prompt 5.1: Critical Code Review & Vulnerability Audit Prompt

```text
Role: Senior Security & Code Quality Auditor
Task: Conduct a code review on `src/`.

Inspect the specified components and check for:
1. Type Safety: Are there unhandled `undefined` / `null` values or implicit `any` types?
2. Memory / Event Leakage: Are `watch` effects or event listeners cleaned up appropriately?
3. Input Sanitation & Validation: Are user inputs strictly validated via Zod schemas before processing?
4. Code Cleanliness: Are KISS, DRY, and SOLID principles maintained?

Output a list of findings categorized by [CRITICAL], [WARNING], and [SUGGESTION].
```

### Prompt 5.2: Unit & Integration Test Case Generator Prompt

```text
Role: QA Automation Engineer
Task: Generate Vitest / Vue Test Utils tests for `src/components/MovieCard.vue` and `SearchBar.vue`.

Generate test suites covering:
1. Props Rendering: Verify that props passed down render correctly in the DOM.
2. Event Emissions: Verify that clicking the card emits `selectMovie` with the correct payload.
3. Two-Way Binding: Verify that typing in `SearchBar.vue` fires `@update:modelValue`.
4. Edge Cases: Verify behavior when optional props (e.g., `isFavorite`) are omitted.
```

### Prompt 5.3: Performance & Bundle Optimization Prompt

```text
Role: Performance Optimization Specialist
Task: Audit component render performance and asset loading.

Evaluate:
1. Asset Loading: Are poster images lazily loaded using native `loading="lazy"` or optimized aspect ratios?
2. Reactive Caching: Are expensive filters or sorting operations correctly wrapped in `computed` properties instead of methods?
3. Bundle Tree-Shaking: Are imports modularized to avoid importing unused utility methods?
```

---

## 🚀 Stage 6: Advanced Context Engineering (Memory Bank & Self-Healing Workflows)

These advanced prompts setup persistent repository memory, self-healing diagnostic recovery loops, subagent delegation guardrails, and pre-commit verification pipelines.

### Prompt 6.1: Memory Bank & Architectural Knowledge System (Generates `.agents/memory/`)

```text
Role: Principal Knowledge Engineer
Task: Create the repository Memory Bank structure under `.agents/memory/`.

Generate the following two persistent tracking files with YAML frontmatter (`activation: always`):

1. `.agents/memory/decisions.md`:
   - Document major architectural decisions (e.g., Nuxt 3 SSR adoption, Supabase auth migration, Pinia state isolation, Vercel Nitro deployment).
   - Format: `[Date] | Decision | Rationale | Alternatives Considered`.

2. `.agents/memory/gotchas.md`:
   - Record repository-specific bugs, API quirks (TMDB rate limits, Nitro DB driver quirks, Supabase SSR cookie handling), and build gotchas.
   - Format: `[Gotcha Title] | Component/File | Symptom | Root Cause | Solution`.

Directive: All future AI sessions must consult `.agents/memory/` before attempting architectural changes or debugging tricky errors.

Action: Create `.agents/memory/decisions.md` and `.agents/memory/gotchas.md`.
```

### Prompt 6.2: Pre-Commit & PR Quality Workflow (Generates `.agents/workflows/pre-commit-check.md`)

```text
Role: Release & Automation Engineer
Task: Create a non-skippable pre-commit validation workflow executable via `/pre-commit-check`.

Write `.agents/workflows/pre-commit-check.md` with the following sequential steps:
1. Secret Scan: Verify no `.env` credentials, TMDB API keys, or Supabase service keys are hardcoded in tracked files.
2. Type Checking: Execute `npx nuxi typecheck`. Halt immediately on type errors.
3. Linting: Execute `npx eslint .`. Halt immediately on lint errors.
4. Conventional Commits Audit: Verify staged commit message follows `type(scope): description` (e.g., `feat(auth): add login validation`).
5. Execution Summary: Write execution results to task walkthrough artifact.

Action: Create `.agents/workflows/pre-commit-check.md`.
```

### Prompt 6.3: Subagent & Task Delegation Guardrails (Generates `.agents/rules/subagent-delegation.md`)

```text
Role: Lead Operations Architect
Task: Create `.agents/rules/subagent-delegation.md` with YAML frontmatter (`activation: always`).

Establish strict guardrails for when an agent spawns background tasks or subagents:
1. Clear Scope & Boundary: Subagents must be given an explicit, single-purpose task description and clear completion criteria.
2. No Circular Loops: Prohibit subagents from polling or spawning nested subagents recursively.
3. Structured Output: Subagents must report results back using structured Markdown summaries (Files Changed, Verification Command Run, Status).
4. Error Escalation: If a subagent encounters a blocking permission or build error, it must return control immediately with log evidence.

Action: Create `.agents/rules/subagent-delegation.md`.
```

### Prompt 6.4: Self-Healing & Diagnostic Recovery Loop (Generates `.agents/rules/error-recovery.md`)

```text
Role: Principal Reliability Engineer
Task: Create `.agents/rules/error-recovery.md` with YAML frontmatter (`activation: always`).

Write a mandatory 5-step self-healing protocol for when any terminal command, build script, or test fails:
1. Log Extraction: Inspect the un-truncated error log output. Never guess the error without reading raw logs.
2. Root Cause Analysis: Trace upstream data providers or broken contracts rather than patching superficial symptoms (no dummy fallbacks or swallowed exceptions).
3. Targeted Correction: Apply surgical modifications targeting the verified root cause.
4. Verification Re-Run: Immediately re-execute the failing command to prove clean resolution.
5. Gotcha Registration: If the fix resolves a recurring or subtle framework bug, append an entry to `.agents/memory/gotchas.md`.

Action: Create `.agents/rules/error-recovery.md`.
```

---

## 🌐 Stage 7: Agile Workday & Infrastructure Operations (Educational Focus)

These prompts are specifically tailored for the Workday Simulation (Sessions 10-12) and teaching students how to safely operate Cloud infrastructure (Supabase & Vercel) alongside Agile methodologies.

### Prompt 7.1: Agile Feature Development Workflow (Git Flow & PRs)

```text
Role: Agile Engineering Lead
Task: Create `.agents/workflows/agile-feature-flow.md` with YAML frontmatter (`activation: always`).

Define the standard Agile feature lifecycle for students:
1. Branching Strategy: Enforce branch naming conventions based on Jira tickets (e.g., `feat/MOVIE-123-add-auth`, `fix/MOVIE-456-header-bug`).
2. Ticket Context: When starting a feature, the agent must ask for or read the ticket description to understand acceptance criteria.
3. Commit Strategy: Enforce atomic commits mapped to logical steps of the ticket.
4. PR Generation: Automate the creation of a `PULL_REQUEST_TEMPLATE.md` and instruct the agent to generate PR descriptions highlighting: What changed, Why, and How to test.

Action: Create `.agents/workflows/agile-feature-flow.md`.
```

### Prompt 7.2: Autonomous Supabase Operations & Migrations

```text
Role: Autonomous Database Administrator
Task: Create `.agents/rules/supabase-operations.md` with YAML frontmatter (`activation: always`).

Establish guardrails for autonomous Supabase operations:
1. Automated Migrations: When a database schema change or RLS update is requested, automatically generate the SQL migration in `supabase/migrations/` and attempt to apply it using the Supabase CLI (`npx supabase db push` or equivalent).
2. Proactive Key Checks: Before executing database operations, automatically verify if the necessary environment variables/tokens (e.g., `SUPABASE_ACCESS_TOKEN`, DB passwords) exist. If missing, proactively prompt the user to provide them.
3. Environment Safety: Never expose the `service_role` key in client-side code. Always enforce strict RLS policies autonomously.

Action: Create `.agents/rules/supabase-operations.md`.
```

### Prompt 7.3: Autonomous Vercel Deployment & Troubleshooting

```text
Role: Autonomous DevOps Engineer
Task: Create `.agents/rules/vercel-operations.md` with YAML frontmatter (`activation: always`).

Establish rules for autonomous Vercel deployment workflows:
1. Automated Debugging: If a user reports a Vercel deployment failure, automatically fetch the deployment logs (using Vercel CLI or MCP), interpret the Nuxt/Nitro output, and surgically fix the code without requiring manual log fetching from the user.
2. Proactive Secrets Management: Before initiating a Vercel deployment or debug, check for required Vercel tokens. Prompt the user immediately if auth keys are missing. Verify if local `.env` variables need to be synced with Vercel and handle the sync.
3. Edge vs Serverless Context: Automatically resolve Node.js specific API issues (like `fs`) in edge-compatible routes by refactoring the code to use Edge-safe alternatives.

Action: Create `.agents/rules/vercel-operations.md`.
```

