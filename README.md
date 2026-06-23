# GAM Group — Sito Aziendale

Next.js (App Router) recreation of the GAM Group single-page marketing site, with
an automatic, code-free Case Study CMS backed by **Vercel KV (Redis)**.

The original design handoff (prototype `.dc.html`, `support.js`, and the spec
`README.md`) lives in [`design-reference/`](./design-reference) and is **not**
shipped — it is the source of truth for copy, colours, and behaviour.

## Stack
- **Next.js 14** (App Router, TypeScript), plain CSS + inline styles (pixel-faithful to the prototype)
- **Vercel KV** for case studies (`@vercel/kv`)
- **Leaflet 1.9.4** for the office map (CARTO dark tiles, no API key)

## Case Study CMS (automatic, no code edits after deploy)
1. **Data** — projects live in a Redis LIST `gam:projects` (one Project per element). See `lib/projects.ts`. Fields map to the modal blocks: `challenge` → *La sfida*, `description` → *Il progetto*, `benefits[]` → *Benefici*. An empty store is auto-seeded with the four reference case studies.
2. **Admin** — `/admin-cms` is a hidden (noindex), password-protected form that POSTs to `/api/projects`. The password is the `ADMIN_CMS_PASSWORD` env var.
3. **ISR** — `app/page.tsx` is statically cached with `revalidate = 60`. Adding a project calls `revalidatePath("/")`, so new case studies appear immediately without a redeploy, while visitors keep getting a flash-fast cached page.

## Key design guarantees (per the handoff)
- Root wrapper uses **`overflow-x: clip`** (not `hidden`) so the pinned horizontal Projects gallery's `position: sticky` works.
- Case studies open in a **modal** (`z-index: 1200`, backdrop blur).
- Leaflet map uses **dynamic import** (`ssr: false`), **`isolation: isolate`** on the map container, and **`z-index: 1000`** on the floating address card.

## Local development
```bash
npm install
cp .env.example .env.local   # fill in KV + ADMIN_CMS_PASSWORD
npm run dev
```
Without KV credentials the site still runs and renders the four default case
studies (KV writes are disabled until configured).

## Deploy to Vercel
1. Push the repo and import it into Vercel.
2. **Storage → Create → KV** and connect it to the project (injects `KV_REST_API_URL` / `KV_REST_API_TOKEN`).
3. Add **`ADMIN_CMS_PASSWORD`** in Project → Settings → Environment Variables.
4. Deploy. Manage case studies at `https://<domain>/admin-cms`.

## Environment variables
| Variable | Purpose |
| --- | --- |
| `KV_REST_API_URL` | Vercel KV REST endpoint (auto-injected) |
| `KV_REST_API_TOKEN` | Vercel KV REST token (auto-injected) |
| `ADMIN_CMS_PASSWORD` | Password protecting `/admin-cms` and `POST /api/projects` |
