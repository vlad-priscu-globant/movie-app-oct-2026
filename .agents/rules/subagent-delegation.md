---
activation: always
description: "Strict guardrails and operating constraints for background task execution and subagent delegation"
---

# Subagent & Task Delegation Guardrails (`subagent-delegation.md`)

**Role:** Lead Operations Architect  
**Scope:** Universal guardrails governing background task execution, asynchronous command runners, and subagent delegation  
**Reference Pointers:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md)

---

## Delegation Guardrails & Operating Standards

When invoking background tasks, subagents, or tool executions, all assistants MUST strictly comply with the following 4 rules:

### 1. Clear Scope & Completion Boundary
- Every subagent invocation must receive an explicit, single-purpose prompt with non-overlapping functional boundaries.
- Prompts must define:
  1. The exact files to inspect or modify.
  2. Concrete success criteria (e.g., "Pass `npx vue-tsc -b` with 0 errors").
  3. Strict negative constraints (e.g., "Do not modify `src/App.vue` or package dependencies").

### 2. No Circular Loops or Recursive Spawning
- **Prohibited:** Subagents are strictly banned from spawning nested subagents recursively or creating arbitrary agent trees.
- **Prohibited:** No polling loops or continuous sleep scripts (`while true; sleep 5`). The messaging system notifies the parent agent reactively upon background task completion.

### 3. Structured Output Reporting
Upon task completion, the subagent or background task must deliver a concise, structured Markdown report following this format:

```markdown
### Subagent Execution Report
- **Task Objective:** [Brief statement of purpose]
- **Files Modified / Created:**
  - `path/to/file1.vue` (Created / Modified)
- **Terminal Verification Executed:**
  - Command: `npm run build`
  - Exit Code: `0`
  - Output Summary: Clean compilation
- **Status:** COMPLETED / BLOCKED
```

### 4. Immediate Error Escalation
- If a subagent encounters a blocking error (e.g. unhandled TypeScript failure, missing environment secret, sandbox permission block, or infinite recursion risk):
  - **Do NOT improvise workarounds or guess.**
  - **Do NOT suppress or swallow the exception.**
  - **Halt immediately** and return control to the parent agent or user, providing the un-truncated raw error log and exact reproduction command.
