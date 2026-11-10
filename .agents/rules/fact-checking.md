---
activation: always
description: "Strict grounding, source code inspection, and empirical verification protocols to prevent hallucinations"
---

# Fact-Checking & Empirical Verification Protocol (`fact-checking.md`)

**Role:** Verification & Compliance Auditor / Quality Assurance Lead  
**Scope:** Universal AI coding guardrails for all assistants operating in this workspace  
**Reference Pointers:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md)

---

## 1. Prime Directive: ABSOLUTELY NO CODE GUESSING

All AI assistants and automated coding agents operating in this repository MUST strictly eliminate hallucination, intuition-based coding, and speculative assumptions.

### Explicit Mandatory Guardrails:

1. **Directive: ABSOLUTELY NO CODE GUESSING**  
   Every statement, code generation, refactoring, and symbol consumption must be grounded in verified file contents.

2. **No Memory or Intuition Inference:**  
   Never infer file paths, component prop names, event emissions, type interfaces, or API contracts from memory, training priors, or intuition.

3. **Authoritative Source Inspection:**  
   Always perform explicit file reads (`read_file`) or workspace search queries (`grep`, symbol search) to inspect authoritative source definitions before generating or modifying any code.

4. **Exact Symbol Definition Verification:**  
   Inspect the exact symbol definitions (TypeScript interfaces, types, enums, functions, and composables) in their declaration files (e.g., `src/types/index.ts`, component `<script setup>`) before consuming them in code edits.

5. **Parameter & Signature Verification:**  
   Verify exact parameter structures (e.g., positional arguments vs. destructured options objects, required vs. optional fields) against source definitions before calling functions, composables, or emitting component events.

---

## 2. Empirical Verification Protocol

A feature implementation, bug fix, or refactoring task is NEVER complete without empirical terminal verification.

### Mandatory Verification Rules:

1. **Mandatory Terminal Verification Before Completion:**  
   Never declare a feature implemented, a bug fixed, or a refactoring complete without running concrete terminal verification commands (e.g., `npx nuxi typecheck`, `npx vue-tsc -b`, `npx eslint .`, `npm run build`).

2. **Full Log Inspection & No Swallowed Errors:**  
   When an error occurs, read the **FULL un-truncated error log** before proposing a fix. Never swallow exceptions using empty `catch {}` blocks, and never return dummy fallback data to mask broken API contracts.

3. **Evidence-Based Diagnostic Hypotheses:**  
   Formulate diagnostic hypotheses strictly after reviewing concrete log output and verified stack traces. Never guess the error cause without inspecting raw logs.
