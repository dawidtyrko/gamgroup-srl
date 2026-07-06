"use client";

import {
  CSSProperties,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import type { Project } from "@/lib/projects";
import { faqs } from "@/lib/faqs";

// Leaflet touches window/document at import → load client-only.
const GamMap = dynamic(() => import("@/components/GamMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        gridColumn: "1 / -1",
        marginTop: "clamp(48px,6vw,84px)",
        height: "clamp(340px,40vw,500px)",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,.12)",
        background: "#e7ecf2",
      }}
    />
  ),
});

/* ---- tokens (palette per visual spec §2 — sampled from the logo) ---- */
const INK = "#1E333B"; // main text
const NAVY = "#1B2A4A"; // dark section backgrounds (v2 design — pending decision)
const TEAL = "#4D93A2"; // brand teal: icons, fills, lines, large accents
const TEALD = "#35707E"; // dark teal: coloured text + primary buttons (readable on white)
const TEALLT = "#79B7C4"; // teal tint: readable text accents on dark sections
const GREY = "#536F83"; // secondary text
const MUT = "#9aa4b2"; // muted eyebrow grey
const S2 = "#536F83"; // paragraph grey
const LIGHT = "#F1F5F6"; // warm white section background
const LINE = "#DDE6E8"; // soft borders / dividers
const MONO = "'Space Mono', monospace";
const GRO = "'Space Grotesk', sans-serif";

const eyebrow = (color = TEALD): CSSProperties => ({
  fontFamily: MONO,
  fontSize: 12,
  letterSpacing: ".26em",
  textTransform: "uppercase",
  color,
});

const h2: CSSProperties = {
  margin: 0,
  fontFamily: GRO,
  fontWeight: 700,
  fontSize: "clamp(30px,4.4vw,58px)",
  letterSpacing: "-.02em",
};

/* ---- static content (from the design source of truth) ---- */
const services = [
  {
    num: "01",
    title: "Consulenza Tecnica ERP",
    tags: ["JDE", "SAP", "IBM i-Series", "Infor", "Oracle Cloud", "NetSuite", "BI", "Zucchetti", "CyberPlan"],
  },
  {
    num: "02",
    title: "Consulenza Applicativa, AI & BI",
    tags: ["Project Management", "Lean Management", "AI", "Business Intelligence", "AI Agents / Copilots"],
  },
  {
    num: "03",
    title: "Sviluppo & System Integration",
    tags: ["Application Maintenance", "Sviluppo SW", "Integrazione & Migrazione"],
  },
  {
    num: "04",
    title: "Assistenza & Manutenzione",
    tags: ["Attività PdL", "Reti & Infrastruttura", "HD1 & HD2", "Sicurezza", "HW–SW", "Hosting"],
  },
];

const channels = [
  {
    name: "MS 365",
    items: ["MS365 Suite", "Power Automate", "Power Apps", "SharePoint", "Dynamics 365", "Power BI", "Copilot 365", "Copilot Studio", "Azure AI", "AI Hub"],
  },
  { name: "SAP", items: ["SAP ECC", "SAP S/4HANA", "Business ByDesign", "SAP B.One"] },
  { name: "IBM i-Series", items: ["SIGIP", "ACG", "STEALTH", "SMEUP", "GALILEO", "GEA"] },
  // NOTE: per new spec the 4th channel is Business Intelligence (was Infor).
  // Items are placeholders — confirm the exact list with the team.
  { name: "Business Intelligence", items: ["Power BI", "Dashboard & Reporting", "Analisi dati", "Data Integration"] },
];

const stats = [
  { value: 20, label: "Anni di esperienza" },
  { value: 50, label: "Esperti qualificati" },
  { value: 130, label: "Clienti soddisfatti" },
  { value: 15, label: "Partner" },
];

const sectors = ["Retail", "Food", "Automotive", "Fashion", "Aerospace", "… and many more"];
// Client names/logos may only appear once the release clause is in the contracts
// (see website spec §7). Until then the marquee shows technology partners.
const partners = ["Rivelio", "Microsoft Partner", "ProcederAI", "Claude", "AWS"];

const jobs = [
  { title: "Consulente SAP S/4HANA", sede: "Treviso", type: "Tempo indeterminato", tags: ["SAP S/4HANA", "FI/CO o MM/SD", "3+ anni"] },
  { title: "Service Manager AMS", sede: "Treviso", type: "Tempo indeterminato", tags: ["ITIL", "Gestione team", "AMS"] },
  { title: "Analista SAP Tecnico-Funzionale", sede: "Treviso", type: "Tempo indeterminato", tags: ["ABAP", "Moduli SAP", "Analisi funzionale"] },
  { title: "IT Specialist", sede: "Treviso", type: "Tempo indeterminato", tags: ["Sistemistica", "Reti", "Help Desk"] },
  { title: "Senior IT Consultant", sede: "Treviso", type: "Tempo indeterminato", tags: ["ERP", "Project Management", "5+ anni"] },
];

const cardBanner: CSSProperties = {
  background:
    "repeating-linear-gradient(135deg,rgba(121,183,196,.12) 0 16px,rgba(255,255,255,0) 16px 32px),linear-gradient(125deg,#22325a,#16233f)",
};

export default function Site({ projects }: { projects: Project[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  // True once /photos/hero.jpg exists and loads — swaps the striped placeholder
  // for the real photo without any code change (just drop the file in).
  const [hasHeroPhoto, setHasHeroPhoto] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [projectIndex, setProjectIndex] = useState<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const pinWrap = useRef<HTMLDivElement>(null);
  const pinTrack = useRef<HTMLDivElement>(null);

  /* ---- reveal on viewport entry (README: IntersectionObserver, one-shot) ---- */
  useEffect(() => {
    // Opt-in class: without JS (or before hydration) nothing is hidden.
    document.documentElement.classList.add("js-reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("gam-risen");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-rise]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ---- scroll-driven behaviour (ported from the prototype rAF loop) ---- */
  useEffect(() => {
    let raf = 0;
    let solid: boolean | null = null;
    let curNav: string | null = null;
    let countersDone = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lock viewport-derived heights to PIXELS at mount. Recording analysis
    // showed the 340×viewport pin wrapper still resizing on iOS when the
    // browser toolbars collapse (content below shifted by ~3.4× the bar
    // height mid-scroll). px values are immune to vh/svh unit quirks; they
    // refresh ONLY on width/orientation change, never on height-only changes
    // (= toolbar show/hide).
    let baseVh = window.innerHeight;
    let baseW = window.innerWidth;
    const lockHeights = () => {
      const pw = pinWrap.current;
      if (pw) {
        pw.style.height = `${Math.round(baseVh * 3.4)}px`;
        const screen = pw.firstElementChild as HTMLElement | null;
        if (screen) screen.style.height = `${baseVh}px`;
      }
      const hero = document.getElementById("top");
      if (hero) hero.style.minHeight = `${baseVh}px`;
    };
    lockHeights();
    const onResize = () => {
      if (window.innerWidth !== baseW) {
        baseW = window.innerWidth;
        baseVh = window.innerHeight;
        lockHeights();
      }
    };
    window.addEventListener("resize", onResize);

    const runCounters = () => {
      const sec = statsRef.current;
      if (!sec) return;
      sec.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseInt(el.getAttribute("data-count") || "0", 10) || 0;
        const suffix = el.getAttribute("data-suffix") || "";
        if (reduceMotion) {
          el.textContent = target + suffix;
          return;
        }
        const dur = 1700;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };

    const setActiveNav = (key: string) => {
      const nav = navRef.current;
      if (!nav) return;
      nav.querySelectorAll<HTMLElement>("[data-nav]").forEach((a) => {
        if (a.getAttribute("data-nav") === "contatti") return;
        a.style.color = a.getAttribute("data-nav") === key ? TEALD : INK;
      });
    };

    const measure = () => {
      const root = rootRef.current;
      if (!root) return;
      const vh = window.innerHeight || 700;
      const scrolled = -root.getBoundingClientRect().top;

      // Hero parallax (skipped for reduced motion)
      const m = heroMediaRef.current;
      if (m && m.parentElement && !reduceMotion) {
        const r = m.parentElement.getBoundingClientRect();
        const off = (r.top + r.height / 2 - vh / 2) * -0.12;
        m.style.transform = `translateY(${off}px)`;
      }

      // Frosted header past 60px
      const h = headerRef.current;
      if (h) {
        const isSolid = scrolled > 60;
        if (isSolid !== solid) {
          solid = isSolid;
          h.style.background = isSolid ? "rgba(255,255,255,.85)" : "transparent";
          h.style.backdropFilter = isSolid ? "saturate(180%) blur(16px)" : "none";
          (h.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter =
            isSolid ? "saturate(180%) blur(16px)" : "none";
          h.style.boxShadow = isSolid ? "0 1px 0 rgba(27,42,74,.08)" : "none";
          h.style.padding = isSolid ? "16px 6vw" : "26px 6vw";
        }
      }

      // Pinned horizontal gallery (baseVh: keeps progress stable while the
      // mobile toolbar collapses and innerHeight changes mid-scroll)
      const pw = pinWrap.current;
      const pt = pinTrack.current;
      if (pw && pt) {
        const total = pw.offsetHeight - baseVh;
        let prog = total > 0 ? -pw.getBoundingClientRect().top / total : 0;
        prog = Math.max(0, Math.min(1, prog));
        const overflow = Math.max(0, pt.scrollWidth - window.innerWidth + window.innerWidth * 0.12);
        pt.style.transform = `translateX(${-prog * overflow}px)`;
      }

      // Scroll-spy (checked bottom → top)
      const order: [string, string][] = [
        ["contatti", "contatti"],
        ["jobboard", "jobboard"],
        ["progetti", "progetti"],
        ["chisiamo", "chisiamo"],
        ["servizi", "servizi"],
        ["home", "top"],
      ];
      let cur = "home";
      for (const [key, id] of order) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= vh * 0.4) {
          cur = key;
          break;
        }
      }
      if (cur !== curNav) {
        curNav = cur;
        setActiveNav(cur);
      }

      // Counters once, on entry
      if (!countersDone && statsRef.current) {
        if (statsRef.current.getBoundingClientRect().top < vh * 0.78) {
          countersDone = true;
          runCounters();
        }
      }
    };

    const tick = () => {
      try {
        measure();
      } catch {
        /* noop */
      }
      raf = requestAnimationFrame(tick);
    };

    const safety = setTimeout(() => {
      if (!countersDone) {
        countersDone = true;
        runCounters();
      }
    }, 3200);

    tick();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ---- navigation ---- */
  const goto = (id: string) => {
    setMenuOpen(false);
    setServicesOpen(false);
    setProjectIndex(null);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const nav = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    goto(id);
  };

  const activeProject = projectIndex != null ? projects[projectIndex] : null;

  // Featured case study (Reply-style hero case): first flagged, else the first one.
  const featuredIdx = Math.max(0, projects.findIndex((p) => p.featured));
  const featured = projects[featuredIdx] ?? null;

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      nome: fd.get("nome"),
      cognome: fd.get("cognome"),
      email: fd.get("email"),
      azienda: fd.get("azienda"),
      messaggio: fd.get("messaggio"),
      privacy: fd.get("privacy") === "on",
    };
    setSending(true);
    setFormErr(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormErr(data.error || "Invio non riuscito.");
        return;
      }
      setFormSent(true);
    } catch {
      setFormErr("Rete non raggiungibile. Riprova.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div ref={rootRef} style={{ overflowX: "clip" }}>
      {/* ---- Header ---- */}
      <header
        ref={headerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          padding: "26px 6vw",
          transition: "background .5s ease,box-shadow .5s ease,padding .5s ease",
        }}
      >
        <a
          href="#"
          onClick={nav("top")}
          aria-label="GAM Group — Home"
          style={{ display: "flex", alignItems: "center", textDecoration: "none", lineHeight: 1, cursor: "pointer" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gam-logo.svg" alt="GAM Group — It's my world" width={77} height={46} style={{ display: "block", height: 46, width: "auto" }} />
        </a>

        <nav ref={navRef} data-desktop-nav style={{ display: "flex", alignItems: "center", gap: 38 }}>
          {[
            ["home", "Home", "top"],
            ["chisiamo", "Chi Siamo", "chisiamo"],
            ["servizi", "Servizi", "servizi"],
            ["progetti", "Progetti", "progetti"],
            ["jobboard", "Job Board", "jobboard"],
          ].map(([key, label, id]) =>
            key === "servizi" ? (
              /* Servizi: link + two-column dropdown (pillars clickable | channels informational) */
              <div
                key={key}
                style={{ position: "relative" }}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <a
                  data-nav={key}
                  className="nav-link"
                  href={`#${id}`}
                  onClick={nav(id)}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  style={{ fontSize: 15, fontWeight: 500, color: INK, textDecoration: "none", cursor: "pointer", transition: "color .3s ease" }}
                >
                  {label}
                </a>
                {servicesOpen && (
                  <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", paddingTop: 18, zIndex: 1001 }}>
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: 18,
                        border: "1px solid #DDE6E8",
                        boxShadow: "0 24px 60px rgba(16,27,48,.18)",
                        padding: "26px 30px",
                        display: "grid",
                        gridTemplateColumns: "auto auto",
                        gap: 40,
                        width: "max-content",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <p style={{ margin: "0 0 12px", fontFamily: MONO, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: TEALD }}>Pilastri</p>
                        {services.map((s) => (
                          <a
                            key={s.num}
                            href="#servizi"
                            onClick={nav("servizi")}
                            className="dd-pillar"
                            style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "7px 0", textDecoration: "none", cursor: "pointer" }}
                          >
                            <span style={{ fontFamily: MONO, fontSize: 11, color: TEALD }}>{s.num}</span>
                            <span style={{ fontFamily: GRO, fontWeight: 500, fontSize: 15, color: INK, transition: "color .25s ease", whiteSpace: "nowrap" }}>{s.title}</span>
                          </a>
                        ))}
                      </div>
                      {/* channels: informational only — no links, no hover, no hand cursor */}
                      <div style={{ borderLeft: "1px solid #DDE6E8", paddingLeft: 40, display: "flex", flexDirection: "column", gap: 2, cursor: "default" }}>
                        <p style={{ margin: "0 0 12px", fontFamily: MONO, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: MUT }}>Canali</p>
                        {channels.map((c) => (
                          <span key={c.name} style={{ fontFamily: MONO, fontSize: 13, color: GREY, padding: "7px 0", whiteSpace: "nowrap" }}>{c.name}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={key}
                data-nav={key}
                className="nav-link"
                href={id === "top" ? "#" : `#${id}`}
                onClick={nav(id)}
                style={{ fontSize: 15, fontWeight: 500, color: INK, textDecoration: "none", cursor: "pointer", transition: "color .3s ease" }}
              >
                {label}
              </a>
            )
          )}
          <a
            data-nav="contatti"
            href="#contatti"
            onClick={nav("contatti")}
            className="cta-pill"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontSize: 15,
              fontWeight: 600,
              color: "#fff",
              background: TEALD,
              padding: "11px 22px",
              borderRadius: 999,
              textDecoration: "none",
              cursor: "pointer",
              transition: "background .3s ease,transform .3s ease",
            }}
          >
            Contattaci
          </a>
        </nav>

        <button
          data-burger
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }}
        >
          <span style={{ display: "block", width: 26, height: 2, background: INK, borderRadius: 2 }} />
          <span style={{ display: "block", width: 26, height: 2, background: INK, borderRadius: 2 }} />
        </button>
      </header>

      {/* ---- Hero ---- */}
      <section
        id="top"
        className="vh-hero"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "150px 6vw 70px",
          background: "#fff",
        }}
      >
        <span data-rise style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: TEALD }}>
          Consulenza IT — System Integration — dal 2001
        </span>
        <h1 style={{ margin: "30px 0 0", fontFamily: GRO, fontWeight: 700, fontSize: "clamp(58px,10vw,164px)", lineHeight: 0.92, letterSpacing: "-.035em", color: INK }}>
          <span data-rise style={{ display: "inline-block" }}>
            Benvenuti in
          </span>
          <br />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-rise
            src="/gam-wordmark.svg"
            alt="GAM"
            style={{ display: "inline-block", verticalAlign: "top", height: "clamp(46px,8vw,140px)", width: "auto", marginTop: "clamp(10px,1.4vw,22px)" }}
          />
        </h1>
        <p data-rise style={{ margin: "36px 0 0", maxWidth: 540, fontWeight: 300, fontSize: "clamp(17px,1.7vw,22px)", lineHeight: 1.62, color: GREY }}>
          Evolviamo e ottimizziamo i processi aziendali dei nostri clienti, dalla consulenza ai sistemi.
        </p>
        <div data-rise style={{ marginTop: 44, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={nav("servizi")}
            className="btn-navy"
            style={{ background: TEALD, color: "#fff", border: "none", borderRadius: 999, padding: "16px 34px", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "background .3s ease,transform .3s ease" }}
          >
            Scopri i servizi
          </button>
          <button
            onClick={nav("contatti")}
            className="btn-ghost"
            style={{ background: "transparent", color: INK, border: "1.5px solid #DDE6E8", borderRadius: 999, padding: "16px 34px", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "border-color .3s ease,color .3s ease" }}
          >
            Contattaci
          </button>
        </div>
        {/* scroll cue: desktop-only — on small screens it collides with the wrapped CTA buttons */}
        <div data-scroll-cue style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: ".24em", color: MUT, textTransform: "uppercase" }}>Scorri</span>
          <span style={{ display: "block", width: 1, height: 42, background: "linear-gradient(180deg,#c3cbd6,transparent)", animation: "gam-cue 1.8s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ---- Hero image band ---- */}
      <section style={{ position: "relative", height: "clamp(360px,52vw,640px)", overflow: "hidden", background: "#101b30" }}>
        <div
          ref={heroMediaRef}
          style={{
            position: "absolute",
            inset: "-12% 0",
            background:
              "repeating-linear-gradient(135deg,rgba(121,183,196,.10) 0 18px,rgba(255,255,255,0) 18px 36px),linear-gradient(120deg,#1d3056,#16233f 60%,#101b30)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            willChange: "transform",
          }}
        >
          {/* Photo slot: drop the real team/office shot at public/photos/hero.jpg.
              Until the file exists the img 404s (hidden) and the striped placeholder shows. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/hero.jpg"
            alt=""
            onLoad={() => setHasHeroPhoto(true)}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: hasHeroPhoto ? 1 : 0, transition: "opacity .6s ease" }}
          />
          {hasHeroPhoto && (
            /* navy overlay for legibility (handoff README) + brand duotone wash */
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(125deg, rgba(27,42,74,.78), rgba(77,147,162,.45))", mixBlendMode: "multiply" }} />
          )}
          {!hasHeroPhoto && (
            <span style={{ position: "relative", fontFamily: MONO, fontSize: 13, letterSpacing: ".18em", color: "rgba(255,255,255,.22)", textTransform: "uppercase" }}>
              [ team gam — foto a tutta larghezza ]
            </span>
          )}
        </div>
      </section>

      {/* ---- Claim ---- */}
      <section style={{ background: "#fff", padding: "clamp(110px,15vw,220px) 6vw" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p data-rise style={{ margin: 0, fontFamily: GRO, fontWeight: 500, fontSize: "clamp(30px,4.6vw,62px)", lineHeight: 1.16, letterSpacing: "-.02em", color: INK }}>
            <span style={{ color: MUT }}>Portiamo il tuo business</span> al livello successivo.
            <span style={{ display: "block", marginTop: 18, fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.65, color: GREY, maxWidth: 680 }}>
              Innovare i sistemi IT riduce i costi, aumenta la flessibilità e migliora la qualità dei servizi.
            </span>
          </p>
        </div>
      </section>

      {/* ---- Case study in evidenza (Reply-style featured case) ---- */}
      {featured && (
        <section style={{ background: "#fff", padding: "0 6vw clamp(90px,12vw,170px)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div data-rise style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: "clamp(28px,3.4vw,44px)" }}>
              <span style={eyebrow()}>Case study in evidenza</span>
            </div>
            <div
              data-rise
              data-grid-2
              className="featured-card"
              onClick={() => setProjectIndex(featuredIdx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setProjectIndex(featuredIdx);
                }
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr",
                border: "1px solid #DDE6E8",
                borderRadius: 22,
                overflow: "hidden",
                cursor: "pointer",
                background: "#fff",
                transition: "transform .4s ease, border-color .4s ease, box-shadow .4s ease",
              }}
            >
              <CaseBanner p={featured} style={{ minHeight: "clamp(240px,30vw,400px)", padding: 24 }} />
              <div style={{ padding: "clamp(28px,3.4vw,52px)", display: "flex", flexDirection: "column", gap: 18 }}>
                <h3 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(22px,2.6vw,36px)", lineHeight: 1.15, letterSpacing: "-.02em", color: INK }}>{featured.title}</h3>
                <p style={{ margin: 0, fontWeight: 300, fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.65, color: GREY }}>{featured.challenge}</p>
                <span style={{ marginTop: "auto", paddingTop: 10, fontFamily: MONO, fontSize: 13, letterSpacing: ".04em", color: TEALD }}>Leggi il case study →</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---- Servizi ---- */}
      <section id="servizi" style={{ background: LIGHT, padding: "clamp(90px,12vw,170px) 6vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-rise style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: "clamp(40px,5vw,70px)" }}>
            <span style={eyebrow()}>01 — 04</span>
            <h2 style={h2}>I nostri servizi</h2>
          </div>
          <div style={{ borderTop: "1px solid rgba(77,147,162,.35)" }}>
            {services.map((svc) => (
              <div
                key={svc.num}
                data-svc-row
                className="svc-row"
                style={{ display: "grid", gridTemplateColumns: "64px minmax(220px,1fr) 1.2fr", gap: 28, alignItems: "center", padding: "clamp(28px,3.4vw,46px) 0", borderBottom: "1px solid rgba(77,147,162,.35)", transition: "padding-left .4s ease", cursor: "default" }}
              >
                <span style={{ fontFamily: MONO, fontSize: 14, color: TEALD }}>{svc.num}</span>
                <div>
                  <h3 style={{ margin: 0, fontFamily: GRO, fontWeight: 500, fontSize: "clamp(22px,2.4vw,34px)", lineHeight: 1.1, letterSpacing: "-.015em", color: INK }}>{svc.title}</h3>
                </div>
                <div data-svc-tags style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {svc.tags.map((t) => (
                    <span key={t} className="chip" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".04em", color: "#536F83", border: "1px solid #DDE6E8", borderRadius: 999, padding: "6px 13px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Canali ---- */}
      <section style={{ background: "#fff", padding: "clamp(90px,12vw,170px) 6vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-rise style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: "clamp(36px,4vw,56px)" }}>
            <span style={eyebrow()}>Tecnologie</span>
            <h2 style={h2}>I nostri canali</h2>
          </div>
          <div data-chan style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid rgba(77,147,162,.35)", borderLeft: "1px solid rgba(77,147,162,.35)" }}>
            {channels.map((ch) => (
              <div key={ch.name} className="chan-cell" style={{ borderRight: "1px solid rgba(77,147,162,.35)", borderBottom: "1px solid rgba(77,147,162,.35)", padding: "clamp(26px,2.4vw,40px)", minHeight: 260, display: "flex", flexDirection: "column", transition: "background .4s ease" }}>
                <span style={{ fontFamily: GRO, fontWeight: 700, fontSize: "clamp(22px,1.9vw,28px)", letterSpacing: "-.01em", color: INK }}>{ch.name}</span>
                <span style={{ width: 26, height: 3, background: TEAL, margin: "16px 0 22px" }} />
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                  {ch.items.map((line) => (
                    <li key={line} style={{ fontFamily: MONO, fontSize: 12, color: GREY, letterSpacing: ".02em" }}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Numeri ---- */}
      <section ref={statsRef} style={{ background: NAVY, padding: "clamp(90px,12vw,160px) 6vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <p data-rise style={{ margin: "0 0 clamp(40px,5vw,72px)", ...eyebrow(TEALLT), textAlign: "center" }}>I numeri sono il nostro forte</p>
          <div data-stats-grid style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 18, borderRight: "1px solid rgba(255,255,255,.12)" }}>
                <div data-count={s.value} data-suffix="+" style={{ fontFamily: GRO, fontWeight: 700, fontSize: "clamp(50px,7vw,104px)", lineHeight: 1, letterSpacing: "-.04em", color: "#fff" }}>0+</div>
                <div style={{ fontWeight: 300, fontSize: "clamp(14px,1.3vw,18px)", color: "rgba(255,255,255,.6)", textAlign: "center" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Chi Siamo ---- */}
      <section id="chisiamo" style={{ background: "#fff", padding: "clamp(90px,12vw,170px) 6vw" }}>
        <div data-grid-2 style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,96px)", alignItems: "start" }}>
          <div data-sticky style={{ position: "sticky", top: 120 }}>
            <p style={{ margin: "0 0 22px", ...eyebrow() }}>Chi siamo</p>
            <h2 data-rise style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(34px,4.6vw,68px)", lineHeight: 1.02, letterSpacing: "-.025em", color: INK }}>Il partner di cui ti puoi fidare.</h2>
            <button data-rise onClick={nav("contatti")} className="btn-ghost" style={{ marginTop: 38, display: "inline-flex", alignItems: "center", gap: 10, background: "transparent", color: INK, border: "1.5px solid #DDE6E8", borderRadius: 999, padding: "15px 30px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "border-color .3s ease,color .3s ease" }}>
              Parla con noi →
            </button>
          </div>
          <div>
            <p data-rise style={{ margin: 0, fontWeight: 300, fontSize: "clamp(17px,1.7vw,22px)", lineHeight: 1.7, color: S2 }}>
              GAM Group è un’azienda italiana fondata nel <strong style={{ fontWeight: 700, color: TEALD }}>2001</strong>, con sede a <strong style={{ fontWeight: 700, color: TEALD }}>Treviso</strong>. Da oltre vent’anni affianchiamo le imprese nell’evoluzione e nella gestione dei loro sistemi IT.
            </p>
            <div data-rise style={{ marginTop: 40, paddingTop: 34, borderTop: "1px solid rgba(77,147,162,.35)" }}>
              <p style={{ margin: "0 0 18px", fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: MUT }}>Settori</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {sectors.map((sec) => (
                  <span key={sec} className="chip" style={{ fontFamily: GRO, fontWeight: 500, fontSize: "clamp(15px,1.4vw,19px)", color: INK, border: "1px solid #DDE6E8", borderRadius: 999, padding: "9px 18px" }}>{sec}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- I progetti (pinned horizontal gallery) ---- */}
      <section id="progetti" style={{ background: "#101b30" }}>
        {/* heights via .pin-wrap/.pin-screen classes: svh units (stable while the
            mobile URL bar collapses) — 340vh here reflowed everything below on
            every bar show/hide, making the page "jump" during scroll */}
        <div ref={pinWrap} className="pin-wrap" style={{ position: "relative" }}>
          <div className="pin-screen" style={{ position: "sticky", top: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ padding: "0 6vw", marginBottom: "clamp(28px,4vh,52px)", display: "flex", alignItems: "baseline", gap: 16 }}>
              <span style={eyebrow(TEALLT)}>Case studies</span>
              <h2 style={{ ...h2, color: "#fff" }}>I progetti</h2>
            </div>
            <div ref={pinTrack} data-track style={{ display: "flex", gap: 28, padding: "0 6vw", willChange: "transform" }}>
              {projects.map((p, i) => (
                <div
                  key={p.id}
                  onClick={() => setProjectIndex(i)}
                  className="project-card"
                  style={{ flex: "none", width: "min(78vw,460px)", background: "#16233f", border: "1px solid rgba(255,255,255,.08)", borderRadius: 22, overflow: "hidden", cursor: "pointer", transition: "transform .4s ease,border-color .4s ease" }}
                >
                  <CaseBanner p={p} style={{ height: "clamp(200px,30vh,300px)", padding: 20 }} />
                  <div style={{ padding: 30, display: "flex", flexDirection: "column", gap: 22, minHeight: 200 }}>
                    <h3 style={{ margin: 0, fontFamily: GRO, fontWeight: 500, fontSize: "clamp(20px,1.8vw,26px)", lineHeight: 1.28, color: "#fff" }}>{p.title}</h3>
                    <span style={{ marginTop: "auto", fontFamily: MONO, fontSize: 13, letterSpacing: ".04em", color: TEALLT }}>Leggi il case study →</span>
                  </div>
                </div>
              ))}
              <div style={{ flex: "none", width: "40vw", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ fontFamily: GRO, fontWeight: 500, fontSize: "clamp(22px,2.4vw,34px)", color: "rgba(255,255,255,.4)", maxWidth: "14ch", lineHeight: 1.15 }}>E molti altri progetti, in ogni settore.</span>
              </div>
            </div>
            <p style={{ padding: "0 6vw", margin: "clamp(28px,4vh,52px) 0 0", fontFamily: MONO, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.35)" }}>Scorri per esplorare →</p>
          </div>
        </div>
      </section>

      {/* ---- Clienti (marquee) ---- */}
      <section style={{ background: "#fff", padding: "clamp(70px,9vw,120px) 0", overflow: "hidden" }}>
        <p data-rise style={{ margin: "0 0 clamp(40px,5vw,64px)", textAlign: "center", ...eyebrow(MUT), padding: "0 6vw" }}>I nostri partner tecnologici</p>
        <div style={{ display: "flex", width: "max-content", gap: 88, animation: "gam-marq 28s linear infinite", paddingLeft: 88 }}>
          {[...partners, ...partners].map((c, i) => (
            <span key={`${c}-${i}`} style={{ fontFamily: GRO, fontWeight: 700, fontSize: "clamp(26px,3.2vw,44px)", letterSpacing: "-.01em", color: "#c2c9d3", whiteSpace: "nowrap" }}>{c}</span>
          ))}
        </div>
      </section>

      {/* ---- Job Board ---- */}
      <section id="jobboard" style={{ background: LIGHT, padding: "clamp(90px,12vw,170px) 6vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-rise style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 18 }}>
            <span style={eyebrow()}>Lavora con noi</span>
            <h2 style={h2}>Entra in GAM</h2>
          </div>
          <p data-rise style={{ margin: "0 0 clamp(40px,5vw,64px)", maxWidth: 560, fontWeight: 300, fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.6, color: GREY }}>
            Unisciti a un team di esperti IT. Le posizioni aperte, in continua crescita.
          </p>
          <div style={{ borderTop: "1px solid rgba(77,147,162,.35)" }}>
            {jobs.map((job) => (
              <div key={job.title} data-job-row className="job-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, padding: "clamp(26px,3vw,40px) 0", borderBottom: "1px solid rgba(77,147,162,.35)", transition: "padding-left .4s ease" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ margin: 0, fontFamily: GRO, fontWeight: 500, fontSize: "clamp(22px,2.4vw,32px)", lineHeight: 1.1, letterSpacing: "-.015em", color: INK }}>{job.title}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".04em", color: GREY }}>{job.sede}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#c2c9d3" }} />
                    <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".04em", color: GREY }}>{job.type}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {job.tags.map((t) => (
                      <span key={t} className="chip" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".04em", color: "#536F83", border: "1px solid #DDE6E8", borderRadius: 999, padding: "6px 13px" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <a
                  href={`mailto:recruitment@gamgroup.it?subject=${encodeURIComponent(`Candidatura: ${job.title}`)}`}
                  className="btn-navy"
                  style={{ flex: "none", display: "inline-flex", alignItems: "center", gap: 9, background: TEALD, color: "#fff", borderRadius: 999, padding: "14px 28px", fontSize: 15, fontWeight: 600, textDecoration: "none", transition: "background .3s ease,transform .3s ease" }}
                >
                  Candidati ora →
                </a>
              </div>
            ))}
          </div>
          <p data-rise style={{ margin: "clamp(36px,4vw,52px) 0 0", fontWeight: 300, fontSize: 16, color: GREY }}>
            Candidatura spontanea — invia il CV a{" "}
            <a href="mailto:recruitment@gamgroup.it" style={{ color: INK, fontWeight: 500, textDecoration: "none", borderBottom: `1px solid ${TEAL}` }}>recruitment@gamgroup.it</a>
          </p>
        </div>
      </section>

      {/* ---- Contatti ---- */}
      {/* ---- FAQ ---- */}
      <section id="faq" style={{ background: "#fff", padding: "clamp(90px,12vw,170px) 6vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-rise style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: "clamp(40px,5vw,64px)" }}>
            <span style={eyebrow()}>FAQ</span>
            <h2 style={h2}>Domande frequenti</h2>
          </div>
          <div style={{ borderTop: "1px solid rgba(77,147,162,.35)" }}>
            {faqs.map((f) => (
              <details key={f.q} className="faq-item" style={{ borderBottom: "1px solid rgba(77,147,162,.35)" }}>
                <summary
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 24,
                    padding: "clamp(22px,2.6vw,32px) 0",
                    cursor: "pointer",
                    listStyle: "none",
                    fontFamily: GRO,
                    fontWeight: 500,
                    fontSize: "clamp(18px,2vw,26px)",
                    letterSpacing: "-.01em",
                    color: INK,
                  }}
                >
                  {f.q}
                  <span className="faq-mark" aria-hidden style={{ flex: "none", fontFamily: MONO, fontSize: 20, color: TEAL, transition: "transform .3s ease" }}>+</span>
                </summary>
                <p style={{ margin: 0, padding: "0 0 clamp(22px,2.6vw,32px)", maxWidth: 760, fontWeight: 300, fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.65, color: S2 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contatti" style={{ background: NAVY, padding: "clamp(90px,12vw,170px) 6vw", color: "#fff" }}>
        <div data-grid-2 style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: "clamp(44px,7vw,110px)", alignItems: "start" }}>
          <div>
            <p data-rise style={{ margin: "0 0 22px", ...eyebrow(TEALLT) }}>Contatti</p>
            <h2 data-rise style={{ margin: 0, maxWidth: "15ch", fontFamily: GRO, fontWeight: 700, fontSize: "clamp(34px,4.8vw,66px)", lineHeight: 1.02, letterSpacing: "-.025em", color: "#fff" }}>Scopriamo insieme cosa possiamo fare.</h2>
            <div data-rise style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 16, fontWeight: 300, fontSize: 18 }}>
              <span style={{ color: "rgba(255,255,255,.75)" }}>Via Callalta 31/E – 31100 Treviso</span>
              <a href="mailto:info@gamgroup.it" className="link-teal-white" style={{ color: TEALLT, textDecoration: "none", transition: "color .3s ease" }}>info@gamgroup.it</a>
              <a href="tel:+390422583693" className="link-teal-white" style={{ color: TEALLT, textDecoration: "none", transition: "color .3s ease" }}>+39 0422 583693</a>
            </div>
          </div>
          <div data-rise>
            {!formSent ? (
              <form onSubmit={submitForm} style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                <div data-form-row style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
                  <Field label="Nome" type="text" name="nome" />
                  <Field label="Cognome" type="text" name="cognome" />
                </div>
                <div data-form-row style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
                  <Field label="Email aziendale" type="email" name="email" />
                  <Field label="Azienda" type="text" name="azienda" />
                </div>
                <label style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={fieldLabel}>Messaggio</span>
                  <textarea name="messaggio" rows={3} required placeholder="Scrivi qui il tuo messaggio" className="field-input" style={{ ...fieldInput, resize: "vertical" }} />
                </label>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
                  <input type="checkbox" name="privacy" required style={{ marginTop: 3, width: 16, height: 16, accentColor: TEALLT, flex: "none" }} />
                  <span style={{ fontWeight: 300, fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,.7)" }}>
                    Ho letto l&rsquo;
                    <a href="/privacy" target="_blank" rel="noopener" style={{ color: TEALLT, textDecoration: "none", borderBottom: `1px solid ${TEALLT}` }}>informativa privacy</a>
                    {" "}e acconsento al trattamento dei miei dati personali per rispondere alla mia richiesta.
                  </span>
                </label>
                {formErr && (
                  <p style={{ margin: 0, fontSize: 14, color: "#ffb4b4" }}>{formErr}</p>
                )}
                <button type="submit" disabled={sending} className="btn-teal" style={{ alignSelf: "flex-start", background: TEALD, color: "#fff", border: "none", borderRadius: 999, padding: "16px 46px", fontSize: 16, fontWeight: 700, cursor: sending ? "wait" : "pointer", opacity: sending ? 0.7 : 1, transition: "background .3s ease,transform .3s ease" }}>{sending ? "Invio…" : "Invia"}</button>
              </form>
            ) : (
              <div style={{ border: "1px solid rgba(121,183,196,.45)", borderRadius: 20, padding: "48px 40px", background: "rgba(121,183,196,.10)" }}>
                <div style={{ fontSize: 40, lineHeight: 1, color: TEALLT, marginBottom: 18 }}>✓</div>
                <h3 style={{ margin: "0 0 12px", fontFamily: GRO, fontWeight: 500, fontSize: 26, color: "#fff" }}>Grazie!</h3>
                <p style={{ margin: 0, fontWeight: 300, fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,.8)" }}>Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.</p>
              </div>
            )}
          </div>
          <GamMap />
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer style={{ background: "#101b30", color: "rgba(255,255,255,.55)", padding: "34px 6vw", display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center", fontWeight: 300, fontSize: 13 }}>
        <div style={{ display: "flex", alignItems: "center", lineHeight: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gam-logo-white.svg" alt="GAM Group — It's my world" width={67} height={40} style={{ display: "block", height: 40, width: "auto" }} />
        </div>
        <span>
          © 2026 GAM Group Srl — Via Callalta 31/E, 31100 Treviso (TV)
          {" · "}
          <a href="/privacy" style={{ color: "rgba(255,255,255,.75)", textDecoration: "none", borderBottom: "1px solid rgba(121,183,196,.6)" }}>Privacy</a>
        </span>
      </footer>

      {/* ---- Case study modal ---- */}
      {activeProject && (
        <div onClick={() => setProjectIndex(null)} style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(16,27,48,.62)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, maxWidth: 720, width: "100%", maxHeight: "88vh", overflow: "auto", boxShadow: "0 40px 100px rgba(16,27,48,.45)" }}>
            <CaseBanner p={activeProject} style={{ height: "clamp(160px,22vw,220px)", padding: 24 }}>
              <button onClick={() => setProjectIndex(null)} aria-label="Chiudi" className="modal-close" style={{ position: "absolute", top: 18, right: 18, width: 40, height: 40, borderRadius: "50%", border: "none", background: "rgba(255,255,255,.12)", color: "#fff", fontSize: 24, lineHeight: 1, cursor: "pointer", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", transition: "background .3s ease" }}>×</button>
            </CaseBanner>
            <div style={{ padding: "clamp(28px,4vw,48px)" }}>
              <h3 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(24px,3vw,38px)", lineHeight: 1.12, letterSpacing: "-.02em", color: INK }}>{activeProject.title}</h3>
              <ModalBlock label="La sfida">
                <p style={modalPara}>{activeProject.challenge}</p>
              </ModalBlock>
              <ModalBlock label="Il progetto">
                <p style={modalPara}>{activeProject.description}</p>
              </ModalBlock>
              <div style={{ marginTop: "clamp(26px,3vw,36px)" }}>
                <p style={{ margin: "0 0 16px", fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: TEALD }}>Benefici</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {activeProject.benefits.map((b) => (
                    <li key={b} style={{ display: "flex", gap: 11, alignItems: "flex-start", fontSize: 16, fontWeight: 400, color: INK, lineHeight: 1.4 }}>
                      <span style={{ marginTop: 2, color: TEAL, fontSize: 16 }}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={nav("contatti")} className="btn-navy" style={{ marginTop: "clamp(30px,3.6vw,44px)", background: TEALD, color: "#fff", border: "none", borderRadius: 999, padding: "16px 34px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "background .3s ease,transform .3s ease" }}>Parla con noi del tuo progetto →</button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Mobile menu ---- */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1100, background: "#fff", display: "flex", flexDirection: "column", padding: "26px 6vw" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", lineHeight: 1 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gam-logo.svg" alt="GAM Group — It's my world" width={80} height={48} style={{ display: "block", height: 48, width: "auto" }} />
            </div>
            <button onClick={() => setMenuOpen(false)} aria-label="Chiudi" style={{ background: "none", border: "none", color: INK, fontSize: 38, lineHeight: 1, cursor: "pointer", fontWeight: 300 }}>×</button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 48 }}>
            {[
              ["Home", "top"],
              ["Chi Siamo", "chisiamo"],
              ["Servizi", "servizi"],
              ["Progetti", "progetti"],
              ["Job Board", "jobboard"],
              ["Contattaci", "contatti"],
            ].map(([label, id], i, arr) => (
              <a
                key={id}
                href={id === "top" ? "#" : `#${id}`}
                onClick={nav(id)}
                style={{ fontFamily: GRO, fontSize: 30, fontWeight: 500, color: id === "contatti" ? TEALD : INK, textDecoration: "none", padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid #DDE6E8" : "none" }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

/* ---- small helpers ---- */
const fieldLabel: CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,.6)",
};
const fieldInput: CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,.25)",
  color: "#fff",
  padding: "10px 0",
  fontSize: 17,
  outline: "none",
  transition: "border-color .3s ease",
};
const modalPara: CSSProperties = {
  margin: 0,
  fontWeight: 300,
  fontSize: "clamp(16px,1.5vw,19px)",
  lineHeight: 1.65,
  color: S2,
};

/**
 * Case-study banner: striped placeholder by default; when `p.image` is set it
 * renders the photo with the unified duotone treatment (grayscale + navy/teal
 * wash — visual spec §4) so all case photos read as one collection.
 */
function CaseBanner({ p, style, children }: { p: Project; style: CSSProperties; children?: React.ReactNode }) {
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "flex-end", overflow: "hidden", ...cardBanner, ...style }}>
      {p.image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} />
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(125deg, rgba(27,42,74,.78), rgba(77,147,162,.45))", mixBlendMode: "multiply" }} />
        </>
      )}
      <div style={{ position: "absolute", top: 20, left: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: TEALLT, border: "1px solid rgba(121,183,196,.55)", padding: "6px 13px", borderRadius: 999 }}>{p.sector}</span>
        {p.area && (
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.75)", border: "1px solid rgba(255,255,255,.35)", padding: "6px 13px", borderRadius: 999 }}>{p.area}</span>
        )}
      </div>
      {!p.image && (
        <span style={{ position: "relative", fontFamily: MONO, fontSize: 11, letterSpacing: ".12em", color: "rgba(255,255,255,.4)", textTransform: "uppercase" }}>{p.img}</span>
      )}
      {children}
    </div>
  );
}

function Field({ label, type, name }: { label: string; type: string; name: string }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={fieldLabel}>{label}</span>
      <input type={type} name={name} required className="field-input" style={fieldInput} />
    </label>
  );
}

function ModalBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: label === "La sfida" ? "clamp(28px,3.4vw,40px)" : "clamp(26px,3vw,36px)" }}>
      <p style={{ margin: "0 0 12px", fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: TEALD }}>{label}</p>
      {children}
    </div>
  );
}
