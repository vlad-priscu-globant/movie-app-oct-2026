---
activation: always
description: "Mandatory 5-step self-healing error recovery protocol for build failures, runtime errors, and test issues"
---

# Self-Healing & Diagnostic Error Recovery Protocol (`error-recovery.md`)

**Role:** Principal Reliability Engineer  
**Scope:** Universal error resolution workflow triggered whenever a terminal command, build script, or test fails  
**Reference Pointers:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md), [`fact-checking.md`](file:///c:/projects/movie-app-oct-2026/.agents/rules/fact-checking.md)

---

## 5-Step Self-Healing Protocol

Whenever a compilation, build script (`npm run build`), type-check (`vue-tsc`), linter (`eslint`), or test fails, all agents MUST systematically execute the following 5 steps:

```text
┌────────────────────────────────────────────────────────┐
│  Step 1: Log Extraction (Inspect Un-Truncated Log)     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  Step 2: Root Cause Analysis (Trace Upstream Contracts)│
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  Step 3: Targeted Correction (Surgical Root Fix)       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  Step 4: Verification Re-Run (Prove Resolution)        │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  Step 5: Gotcha Registration (Append to gotchas.md)    │
└────────────────────────────────────────────────────────┘
```

### Step 1: Log Extraction (Raw Log Inspection)
- Inspect the **FULL, un-truncated error log output** from the terminal or build process.
- **Strict Prohibition:** Never guess the error cause, hypothesize based on partial messages, or act on assumptions without reading the raw stack trace.

### Step 2: Root Cause Analysis (Contract Tracing)
- Trace the issue upstream to the root break in contract (e.g., mismatched TypeScript interface, malformed Zod schema, missing export, or invalid Vite plugin configuration).
- **Strict Prohibition:** Never patch superficial symptoms. Never swallow exceptions with empty `catch {}` blocks, and never introduce dummy fallback data to mask broken API contracts.

### Step 3: Targeted Correction (Surgical Code Fix)
- Apply minimal, surgical modifications addressing only the verified root cause.
- Maintain formatting and documentation integrity; do not touch unrelated files or lines.

### Step 4: Verification Re-Run (Empirical Proof)
- Immediately re-execute the exact failing terminal command (e.g. `npm run build`, `npx vue-tsc -b`, `npx eslint .`).
- Confirm that the command exits with code `0` and outputs clean compilation logs.

### Step 5: Gotcha Registration (Memory Bank Update)
- If the resolved issue was caused by a subtle framework bug, non-obvious reactivity pitfall, or third-party API quirk:
- Document the occurrence by appending a structured row to [`.agents/memory/gotchas.md`](file:///c:/projects/movie-app-oct-2026/.agents/memory/gotchas.md):
  ```markdown
  | [Gotcha Title] | Component/File | Symptom | Root Cause | Solution |
  ```

