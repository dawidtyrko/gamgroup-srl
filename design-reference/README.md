# Handoff: GAM Group — Sito Aziendale (Home, single-page)

## Overview
A modern, minimalist marketing site for **GAM Group Srl** — an Italian IT consulting & system integration company (founded 2001, Treviso). This package covers the **Home**, built as one long scrolling single-page with anchor-based section navigation (Home · Chi Siamo · Servizi · Progetti · Job Board · Contattaci). All copy is in **Italian** and must stay in Italian.

The aesthetic is editorial/enterprise-SaaS: lots of white space, very large bold display type, hairline dividers, restrained "Apple-style" scroll reveals, one pinned horizontal gallery, animated stat counters, and a dark interactive map. Brand palette is teal + navy on white/light-grey.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing the intended look, motion, and behavior. They are **not production code to copy directly**.

The prototype is authored as a "Design Component" (`.dc.html`) — a proprietary single-file format that depends on the bundled `support.js` runtime (a small React-based template/logic engine). **Do not ship the `.dc.html` or `support.js`.** Instead, **recreate these designs in the target codebase's environment** using its established patterns and libraries. If there is no existing environment, the recommended stack is **Next.js (React) + plain CSS / CSS Modules** (or Tailwind if preferred). A standard React component tree with `IntersectionObserver`/scroll listeners and Leaflet for the map will reproduce everything here cleanly.

To preview the reference: open `GAM Group Site v2.dc.html` in a browser (it loads `support.js` from the same folder, plus Google Fonts and Leaflet from CDNs — needs internet).

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are all intended as shown. Recreate the UI pixel-faithfully using the codebase's libraries. The only placeholders are **photography** (see Assets) — every photo is a labelled striped placeholder to be swapped for real imagery.

---

## Global Layout & Shell

- **Max content width:** `1180px` (some hero/claim blocks use `1080px`), centered, with horizontal page padding of `6vw`.
- **Vertical section rhythm:** padding `clamp(90px, 12vw, 170px)` top/bottom for most sections.
- **Section background alternation** (top → bottom): white → dark hero-image band → white (claim) → light-grey `#F6F7F9` (Servizi) → white (Canali) → navy `#1B2A4A` (Numeri) → white (Chi Siamo) → very-dark `#101b30` (Progetti, pinned) → white (Clienti marquee) → light-grey `#F6F7F9` (Job Board) → navy `#1B2A4A` (Contatti) → `#101b30` (footer).
- **Scroll reveals:** elements tagged for reveal start at `opacity:0; translateY(34px)` and animate to `opacity:1; translateY(0)` as they enter the viewport (`gam-rise`, ~0.9s ease-out). In the prototype this uses CSS `animation-timeline: view()`; in React implement with `IntersectionObserver` (threshold ~0.15) toggling a class, with a small stagger where multiple items reveal together.

### Header (fixed, top)
- Fixed top, `z-index:1000`, full width, `display:flex; justify-content:space-between; align-items:center`.
- Padding transitions on scroll: `26px 6vw` at top → `16px 6vw` once scrolled past 60px.
- **Transparent at top**, then **frosted white** once scrolled: `background: rgba(255,255,255,.85)`, `backdrop-filter: saturate(180%) blur(16px)`, `box-shadow: 0 1px 0 rgba(27,42,74,.08)`. (Header text is navy in both states here since the hero is on a white background.)
- **Logo (left):** stacked. "GAM" in Space Grotesk 700, 26px, letter-spacing -0.01em, navy. Beneath it the tagline "It's my world" in Space Mono, 8.5px, letter-spacing 0.26em, uppercase, muted grey `#6B7686`.
- **Nav (right, desktop):** horizontal, gap 38px. Links: Home, Chi Siamo, Servizi, Progetti, Job Board — 15px/500, navy. Final item **Contattaci** is a pill button: navy bg, white text, `padding:11px 22px`, `border-radius:999px`; hover → teal bg, `translateY(-2px)`.
- **Active link:** the section currently in view is colored teal `#3CC8BD` (scroll-spy). The Contattaci pill is exempt.
- **Mobile (≤960px):** desktop nav hidden; show a 2-bar hamburger (navy bars). Tapping opens a **full-screen white overlay menu** (`z-index:1100`) with the logo, a close ✕, and large stacked links (Space Grotesk 30px/500, hairline dividers `rgba(27,42,74,.1)`); Contattaci link is teal. Selecting any item closes the menu and smooth-scrolls to the section.

### Smooth scrolling & scroll-spy
- All nav clicks `preventDefault` and smooth-scroll to the target section, offset by ~70px to clear the fixed header. Clicking a nav item also closes the mobile menu and any open modal.
- Scroll-spy: on scroll, determine the lowest section whose top is within ~40% of viewport height and mark its nav link active. Order checked bottom→top: contatti, jobboard, progetti, chisiamo, servizi, home.

---

## Screens / Views (sections, top to bottom)

### 1. Hero (`#top`)
- **Purpose:** Brand intro + primary CTAs.
- **Layout:** Full-viewport (`min-height:100vh`), centered column, text-align center, padding `150px 6vw 70px`, white background.
- **Components:**
  - Eyebrow (Space Mono 12px, letter-spacing 0.3em, uppercase, `#9aa4b2`): `Consulenza IT — System Integration — dal 2001`
  - H1 (Space Grotesk 700, `clamp(58px,10vw,164px)`, line-height 0.92, letter-spacing -0.035em, navy): two lines — `Benvenuti in` then `GAM` (the word "GAM" is teal `#3CC8BD`).
  - Subhead (Manrope 300, `clamp(17px,1.7vw,22px)`, line-height 1.62, `#6B7686`, max-width 540px): `Evolviamo e ottimizziamo i processi aziendali dei nostri clienti, dalla consulenza ai sistemi.`
  - CTA row (gap 16px): **Scopri i servizi** (navy pill, white text, `16px 34px`, hover teal + lift) → scrolls to Servizi; **Contattaci** (transparent, 1.5px border `#d3dae4`, navy text, hover border+text teal) → scrolls to Contatti.
  - Scroll cue, absolute bottom 16px center: "SCORRI" (Space Mono 10px, letter-spacing 0.24em, `#9aa4b2`) above a 1px×42px vertical line gradient that bobs (`gam-cue`, 1.8s infinite).

### 2. Hero image band
- **Purpose:** Full-bleed brand photo with subtle parallax.
- **Layout:** Full-width strip, height `clamp(360px,52vw,640px)`, `overflow:hidden`, dark navy bg `#101b30`.
- **Behavior:** Inner image layer is oversized (`inset:-12% 0`) and translates vertically at ~0.12× scroll for parallax.
- **Placeholder:** diagonal teal pinstripe + navy gradient, centered mono label `[ team gam — foto a tutta larghezza ]`. **Replace with a real wide team/office photo** (apply a navy overlay so foreground text/logo would remain legible if any is placed over it).

### 3. Claim
- **Purpose:** One-line value statement.
- **Layout:** White, `padding clamp(110px,15vw,220px) 6vw`, inner max-width 1080px.
- **Components:** Large statement (Space Grotesk 500, `clamp(30px,4.6vw,62px)`, line-height 1.16): `Portiamo il tuo business` (in muted `#9aa4b2`) + ` al livello successivo.` (navy). Below, a Manrope 300 paragraph (`clamp(17px,1.6vw,21px)`, `#6B7686`, max-width 680px): `Innovare i sistemi IT riduce i costi, aumenta la flessibilità e migliora la qualità dei servizi.`

### 4. I nostri servizi (`#servizi`)
- **Purpose:** The four service pillars as a numbered editorial list.
- **Layout:** Light-grey `#F6F7F9`. Header row: mono index `01 — 04` (teal) + H2 `I nostri servizi` (Space Grotesk 700, `clamp(30px,4.4vw,58px)`). Below, a list with a top hairline; each row a 3-col grid `64px minmax(220px,1fr) 1.2fr`, gap 28px, vertical-centered, padding `clamp(28px,3.4vw,46px) 0`, bottom hairline `rgba(27,42,74,.12)`. Hover: row shifts right (`padding-left:14px`, 0.4s).
- **Per row:** mono number (teal 14px) · title (Space Grotesk 500, `clamp(22px,2.4vw,34px)`, navy) · tag chips (wrap, gap 8px; each chip Space Mono 11px, `#56627a`, 1px border `rgba(27,42,74,.16)`, `border-radius:999px`, `padding:6px 13px`).
- **Mobile (≤960px):** grid collapses to `auto 1fr` (number + title) and tags drop to a full-width third row.
- **Content (title → tags):**
  1. **Consulenza Tecnica ERP** — JDE, SAP, IBM i-Series, Infor, Oracle Cloud, NetSuite, BI, Zucchetti, CyberPlan
  2. **Consulenza Applicativa, AI & BI** — Project Management, Lean Management, AI, Business Intelligence, AI Agents / Copilots
  3. **Sviluppo & System Integration** — Application Maintenance, Sviluppo SW, Integrazione & Migrazione
  4. **Assistenza & Manutenzione** — Attività PdL, Reti & Infrastruttura, HD1 & HD2, Sicurezza, HW–SW, Hosting

### 5. I nostri canali (Tecnologie)
- **Purpose:** Four technology channels with their products.
- **Layout:** White. Header: mono `Tecnologie` (teal) + H2 `I nostri canali`. A 4-col grid with hairline borders (top+left on container, right+bottom on each cell — i.e. a single-pixel grid). Each cell `min-height:260px`, padding `clamp(26px,2.4vw,40px)`, hover bg `#F6F7F9`.
- **Per cell:** channel name (Space Grotesk 700, `clamp(22px,1.9vw,28px)`, navy), a 26×3px teal underline, then a list of products (Space Mono 12px, `#6B7686`, gap 9px).
- **Mobile:** 4 → 2 cols (≤960px) → 1 col (≤600px).
- **Content:**
  - **MS 365:** MS365 Suite, Power Automate, Power Apps, SharePoint, Dynamics 365, Power BI, Copilot 365, Copilot Studio, Azure AI, AI Hub
  - **SAP:** SAP ECC, SAP S/4HANA, Business ByDesign, SAP B.One
  - **IBM i-Series:** SIGIP, ACG, STEALTH, SMEUP, GALILEO, GEA
  - **Infor:** BAAN, LN, M3, CloudSuite

### 6. I numeri sono il nostro forte (stats)
- **Purpose:** Animated credibility counters.
- **Layout:** Navy `#1B2A4A`. Centered mono eyebrow `I numeri sono il nostro forte` (teal). 4-col grid, each cell centered with right hairline `rgba(255,255,255,.12)`.
- **Per stat:** big number (Space Grotesk 700, `clamp(50px,7vw,104px)`, white) with a `+` suffix; label below (Manrope 300, `clamp(14px,1.3vw,18px)`, `rgba(255,255,255,.6)`).
- **Counter animation:** when the section enters viewport (~78% vh), count each number from 0 to target over ~1.7s with cubic ease-out. Run **once**.
- **Content:** `20+ Anni di esperienza` · `50+ Esperti qualificati` · `130+ Clienti soddisfatti` · `15+ Partner`.
- **Mobile:** collapses to 2 columns.

### 7. Chi Siamo (`#chisiamo`)
- **Purpose:** Company intro + sectors.
- **Layout:** White, 2-col grid `1fr 1fr`, gap `clamp(40px,6vw,96px)`, items start-aligned.
- **Left column (sticky, `top:120px`):** mono `Chi siamo` (teal) · H2 `Il partner di cui ti puoi fidare.` (Space Grotesk 700, `clamp(34px,4.6vw,68px)`, line-height 1.02, letter-spacing -0.025em, navy) · button **Parla con noi →** (transparent, border `#d3dae4`, hover teal) → scrolls to Contatti.
- **Right column:** paragraph (Manrope 300, `clamp(17px,1.7vw,22px)`, line-height 1.7, `#475569`; "2001" and "Treviso" bolded navy): `GAM Group è un'azienda italiana fondata nel 2001, con sede a Treviso. Da oltre vent'anni affianchiamo le imprese nell'evoluzione e nella gestione dei loro sistemi IT.` Then a `Settori` block (top hairline; mono label `#9aa4b2`) with pill chips (Space Grotesk 500, `clamp(15px,1.4vw,19px)`, navy, 1px border `rgba(27,42,74,.16)`, `border-radius:999px`, `padding:9px 18px`): **Retail · Food · Automotive · Fashion · Aerospace · … and many more**.
- **Mobile (≤960px):** single column; left column un-sticks.

### 8. I progetti (`#progetti`) — pinned horizontal gallery
- **Purpose:** Case studies, presented as an Apple-style pinned horizontal scroll.
- **Layout:** Very-dark `#101b30`. Outer wrapper is tall (`height:340vh`) to provide scroll distance. Inside, a **sticky** inner (`position:sticky; top:0; height:100vh; overflow:hidden`) holds: a header (mono `Case studies` teal + H2 `I progetti` white), the horizontal **track**, and a mono hint `Scorri per esplorare →`.
- **Pin mechanic:** as the page scrolls through the 340vh wrapper, compute progress 0→1 from the wrapper's position; translate the track horizontally `translateX(-progress × overflow)` where `overflow = track.scrollWidth − viewportWidth + 0.12×viewportWidth`. (In React: scroll listener or `requestAnimationFrame` reading `getBoundingClientRect`.)
- **Cards (4):** each `flex:none; width:min(78vw,460px)`, bg `#16233f`, 1px border `rgba(255,255,255,.08)`, `border-radius:22px`. Top media area `clamp(200px,30vh,300px)` (striped/gradient placeholder, replace with sector photo) with an absolute sector pill (top-left, mono 11px, teal text, teal border). Body: title (Space Grotesk 500, `clamp(20px,1.8vw,26px)`, white) + mono `Leggi il case study →` (teal). Whole card is clickable (cursor pointer; hover lifts `translateY(-6px)` and border → teal). A trailing non-card label closes the row: `E molti altri progetti, in ogni settore.` (Space Grotesk 500, `rgba(255,255,255,.4)`).
- **IMPORTANT CSS note:** the page's root wrapper uses `overflow-x: clip` (NOT `overflow-x: hidden`). `hidden` forces `overflow-y:auto`, creating a scroll container that **breaks `position:sticky`**. Use `clip` (or nothing) so sticky works.
- **Clicking a card opens the Case Study modal** (see Interactions).

### 9. Alcuni dei nostri clienti (marquee)
- **Purpose:** Client logos as a continuous marquee.
- **Layout:** White, `padding clamp(70px,9vw,120px) 0`, `overflow:hidden`. Centered mono eyebrow `Alcuni dei nostri clienti` (`#9aa4b2`).
- **Marquee:** a flex row duplicated twice, `width:max-content`, `animation: gam-marq 28s linear infinite` (translateX 0 → -50%). Each name Space Grotesk 700, `clamp(26px,3.2vw,44px)`, `#c2c9d3`, nowrap, gap 88px.
- **Content (placeholder wordmarks; swap for real logos):** Maserati · Miele · CNH Industrial · Geox · Safilo.

### 10. Job Board (`#jobboard`)
- **Purpose:** Open roles + spontaneous application.
- **Layout:** Light-grey `#F6F7F9`. Header: mono `Lavora con noi` (teal) + H2 `Entra in GAM`. Lead (Manrope 300, `clamp(17px,1.6vw,21px)`, `#6B7686`, max-width 560px): `Unisciti a un team di esperti IT. Le posizioni aperte, in continua crescita.` Then a list with top hairline.
- **Per job row:** `display:flex; justify-content:space-between; align-items:center; gap:32px`, padding `clamp(26px,3vw,40px) 0`, bottom hairline; hover shifts right (`padding-left:14px`). Left: title (Space Grotesk 500, `clamp(22px,2.4vw,32px)`, navy) · a meta line `Sede · Tipo` (Space Mono 12px, `#6B7686`, separated by a 3px dot) · requirement chips (Space Mono 11px, bordered pills). Right: **Candidati ora →** button (navy pill, white, hover teal+lift) — an `<a href="mailto:recruitment@gamgroup.it?subject=Candidatura: <title>">`.
- **Mobile (≤960px):** row becomes a column, left-aligned, gap 20px (button drops below).
- **Roles (all Sede Treviso, Tempo indeterminato):**
  1. **Consulente SAP S/4HANA** — SAP S/4HANA, FI/CO o MM/SD, 3+ anni
  2. **Service Manager AMS** — ITIL, Gestione team, AMS
  3. **Analista SAP Tecnico-Funzionale** — ABAP, Moduli SAP, Analisi funzionale
  4. **IT Specialist** — Sistemistica, Reti, Help Desk
  5. **Senior IT Consultant** — ERP, Project Management, 5+ anni
- **Footer line:** `Candidatura spontanea — invia il CV a recruitment@gamgroup.it` (the email is a mailto link, underlined teal).

### 11. Contattaci (`#contatti`)
- **Purpose:** Contact details, form, and office map.
- **Layout:** Navy `#1B2A4A`, white text. 2-col grid `1.05fr 1fr`, gap `clamp(44px,7vw,110px)`, then a **full-width** map row spanning both columns (`grid-column:1 / -1`).
- **Left column:** mono `Contatti` (teal) · H2 `Scopriamo insieme cosa possiamo fare.` (Space Grotesk 700, `clamp(34px,4.8vw,66px)`, max-width 15ch) · contact list (Manrope 300, 18px): address `Via Callalta 31/E – 31100 Treviso` (muted white), `info@gamgroup.it` (teal, mailto, hover white), `+39 0422 583693` (teal, tel, hover white).
- **Right column — form:** vertical, gap 30px. Fields are underline-only inputs (transparent, no box; bottom border `rgba(255,255,255,.25)`; white text; focus → teal underline). Mono uppercase labels (`rgba(255,255,255,.6)`). Row of **Nome / Cognome** (2-col, collapses to 1 on ≤960px), then **Email**, then **Messaggio** (textarea, 3 rows, placeholder `Scrivi qui il tuo messaggio`). Submit **Invia** (teal pill, dark-teal text `#06231f`, 700, hover white+lift). On submit: `preventDefault`, swap the form for a success card (teal-tinted border/bg, ✓, `Grazie!` heading, message `Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.`). No backend — wire to real endpoint in production.
- **Map row (full width):** see Interactions → Map. A floating white address card overlays the map bottom-left.

### Footer
- Dark `#101b30`, `padding:34px 6vw`, flex space-between, wrap. Left: stacked GAM logo + teal "It's my world" tagline. Right: `© 2026 GAM Group Srl — Via Callalta 31/E, 31100 Treviso (TV)` (Manrope 300, 13px, `rgba(255,255,255,.55)`).

---

## Interactions & Behavior

- **Scroll reveals (`gam-rise`):** opacity 0→1, translateY 34px→0, ~0.9s `cubic-bezier(.16,.84,.44,1)`, triggered on viewport entry; honor `prefers-reduced-motion`.
- **Header:** transparent→frosted-white past 60px scroll; padding shrinks; scroll-spy active link in teal.
- **Hero parallax:** image band inner layer translateY at ~0.12× scroll offset.
- **Stat counters:** count up once on entry, ~1.7s cubic ease-out.
- **Pinned Projects:** sticky inner pinned for 340vh; track translates horizontally with scroll progress (clamped 0–1). Remember `overflow-x: clip` on the root.
- **Case Study modal:** opens on card click. Fixed overlay `z-index:1200`, `rgba(16,27,48,.62)` + `backdrop-filter: blur(8px)`; click backdrop or ✕ to close; inner panel `stopPropagation`. Panel: white, `border-radius:24px`, `max-width:720px`, `max-height:88vh`, `overflow:auto`. Top banner (gradient/striped, height `clamp(160px,22vw,220px)`) with sector pill + round ✕ (top-right). Body padding `clamp(28px,4vw,48px)`: title (Space Grotesk 700, `clamp(24px,3vw,38px)`), then three blocks each with a mono teal label — **La sfida**, **Il progetto**, **Benefici** (the last as a 2-col list with teal ✓ marks) — then a navy CTA **Parla con noi del tuo progetto →** that closes the modal and scrolls to Contatti. Navigating anywhere closes the modal.
- **Mobile menu:** full-screen overlay, opens/closes via hamburger/✕; links smooth-scroll and close.
- **Map:** Leaflet, dark CARTO tiles, custom teal pulsing pin, `scrollWheelZoom:false` so the page keeps scrolling; zoom buttons present. Floating white address card sits above the map (see Map note for z-index).
- **Forms/links:** form is client-side only (success state); job "Candidati ora" and the spontaneous line are `mailto:` to `recruitment@gamgroup.it`; contact email/phone are `mailto:`/`tel:`; map "Ottieni indicazioni" opens Google Maps directions to the coordinates.

## State Management
- `activeSection` (string) — for scroll-spy nav highlight.
- `headerSolid` (bool) — frosted vs transparent header.
- `countersDone` (bool) — stat counters run once.
- `menuOpen` (bool) — mobile menu overlay.
- `formSent` (bool) — contact form success swap.
- `projectIndex` (number | null) — which case study modal is open (`null` = closed). `projectOpen = projectIndex != null`.
- Scroll progress for the pinned gallery is derived per-frame from layout, not stored.

## Design Tokens

**Colors**
- Navy (primary text / dark sections): `#1B2A4A`
- Deepest navy (image bands, projects, footer): `#101b30` (and `#16233f`, `#22325a` for project card gradients; map bg `#0f1828`)
- Teal (accent): `#3CC8BD` (dark-teal text on teal buttons: `#06231f`)
- Light section bg: `#F6F7F9`
- Body text grey: `#6B7686`; secondary paragraph grey: `#475569`; muted/eyebrow grey: `#9aa4b2`; marquee grey `#c2c9d3`
- Hairlines: `rgba(27,42,74,.12)` on light, `rgba(255,255,255,.12)` on dark
- Borders (buttons/chips): `#d3dae4`, `rgba(27,42,74,.16)`
- White: `#FFFFFF`

**Typography**
- Display/headings & logo: **Space Grotesk** (500, 700)
- Body/paragraphs: **Manrope** (300, 400, 500, 600)
- Labels/eyebrows/meta/tags: **Space Mono** (400), uppercase, wide letter-spacing (0.12–0.3em)
- Heading sizes use `clamp()` (see each section). Display line-heights 0.92–1.16; tight letter-spacing -0.015 to -0.035em on large headings.

**Radius**
- Pills/buttons/chips: `999px`
- Cards: `18–24px` (service/job rows are borderless hairline lists)

**Shadows**
- Header (solid): `0 1px 0 rgba(27,42,74,.08)`
- Floating map card: `0 20px 50px rgba(6,12,24,.4)`
- Modal panel: `0 40px 100px rgba(16,27,48,.45)`

**Spacing**
- Page gutter `6vw`; section padding `clamp(90px,12vw,170px)`; content max-width `1180px` (hero/claim `1080px`).

**Keyframes**
- `gam-rise` (reveal), `gam-cue` (scroll cue bob), `gam-marq` (client marquee), `gam-ping` (map pin pulse).

## Map (implementation detail)
- Library: **Leaflet 1.9.4**. Tiles: CARTO **dark_all** (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`, subdomains `abcd`, attribution "© OpenStreetMap © CARTO"). No API key required.
- **Office coordinates:** `lat 45.66099553158068, lng 12.276944105971117`, zoom 14.
- Options: `zoomControl:true`, `scrollWheelZoom:false`, `attributionControl:true`. Call `invalidateSize()` after mount.
- **Custom marker:** `L.divIcon` (28×28, anchor 14,14) — a 12px teal `#3CC8BD` dot with a 2px white ring + drop shadow, plus an expanding teal ring behind it (`gam-ping`, 2s infinite).
- **Floating address card** (overlay, white, `border-radius:18px`, padding `24px 26px`, `max-width:300px`): mono teal `La nostra sede`, `GAM Group Srl` (Space Grotesk 700, 18px), address `Via Callalta 31/E / 31100 Treviso (TV)`, and an underlined-teal link **Ottieni indicazioni →** → `https://www.google.com/maps/dir/?api=1&destination=45.66099553158068,12.276944105971117`.
- **CRITICAL z-index/stacking fix:** Leaflet's `.leaflet-container` is `position:relative; z-index:auto`, so it does NOT create its own stacking context and its internal panes (z-index 400–700) leak out and cover sibling overlays. Set `isolation:isolate` on the map container element AND give the floating card `z-index:1000`. Without this, the address card disappears behind the tiles.
- Leaflet's default marker PNGs 404 in some setups — using `divIcon` (as here) avoids that entirely.

## Assets
- **Photography:** none included — every photo is a labelled striped placeholder. Needed: a wide hero/team-or-office shot (hero band), four service/project imagery options for the case-study card banners, and optionally per-service imagery. Apply a navy overlay on hero imagery for legibility.
- **Client logos:** currently text wordmarks (Maserati, Miele, CNH Industrial, Geox, Safilo). Replace with real logo files if licensing allows.
- **Logo:** "GAM" wordmark is recreated in Space Grotesk + a Space Mono tagline — no raster logo asset is bundled. Swap in the official GAM logo (light version for dark backgrounds) when available.
- **Fonts:** Space Grotesk, Manrope, Space Mono via Google Fonts. Self-host in production if preferred.
- **Map tiles:** CARTO/OSM (attribution required, already wired).

## Files
- `GAM Group Site v2.dc.html` — the full design prototype (markup at top in `<x-dc>`, logic class in the `<script data-dc-script>` at the bottom). **Read both** — the logic class contains all the data arrays (services, channels, stats, sectors, projects with case-study content, jobs, clients) and the scroll/counter/map/modal behavior. This is your source of truth for exact copy and values.
- `support.js` — the prototype runtime (reference only; do not port). It's only here so the `.dc.html` opens in a browser for preview.

## Notes for the implementer
- **Keep all copy in Italian**, exactly as written.
- Reproduce the three-typeface system and the hairline/whitespace-driven minimalism — it's central to the look.
- The single biggest gotchas are documented above: **`overflow-x: clip`** (not hidden) for the sticky projects pin, and **`isolation: isolate` + high card z-index** for the Leaflet overlay.
- Respect `prefers-reduced-motion`: disable reveals/parallax/counters/marquee for users who opt out.
- A v1 design also exists in the project (`GAM Group Site.dc.html`) — a more conventional card-based layout. **v2 (this file) is the approved direction.**
