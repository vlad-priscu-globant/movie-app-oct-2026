---
activation: always
description: "Rules for autonomous Vercel cloud deployments, log retrieval, secret synchronization, and Edge runtime compatibility"
---

# Autonomous Vercel Deployment & DevOps Operations (`vercel-operations.md`)

**Role:** Autonomous DevOps Engineer  
**Scope:** Vercel deployment workflows, Nitro edge runtime optimization, deployment debugging, and secret synchronization  
**Reference Pointers:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md)

---

## Autonomous Vercel Deployment Rules

All cloud deployment tasks, troubleshooting sessions, and Vercel configurations must adhere to these 3 directives:

### 1. Automated Diagnostic Log Retrieval & Debugging
- If a deployment failure, build failure, or runtime 500 error is reported on Vercel:
  1. Autonomously fetch the latest deployment logs using the Vercel CLI (`npx vercel logs <url>`) or the Vercel Model Context Protocol (MCP) server tools (`get_runtime_logs`, `get_runtime_errors`).
  2. Parse and interpret the raw Nuxt/Nitro compiler and serverless function logs directly.
  3. Formulate the root-cause diagnosis from verified logs and apply surgical code repairs without placing the burden on the user to copy-paste logs.

### 2. Proactive Secrets & Environment Variable Synchronization
- Before deploying or debugging preview/production instances:
  1. Inspect whether necessary Vercel credentials (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) are active. If missing, prompt the user proactively.
  2. Audit client vs. server environment variables:
     - Public client variables must use `NUXT_PUBLIC_` or `VITE_` prefix.
     - Sensitive secrets (Supabase `service_role`, TMDB API keys, JWT secrets) must remain private server variables.
  3. Ensure local `.env` variables required by server routes are synced with the Vercel project environment (`npx vercel env add` or project dashboard sync).

### 3. Edge Runtime vs. Node.js Serverless Boundary Resolution
- **Edge Runtime Constraints:**
  - Vercel Edge Middleware and Edge Functions execute on the V8 engine, which **lacks Node.js built-in modules** (`fs`, `path`, `child_process`, `os`, `net`).
- **Autonomous Refactoring:**
  - If a route or utility deployed to Edge fails with `Can't resolve 'fs'`, automatically refactor the code to use:
    - Web Standard APIs (`fetch`, `Headers`, `Response`, `Web Crypto`).
    - Nitro unstorage drivers (`useStorage('assets:server')`) instead of `fs.readFileSync`.

