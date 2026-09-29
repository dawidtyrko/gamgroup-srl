# GAM Group — Sito Aziendale

Multi-page Next.js 14 site (App Router, TypeScript), Italian + English.
Design direction **"H · Percorso"**, approved 28/09/2026: white, cobalt `#2D4BF0`,
coral `#FF7A59`, Inter; the GAM wordmark (Zilla Slab, scanline effect) keeps its
original teal `#35707E`.

## Pages
| Italiano | English |
| --- | --- |
| `/` | `/en` |
| `/chi-siamo` | `/en/about` |
| `/servizi/consulenza-erp`, `/servizi/ai-bi`, `/servizi/sviluppo-integrazione`, `/servizi/assistenza` | `/en/services/erp-consulting`, `/en/services/ai-bi`, `/en/services/development-integration`, `/en/services/support` |
| `/clienti` | `/en/clients` |
| `/lavora-con-noi` | `/en/job-board` |
| `/contatti` | `/en/contact` |
| `/privacy` | `/en/privacy` |

`/servizi` and `/en/services` redirect to the first service. `/admin-cms` is the hidden editor for open positions.

## Where things live
- **Texts** — `lib/i18n/it.ts` and `lib/i18n/en.ts` (same shape, enforced by `lib/i18n/types.ts`).
- **URLs** — `lib/routes.ts`: one key per page, mapped to its IT/EN path. The language switch, sitemap and hreflang all use it.
- **Logos & photos** — `lib/siteData.ts` (`public/clients`, `public/partners`, `public/azienda`).
- **Page layouts** — `components/site/pages.tsx`; shared blocks in `components/site/ui.tsx`; header/footer, contact form and jobs list next to them.
- **Styles** — `app/globals.css` (desktop, tablet ≤900px, phone ≤640px).

## Open positions (Job Board)
Stored in Vercel KV (`lib/jobs.ts`), managed at `/admin-cms` (password `ADMIN_CMS_PASSWORD`).
The job pages are cached (`revalidate = 60`) and every admin change calls
`revalidatePath()` on `/lavora-con-noi` and `/en/job-board`, so updates appear at once.
Without KV credentials the site still runs with the default positions.

## Contact form
`/api/contact` sends mail through Resend (`RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`).
Without the key the form shows "Invio non riuscito" — expected in local dev.

## Language routing
`middleware.ts` redirects the Italian home to `/en` for visitors outside Italy,
unless they picked a language (cookie `gam_locale`, set by the header switch).

## Local development
```bash
npm install
cp .env.example .env.local   # KV + ADMIN_CMS_PASSWORD + RESEND_API_KEY
npm run dev
```
Type check: `node node_modules/typescript/bin/tsc --noEmit`.

## Environment variables
| Variable | Purpose |
| --- | --- |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Vercel KV (auto-injected on Vercel) |
| `ADMIN_CMS_PASSWORD` | Protects `/admin-cms` and the `/api/jobs` write routes |
| `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` | Contact form e-mail |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL for metadata and sitemap |
