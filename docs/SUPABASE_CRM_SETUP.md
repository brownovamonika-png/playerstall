# Supabase for the PlayerStall CRM

You can use **Paste inquiry → Copy for Google Sheets** without any database. Supabase is only if you want leads stored **inside** the CRM.

## Easiest path (cloud — no Docker)

1. Go to [supabase.com](https://supabase.com), sign up, click **New project** (free tier is fine).
2. Wait until the project finishes creating.
3. Click **Project Settings** (gear) → **API**.
4. Copy these three into your `.env` file next to `CRM_SHARED_PASSWORD`:
   - **Project URL** → `SUPABASE_URL=...`
   - **`anon` `public`** → `SUPABASE_ANON_KEY=...`
   - **`service_role` `secret`** → `SUPABASE_SERVICE_ROLE_KEY=...` (keep secret; never put in browser code)
5. In Supabase, open **SQL Editor** → **New query** → paste **everything** from the file `supabase/schema.sql` in this repo → **Run**.

**If you see `syntax error at end of input` on `LINE 0`:** the query box was empty or only part of the file was pasted. Click inside the editor, select all (**Cmd+A**), paste the full `schema.sql` again, then **Run**. Do not run a blank tab or an empty selection.
6. In **Authentication → Users**, click **Add user** and create your login email + password.
7. Restart `npm run dev` and sign in at `/admin/login`.

That’s it — no Docker, no command line except restarting the dev server.

---

## Option A — Local Supabase (developers / offline)

**Requires [Docker Desktop](https://docs.docker.com/desktop/)** running on your Mac.

1. From the project root:

   ```bash
   npm run supabase:start
   ```

   First run can take a few minutes (images + migrations).

2. Print API URL and keys:

   ```bash
   npm run supabase:status
   ```

3. Copy **API URL**, **anon key**, and **service_role key** into your `.env`:

   ```bash
   SUPABASE_URL=http://127.0.0.1:54321
   SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

   Keep `CRM_SHARED_PASSWORD` if you still want the shared password step before login.

4. Restart the site:

   ```bash
   npm run dev
   ```

5. **Create an admin user** (local Auth has no users by default):

   - Open Supabase Studio: **http://127.0.0.1:54323**
   - **Authentication → Users → Add user** (email + password)

6. Sign in at `http://localhost:4321/admin/login` with that email/password (and CRM password if set).

**Useful commands**

- `npm run supabase:stop` — stop containers  
- `npm run supabase:db-reset` — reset DB and re-run all files in `supabase/migrations/` (destructive)

## Option B — Hosted project on supabase.com

1. Create a project at [https://app.supabase.com](https://app.supabase.com).
2. **Settings → API Keys**: copy into `.env`:
   - **Project URL** (often under **Settings → General**, looks like `https://xxxxx.supabase.co`) → `SUPABASE_URL`
   - **Publishable** key (`sb_publishable_…`) → `SUPABASE_ANON_KEY` (same slot as the old “anon” key)
   - **Secret** key (`sb_secret_…`, click reveal/copy) → `SUPABASE_SERVICE_ROLE_KEY` (same slot as the old “service_role” key)  
   If you prefer, open the **Legacy anon, service_role** tab and paste those JWT keys into the same two variables instead — either style works with current Supabase clients.
3. **SQL Editor**: run `supabase/schema.sql`, or use the CLI:

   ```bash
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   npx supabase db push
   ```

4. **Authentication → Users**: invite or create users for `/admin/login`.
5. Redeploy or restart `npm run dev` so env vars load.

**Security:** Never commit `.env` or expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code.
