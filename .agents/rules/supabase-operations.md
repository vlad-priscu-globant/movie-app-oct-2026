---
activation: always
description: "Guardrails for autonomous Supabase database migrations, RLS enforcement, and secret safety"
---

# Autonomous Supabase Operations & Security Protocol (`supabase-operations.md`)

**Role:** Autonomous Database Administrator  
**Scope:** Supabase database migrations, Row-Level Security (RLS) enforcement, schema updates, and token management  
**Reference Pointers:** [`@ARCHITECTURE.md`](file:///c:/projects/movie-app-oct-2026/ARCHITECTURE.md), [`@AGENTS.md`](file:///c:/projects/movie-app-oct-2026/AGENTS.md)

---

## 1. Core Operating Guardrails

All database interactions, schema modifications, and authentication configurations involving Supabase must strictly uphold these 3 guardrails:

### 1.1 Automated Migrations & Schema Versioning
- Whenever a database schema change or RLS policy update is requested:
  1. Generate a timestamped, declarative SQL migration file in `supabase/migrations/` (e.g. `supabase/migrations/20261110000001_create_movies_and_favorites.sql`).
  2. Ensure all table creations include `created_at` timestamp with time zone and primary keys.
  3. Attempt to apply the migration using the Supabase CLI (`npx supabase db push` or `npx supabase migration up`).
  4. Never execute raw, untracked DDL queries directly on production databases without an accompanying migration script in version control.

### 1.2 Proactive Token & Key Validation
- Before executing any CLI database commands (`db push`, `db pull`, `migration up`):
  1. Inspect the local environment to verify that required tokens exist (`SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_ID`, or database connection password).
  2. If any credential is missing or unauthenticated, **do not proceed blindly**. Proactively prompt the user with clear instructions on which key/token is required.

### 1.3 Strict Environment Safety & Row-Level Security (RLS)
- **Zero Client Exposure of `service_role`:**  
  The Supabase `service_role` key bypasses all RLS checks. It must **NEVER** be committed to Git, bundled into client-side code, or exposed via `publicRuntimeConfig` or `VITE_` / `NUXT_PUBLIC_` environment variables. It may only be consumed in trusted server routes (`server/api/`).
- **Autonomous RLS Policy Enforcement:**  
  Every table created in Supabase MUST have Row-Level Security explicitly enabled:
  ```sql
  ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

  -- Read policy: Anyone can read movie catalog
  CREATE POLICY "Public movies are viewable by everyone" 
  ON public.movies FOR SELECT USING (true);

  -- User-specific policy: Users can only manage their own favorites
  CREATE POLICY "Users can manage their own favorites" 
  ON public.favorites FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);
  ```

