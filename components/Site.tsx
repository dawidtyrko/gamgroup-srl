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
import type { JobView } from "@/lib/jobs";
import type { Dict, Locale } from "@/lib/i18n/types";
import { serviceGraphics } from "@/components/ServiceGraphics";
import { serviceDetailGraphics } from "@/components/serviceDetailGraphics";
import JobBanner from "@/components/JobBanner";
import HeroBackground from "@/components/HeroBackground";

// HR photo per default opening (by seed id); admin-added jobs fall back to the
// branded abstract banner in JobBanner.
const jobPhotos: Record<string, string> = {
  "seed-sap-s4hana": "/hr/sap-consultant.jpg",
  "seed-service-manager-ams": "/hr/service-manager.jpg",
  "seed-sap-analyst": "/hr/sap-analyst.jpg",
  "seed-it-specialist": "/hr/it-specialist.jpg",
  "seed-senior-it-consultant": "/hr/senior-consultant.jpg",
};

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

// Partner logos (brand names are locale-independent; alt = name).
const partnerLogos = [
  { name: "Rivelio", src: "/partners/rivelio.png" },
  { name: "Microsoft Partner", src: "/partners/microsoft.png" },
  { name: "ProcederAI", src: "/partners/proceder.png" },
  { name: "Claude", src: "/partners/claude.png" },
  { name: "AWS", src: "/partners/aws.png" },
];

// Client logos (shown full-colour, per the old site).
const clientLogos = [
  { name: "Maserati", src: "/clients/maserati.png" },
  { name: "Miele", src: "/clients/miele.png" },
  { name: "CNH Industrial", src: "/clients/cnh.png" },
  { name: "Geox", src: "/clients/geox.png" },
  { name: "Safilo", src: "/clients/safilo.png" },
];

// Service imagery shown in the expanded accordion panel (locale-independent).
// Indexed by service position (matches dict.services.items order).
const cardBanner: CSSProperties = {
  background:
    "repeating-linear-gradient(135deg,rgba(121,183,196,.12) 0 16px,rgba(255,255,255,0) 16px 32px),linear-gradient(125deg,#22325a,#16233f)",
};

export default function Site({ projects, jobs, dict, locale }: { projects: Project[]; jobs: JobView[]; dict: Dict; locale: Locale }) {
  // content comes from the locale dictionary (lib/i18n); projects + jobs from KV
  const services = dict.services.items;
  const channels = dict.channels.items;
  const stats = dict.stats.items;
  const sectors = dict.about.sectors;
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [projectIndex, setProjectIndex] = useState<number | null>(null);
  const [jobIndex, setJobIndex] = useState<number | null>(null);
  const [openService, setOpenService] = useState<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
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
    let countersActive = false; // true while the stats section is in the trigger band
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
        const from = target > 1 ? 1 : 0; // count up from 1 (Vittoria)
        const dur = 1700;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(from + (target - from) * eased) + suffix;
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
        ["chisiamo", "chisiamo"],
        ["servizi", "servizi"],
        ["progetti", "progetti"],
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

      // Counters: replay every time the section scrolls into the trigger band,
      // reset when it fully leaves so the next entry animates from 1 again.
      if (statsRef.current) {
        const r = statsRef.current.getBoundingClientRect();
        const inBand = r.top < vh * 0.78 && r.bottom > vh * 0.15;
        if (inBand && !countersActive) {
          countersActive = true;
          runCounters();
        } else if (!inBand && countersActive) {
          countersActive = false;
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

    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ---- navigation ---- */
  const goto = (id: string) => {
    setMenuOpen(false);
    setServicesOpen(false);
    setProjectIndex(null);
    setJobIndex(null);
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
  const activeJob = jobIndex != null ? jobs[jobIndex] : null;
  const privacyHref = locale === "en" ? "/en/privacy" : "/privacy";

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
        const codeMap: Record<string, string> = {
          missing_fields: dict.contact.errors.missingFields,
          invalid_email: dict.contact.errors.invalidEmail,
          privacy_required: dict.contact.errors.privacyRequired,
          send_failed: dict.contact.errors.sendFailed,
        };
        setFormErr((data.code && codeMap[data.code]) || data.error || dict.contact.netError);
        return;
      }
      setFormSent(true);
    } catch {
      setFormErr(dict.contact.netError);
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
            ["home", dict.nav.home, "top"],
            ["progetti", dict.nav.progetti, "progetti"],
            ["servizi", dict.nav.servizi, "servizi"],
            ["chisiamo", dict.nav.chisiamo, "chisiamo"],
            ["jobboard", dict.nav.jobboard, "jobboard"],
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
                        <p style={{ margin: "0 0 12px", fontFamily: MONO, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: TEALD }}>{dict.dropdown.pillars}</p>
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
                        <p style={{ margin: "0 0 12px", fontFamily: MONO, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: MUT }}>{dict.dropdown.channels}</p>
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
            {dict.nav.contattaci}
          </a>
          <a
            href={dict.langSwitch.href}
            className="lang-switch"
            aria-label={locale === "it" ? "English version" : "Versione italiana"}
            style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".08em", color: GREY, textDecoration: "none", border: "1px solid #DDE6E8", borderRadius: 999, padding: "8px 13px", transition: "color .3s ease,border-color .3s ease" }}
          >
            {dict.langSwitch.label}
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
        <HeroBackground />
        {/* hero-only: darker than the brand TEALD + tight white halo so the mono
            line reads over both bright windows and dark furniture in the photos */}
        <span data-rise style={{ position: "relative", zIndex: 1, fontFamily: MONO, fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: "#123c45", textShadow: "0 0 3px rgba(255,255,255,.98), 0 1px 12px rgba(255,255,255,.95)" }}>
          {dict.hero.eyebrow}
        </span>
        <h1 style={{ position: "relative", zIndex: 1, margin: "30px 0 0", fontFamily: GRO, fontWeight: 700, fontSize: "clamp(58px,10vw,164px)", lineHeight: 0.92, letterSpacing: "-.035em", color: INK, textShadow: "0 2px 28px rgba(255,255,255,.75)" }}>
          <span data-rise style={{ display: "inline-block" }}>
            {dict.hero.title}
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
        {/* hero-only: darker than the section GREY + weight 400 + white halo, so
            the subtitle stays legible where it crosses busy/bright photo areas */}
        <p data-rise style={{ position: "relative", zIndex: 1, margin: "36px 0 0", maxWidth: 540, fontWeight: 400, fontSize: "clamp(17px,1.7vw,22px)", lineHeight: 1.62, color: "#22333c", textShadow: "0 0 3px rgba(255,255,255,.95), 0 1px 14px rgba(255,255,255,.92)" }}>
          {dict.hero.subtitle}
        </p>
        <div data-rise style={{ position: "relative", zIndex: 1, marginTop: 44, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={nav("servizi")}
            className="btn-navy"
            style={{ background: TEALD, color: "#fff", border: "none", borderRadius: 999, padding: "16px 34px", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "background .3s ease,transform .3s ease" }}
          >
            {dict.hero.ctaServices}
          </button>
          <button
            onClick={nav("contatti")}
            className="btn-ghost"
            style={{ background: "transparent", color: INK, border: "1.5px solid #DDE6E8", borderRadius: 999, padding: "16px 34px", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "border-color .3s ease,color .3s ease" }}
          >
            {dict.hero.ctaContact}
          </button>
        </div>
        {/* scroll cue: desktop-only — on small screens it collides with the wrapped CTA buttons */}
        <div data-scroll-cue style={{ position: "absolute", zIndex: 1, bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: ".24em", color: MUT, textTransform: "uppercase" }}>{dict.hero.scroll}</span>
          <span style={{ display: "block", width: 1, height: 42, background: "linear-gradient(180deg,#c3cbd6,transparent)", animation: "gam-cue 1.8s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ---- Bridge graphic (business ↔ IT, powered by AI) — the signature
             element (visual spec §6). Animated SVG (SMIL + CSS) served as an
             <img>: the browser keeps the pulses/glow running. ---- */}
      <section style={{ background: "#F1F5F6", padding: "clamp(56px,8vw,110px) 6vw", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-rise
          src="/gam-ponte.svg"
          alt={dict.bridge.alt}
          style={{ display: "block", width: "100%", maxWidth: 960, height: "auto", margin: "0 auto" }}
        />
      </section>

      {/* ---- Claim ---- */}
      <section style={{ background: "#fff", padding: "clamp(110px,15vw,220px) 6vw" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p data-rise style={{ margin: 0, fontFamily: GRO, fontWeight: 500, fontSize: "clamp(30px,4.6vw,62px)", lineHeight: 1.16, letterSpacing: "-.02em", color: INK }}>
            <span style={{ color: MUT }}>{dict.claim.muted}</span>{dict.claim.strong}
            <span style={{ display: "block", marginTop: 18, fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.65, color: GREY, maxWidth: 680 }}>
              {dict.claim.sub}
            </span>
          </p>
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
              <span style={eyebrow(TEALLT)}>{dict.projectsSec.eyebrow}</span>
              <h2 style={{ ...h2, color: "#fff" }}>{dict.projectsSec.title}</h2>
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
                    <span style={{ marginTop: "auto", fontFamily: MONO, fontSize: 13, letterSpacing: ".04em", color: TEALLT }}>{dict.projectsSec.readMore}</span>
                  </div>
                </div>
              ))}
              <div style={{ flex: "none", width: "40vw", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ fontFamily: GRO, fontWeight: 500, fontSize: "clamp(22px,2.4vw,34px)", color: "rgba(255,255,255,.4)", maxWidth: "14ch", lineHeight: 1.15 }}>{dict.projectsSec.trailing}</span>
              </div>
            </div>
            <p style={{ padding: "0 6vw", margin: "clamp(28px,4vh,52px) 0 0", fontFamily: MONO, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.35)" }}>{dict.projectsSec.hint}</p>
          </div>
        </div>
      </section>

      {/* ---- Clienti (static logo strip) ---- */}
      <section style={{ background: "#fff", padding: "clamp(70px,9vw,120px) 6vw" }}>
        <p data-rise style={{ margin: "0 0 clamp(40px,5vw,64px)", textAlign: "center", ...eyebrow(MUT) }}>{dict.clients.eyebrow}</p>
        <div data-rise style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "clamp(36px,6vw,80px)" }}>
          {clientLogos.map((cl) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={cl.name} src={cl.src} alt={cl.name} style={{ display: "block", maxHeight: "clamp(44px,5vw,72px)", maxWidth: "clamp(120px,15vw,200px)", width: "auto", height: "auto" }} />
          ))}
        </div>
      </section>

      {/* ---- Servizi ---- */}
      <section id="servizi" style={{ background: LIGHT, padding: "clamp(90px,12vw,170px) 6vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-rise style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: "clamp(40px,5vw,70px)" }}>
            <span style={eyebrow()}>{dict.services.eyebrow}</span>
            <h2 style={h2}>{dict.services.title}</h2>
          </div>
          <div style={{ borderTop: "1px solid rgba(77,147,162,.35)" }}>
            {services.map((svc, si) => {
              const open = openService === si;
              const Graphic = serviceGraphics[si];
              return (
                <div
                  key={svc.num}
                  style={{
                    borderBottom: "1px solid rgba(77,147,162,.35)",
                    background: open ? "rgba(77,147,162,.05)" : "transparent",
                    boxShadow: open ? "inset 3px 0 0 #4D93A2" : "none",
                    // when open, inset the content so nothing sits under the
                    // accent bar / touches the side frames
                    paddingLeft: open ? "clamp(16px,3vw,26px)" : 0,
                    paddingRight: open ? "clamp(16px,3vw,26px)" : 0,
                    transition: "background .3s ease, box-shadow .3s ease",
                  }}
                >
                  <div
                    data-svc-row
                    className={open ? "svc-row svc-row--open" : "svc-row"}
                    onClick={() => setOpenService(open ? null : si)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={open}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenService(open ? null : si);
                      }
                    }}
                    style={{ display: "grid", gridTemplateColumns: "64px minmax(220px,1fr) 1.2fr", gap: 28, alignItems: "center", padding: "clamp(28px,3.4vw,46px) 0", transition: "padding-left .4s ease", cursor: "pointer" }}
                  >
                    <span style={{ fontFamily: MONO, fontSize: 14, color: TEALD }}>{svc.num}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "space-between" }}>
                      <h3 style={{ margin: 0, fontFamily: GRO, fontWeight: 500, fontSize: "clamp(22px,2.4vw,34px)", lineHeight: 1.1, letterSpacing: "-.015em", color: INK }}>{svc.title}</h3>
                      <span aria-hidden style={{ flex: "none", fontFamily: MONO, fontSize: 22, lineHeight: 1, color: TEALD, transition: "transform .3s ease", transform: open ? "rotate(45deg)" : "none" }}>+</span>
                    </div>
                    <div data-svc-tags style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                      {svc.tags.map((t) => (
                        <span key={t} className="chip" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".04em", color: "#536F83", border: "1px solid #DDE6E8", borderRadius: 999, padding: "6px 13px" }}>
                          {t}
                        </span>
                      ))}
                      {Graphic && (
                        // animated diagram as the collapsed-state placeholder;
                        // fades out when open (the full-size one takes over below)
                        <span data-svc-mini aria-hidden style={{ marginLeft: "auto", flex: "none", width: "clamp(120px,13vw,170px)", opacity: open ? 0 : 1, transition: "opacity .35s ease" }}>
                          <Graphic idSuffix="-mini" />
                        </span>
                      )}
                    </div>
                  </div>
                  {/* elegant in-place expand: grid-rows 0fr→1fr animates to auto height */}
                  <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows .45s cubic-bezier(.16,.84,.44,1)" }}>
                    <div style={{ overflow: "hidden" }}>
                      <div data-svc-detail style={{ paddingBottom: "clamp(28px,3.4vw,46px)" }}>
                        {/* content column centered in the panel */}
                        <div style={{ maxWidth: 760, margin: "0 auto" }}>
                          {svc.description.map((par) => (
                            <p key={par} style={{ margin: "0 0 12px", fontWeight: 300, fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.65, color: S2 }}>{par}</p>
                          ))}
                          {serviceDetailGraphics[si] && (
                            // full-size detailed diagram (Vittoria's richer HTML
                            // handoff, injected verbatim) — the small collapsed-row
                            // graphic above uses ServiceGraphics.tsx instead.
                            <div
                              className="svc-detail-graphic"
                              style={{ marginTop: "clamp(20px,2.4vw,32px)" }}
                              dangerouslySetInnerHTML={{ __html: serviceDetailGraphics[si] }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Canali ---- */}
      <section style={{ background: "#fff", padding: "clamp(90px,12vw,170px) 6vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-rise style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: "clamp(36px,4vw,56px)" }}>
            <span style={eyebrow()}>{dict.channels.eyebrow}</span>
            <h2 style={h2}>{dict.channels.title}</h2>
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
      <section ref={statsRef} style={{ position: "relative", overflow: "hidden", background: NAVY, padding: "clamp(90px,12vw,160px) 6vw" }}>
        {/* barely-visible duotone backdrop behind the counters (Vittoria: darker,
            shadowed, blue) — the vignette keeps the numbers as the focal point */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img aria-hidden alt="" src="/photos/manufacturing.jpg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) brightness(.55)", opacity: 0.16 }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(27,42,74,.2) 0%, rgba(22,33,58,.75) 68%, rgba(16,25,46,.95) 100%)" }} />
        <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto" }}>
          <p data-rise style={{ margin: "0 0 clamp(40px,5vw,72px)", ...eyebrow(TEALLT), textAlign: "center" }}>{dict.stats.eyebrow}</p>
          <div data-stats-grid style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 18, borderRight: "1px solid rgba(255,255,255,.12)" }}>
                <div data-count={s.value} data-suffix="+" style={{ fontFamily: GRO, fontWeight: 700, fontSize: "clamp(50px,7vw,104px)", lineHeight: 1, letterSpacing: "-.04em", color: "#fff" }}>1+</div>
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
            <p style={{ margin: "0 0 22px", ...eyebrow() }}>{dict.about.eyebrow}</p>
            <h2 data-rise style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(34px,4.6vw,68px)", lineHeight: 1.02, letterSpacing: "-.025em", color: INK }}>{dict.about.title}</h2>
            <button data-rise onClick={nav("contatti")} className="btn-ghost" style={{ marginTop: 38, display: "inline-flex", alignItems: "center", gap: 10, background: "transparent", color: INK, border: "1.5px solid #DDE6E8", borderRadius: 999, padding: "15px 30px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "border-color .3s ease,color .3s ease" }}>
              {dict.about.cta}
            </button>
          </div>
          <div>
            <p data-rise style={{ margin: 0, fontWeight: 300, fontSize: "clamp(17px,1.7vw,22px)", lineHeight: 1.7, color: S2 }}>
              {dict.about.p.pre}<strong style={{ fontWeight: 700, color: TEALD }}>{dict.about.p.year}</strong>{dict.about.p.mid}<strong style={{ fontWeight: 700, color: TEALD }}>{dict.about.p.city}</strong>{dict.about.p.post}
            </p>
            <div data-rise style={{ marginTop: 40, paddingTop: 34, borderTop: "1px solid rgba(77,147,162,.35)" }}>
              <p style={{ margin: "0 0 18px", fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: MUT }}>{dict.about.sectorsLabel}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {sectors.map((sec) => (
                  <span key={sec} className="chip" style={{ fontFamily: GRO, fontWeight: 500, fontSize: "clamp(15px,1.4vw,19px)", color: INK, border: "1px solid #DDE6E8", borderRadius: 999, padding: "9px 18px" }}>{sec}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Clienti (marquee) ---- */}
      <section style={{ background: "#fff", padding: "clamp(70px,9vw,120px) 0", overflow: "hidden" }}>
        <p data-rise style={{ margin: "0 0 clamp(40px,5vw,64px)", textAlign: "center", ...eyebrow(MUT), padding: "0 6vw" }}>{dict.partners.eyebrow}</p>
        <div style={{ display: "flex", alignItems: "center", width: "max-content", gap: 88, animation: "gam-marq 28s linear infinite", paddingLeft: 88 }}>
          {[...partnerLogos, ...partnerLogos].map((pl, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`${pl.name}-${i}`} src={pl.src} alt={pl.name} className="partner-logo" style={{ display: "block", height: "clamp(34px,4vw,54px)", width: "auto" }} />
          ))}
        </div>
      </section>

      {/* ---- Job Board ---- */}
      <section id="jobboard" style={{ background: LIGHT, padding: "clamp(90px,12vw,170px) 6vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-rise style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 18 }}>
            <span style={eyebrow()}>{dict.jobs.eyebrow}</span>
            <h2 style={h2}>{dict.jobs.title}</h2>
          </div>
          <p data-rise style={{ margin: "0 0 clamp(40px,5vw,64px)", maxWidth: 560, fontWeight: 300, fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.6, color: GREY }}>
            {dict.jobs.lead}
          </p>
          <div style={{ borderTop: "1px solid rgba(77,147,162,.35)" }}>
            {jobs.map((job, ji) => (
              <div
                key={job.title}
                data-job-row
                className="job-row"
                onClick={() => setJobIndex(ji)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setJobIndex(ji);
                  }
                }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, padding: "clamp(26px,3vw,40px) 0", borderBottom: "1px solid rgba(77,147,162,.35)", transition: "padding-left .4s ease", cursor: "pointer" }}
              >
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
                <span style={{ flex: "none", fontFamily: MONO, fontSize: 13, letterSpacing: ".04em", color: TEALD }}>
                  {dict.jobs.learnMore}
                </span>
              </div>
            ))}
          </div>
          <p data-rise style={{ margin: "clamp(36px,4vw,52px) 0 0", fontWeight: 300, fontSize: 16, color: GREY }}>
            {dict.jobs.spontaneousPre}{" "}
            <a href="mailto:recruitment@gamgroup.it" style={{ color: INK, fontWeight: 500, textDecoration: "none", borderBottom: `1px solid ${TEAL}` }}>recruitment@gamgroup.it</a>
          </p>
        </div>
      </section>

      {/* ---- Contatti ---- */}
      {/* ---- FAQ ---- */}
      <section id="faq" style={{ background: "#fff", padding: "clamp(90px,12vw,170px) 6vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-rise style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: "clamp(40px,5vw,64px)" }}>
            <span style={eyebrow()}>{dict.faq.eyebrow}</span>
            <h2 style={h2}>{dict.faq.title}</h2>
          </div>
          <div style={{ borderTop: "1px solid rgba(77,147,162,.35)" }}>
            {dict.faq.items.map((f) => (
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
            <p data-rise style={{ margin: "0 0 22px", ...eyebrow(TEALLT) }}>{dict.contact.eyebrow}</p>
            <h2 data-rise style={{ margin: 0, maxWidth: "15ch", fontFamily: GRO, fontWeight: 700, fontSize: "clamp(34px,4.8vw,66px)", lineHeight: 1.02, letterSpacing: "-.025em", color: "#fff" }}>{dict.contact.title}</h2>
            <div data-rise style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 16, fontWeight: 300, fontSize: 18 }}>
              <span style={{ color: "rgba(255,255,255,.75)" }}>{dict.contact.address}</span>
              <a href="mailto:info@gamgroup.it" className="link-teal-white" style={{ color: TEALLT, textDecoration: "none", transition: "color .3s ease" }}>info@gamgroup.it</a>
              <a href="tel:+390422583693" className="link-teal-white" style={{ color: TEALLT, textDecoration: "none", transition: "color .3s ease" }}>+39 0422 583693</a>
            </div>
          </div>
          <div data-rise>
            {!formSent ? (
              <form onSubmit={submitForm} style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                <div data-form-row style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
                  <Field label={dict.contact.nome} type="text" name="nome" />
                  <Field label={dict.contact.cognome} type="text" name="cognome" />
                </div>
                <div data-form-row style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
                  <Field label={dict.contact.email} type="email" name="email" />
                  <Field label={dict.contact.azienda} type="text" name="azienda" />
                </div>
                <label style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={fieldLabel}>{dict.contact.messaggio}</span>
                  <textarea name="messaggio" rows={3} required placeholder={dict.contact.msgPlaceholder} className="field-input" style={{ ...fieldInput, resize: "vertical" }} />
                </label>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
                  <input type="checkbox" name="privacy" required style={{ marginTop: 3, width: 16, height: 16, accentColor: TEALLT, flex: "none" }} />
                  <span style={{ fontWeight: 300, fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,.7)" }}>
                    {dict.contact.privacyPre}
                    <a href={privacyHref} target="_blank" rel="noopener" style={{ color: TEALLT, textDecoration: "none", borderBottom: `1px solid ${TEALLT}` }}>{dict.contact.privacyLink}</a>
                    {dict.contact.privacyPost}
                  </span>
                </label>
                {formErr && (
                  <p style={{ margin: 0, fontSize: 14, color: "#ffb4b4" }}>{formErr}</p>
                )}
                <button type="submit" disabled={sending} className="btn-teal" style={{ alignSelf: "flex-start", background: TEALD, color: "#fff", border: "none", borderRadius: 999, padding: "16px 46px", fontSize: 16, fontWeight: 700, cursor: sending ? "wait" : "pointer", opacity: sending ? 0.7 : 1, transition: "background .3s ease,transform .3s ease" }}>{sending ? dict.contact.sending : dict.contact.send}</button>
              </form>
            ) : (
              <div style={{ border: "1px solid rgba(121,183,196,.45)", borderRadius: 20, padding: "48px 40px", background: "rgba(121,183,196,.10)" }}>
                <div style={{ fontSize: 40, lineHeight: 1, color: TEALLT, marginBottom: 18 }}>✓</div>
                <h3 style={{ margin: "0 0 12px", fontFamily: GRO, fontWeight: 500, fontSize: 26, color: "#fff" }}>{dict.contact.successTitle}</h3>
                <p style={{ margin: 0, fontWeight: 300, fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,.8)" }}>{dict.contact.successBody}</p>
              </div>
            )}
          </div>
          <GamMap label={dict.map.label} directions={dict.map.directions} />
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer style={{ background: "#101b30", color: "rgba(255,255,255,.55)", padding: "34px 6vw", display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center", fontWeight: 300, fontSize: 13 }}>
        <div style={{ display: "flex", alignItems: "center", lineHeight: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gam-logo-white.svg" alt="GAM Group — It's my world" width={67} height={40} style={{ display: "block", height: 40, width: "auto" }} />
        </div>
        <span>
          {dict.footer.copyright}
          {" · "}
          <a href={privacyHref} style={{ color: "rgba(255,255,255,.75)", textDecoration: "none", borderBottom: "1px solid rgba(121,183,196,.6)" }}>{dict.footer.privacy}</a>
        </span>
      </footer>

      {/* ---- Case study modal ---- */}
      {activeProject && (
        <div onClick={() => setProjectIndex(null)} style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(16,27,48,.62)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, maxWidth: 720, width: "100%", maxHeight: "88vh", overflow: "auto", boxShadow: "0 40px 100px rgba(16,27,48,.45)" }}>
            <CaseBanner p={activeProject} style={{ height: "clamp(160px,22vw,220px)", padding: 24 }}>
              <button onClick={() => setProjectIndex(null)} aria-label={dict.modal.close} className="modal-close" style={{ position: "absolute", top: 18, right: 18, width: 40, height: 40, borderRadius: "50%", border: "none", background: "rgba(255,255,255,.12)", color: "#fff", fontSize: 24, lineHeight: 1, cursor: "pointer", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", transition: "background .3s ease" }}>×</button>
            </CaseBanner>
            <div style={{ padding: "clamp(28px,4vw,48px)" }}>
              <h3 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(24px,3vw,38px)", lineHeight: 1.12, letterSpacing: "-.02em", color: INK }}>{activeProject.title}</h3>
              <ModalBlock first label={dict.modal.challenge}>
                <p style={modalPara}>{activeProject.challenge}</p>
              </ModalBlock>
              <ModalBlock label={dict.modal.project}>
                <p style={modalPara}>{activeProject.description}</p>
              </ModalBlock>
              <div style={{ marginTop: "clamp(26px,3vw,36px)" }}>
                <p style={{ margin: "0 0 16px", fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: TEALD }}>{dict.modal.benefits}</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {activeProject.benefits.map((b) => (
                    <li key={b} style={{ display: "flex", gap: 11, alignItems: "flex-start", fontSize: 16, fontWeight: 400, color: INK, lineHeight: 1.4 }}>
                      <span style={{ marginTop: 2, color: TEAL, fontSize: 16 }}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={nav("contatti")} className="btn-navy" style={{ marginTop: "clamp(30px,3.6vw,44px)", background: TEALD, color: "#fff", border: "none", borderRadius: 999, padding: "16px 34px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "background .3s ease,transform .3s ease" }}>{dict.modal.cta}</button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Job modal ---- */}
      {activeJob && (
        <div onClick={() => setJobIndex(null)} style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(16,27,48,.62)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, maxWidth: 720, width: "100%", maxHeight: "88vh", overflow: "auto", boxShadow: "0 40px 100px rgba(16,27,48,.45)" }}>
            <div style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: 24, height: "clamp(120px,16vw,160px)", ...cardBanner }}>
              <JobBanner index={jobIndex!} src={jobPhotos[activeJob.id]} />
              <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: TEALLT, border: "1px solid rgba(121,183,196,.55)", padding: "6px 13px", borderRadius: 999 }}>{activeJob.sede}</span>
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.75)", border: "1px solid rgba(255,255,255,.35)", padding: "6px 13px", borderRadius: 999 }}>{activeJob.type}</span>
              </div>
              <button onClick={() => setJobIndex(null)} aria-label={dict.modal.close} className="modal-close" style={{ position: "absolute", top: 18, right: 18, width: 40, height: 40, borderRadius: "50%", border: "none", background: "rgba(255,255,255,.12)", color: "#fff", fontSize: 24, lineHeight: 1, cursor: "pointer", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", transition: "background .3s ease" }}>×</button>
            </div>
            <div style={{ padding: "clamp(28px,4vw,48px)" }}>
              <h3 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(24px,3vw,38px)", lineHeight: 1.12, letterSpacing: "-.02em", color: INK }}>{activeJob.title}</h3>
              <div style={{ marginTop: "clamp(28px,3.4vw,40px)" }}>
                <p style={{ margin: "0 0 12px", fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: TEALD }}>{dict.jobs.roleLabel}</p>
                {activeJob.description.map((par) => (
                  <p key={par} style={{ ...modalPara, marginBottom: 12 }}>{par}</p>
                ))}
              </div>
              {activeJob.requirementGroups.map((g) => (
                <div key={g.label} style={{ marginTop: "clamp(26px,3vw,36px)" }}>
                  <p style={{ margin: "0 0 16px", fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: TEALD }}>{g.label}</p>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {g.items.map((r) => (
                      <li key={r} style={{ display: "flex", gap: 11, alignItems: "flex-start", fontSize: 16, fontWeight: 400, color: INK, lineHeight: 1.45 }}>
                        <span style={{ marginTop: 2, color: TEAL, fontSize: 16 }}>✓</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <a
                href={`mailto:recruitment@gamgroup.it?subject=${encodeURIComponent(`${dict.jobs.mailSubjectPrefix}${activeJob.title}`)}`}
                className="btn-navy"
                style={{ marginTop: "clamp(30px,3.6vw,44px)", display: "inline-flex", alignItems: "center", gap: 9, background: TEALD, color: "#fff", border: "none", borderRadius: 999, padding: "16px 34px", fontSize: 15, fontWeight: 600, textDecoration: "none", cursor: "pointer", transition: "background .3s ease,transform .3s ease" }}
              >
                {dict.jobs.apply}
              </a>
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
            <button onClick={() => setMenuOpen(false)} aria-label={dict.modal.close} style={{ background: "none", border: "none", color: INK, fontSize: 38, lineHeight: 1, cursor: "pointer", fontWeight: 300 }}>×</button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 48 }}>
            {[
              [dict.nav.home, "top"],
              [dict.nav.progetti, "progetti"],
              [dict.nav.servizi, "servizi"],
              [dict.nav.chisiamo, "chisiamo"],
              [dict.nav.jobboard, "jobboard"],
              [dict.nav.contattaci, "contatti"],
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
            <a href={dict.langSwitch.href} style={{ fontFamily: MONO, fontSize: 16, letterSpacing: ".08em", color: GREY, textDecoration: "none", padding: "22px 0", borderTop: "1px solid #DDE6E8", marginTop: 10 }}>
              {dict.langSwitch.menuLabel}
            </a>
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
 * renders the photo in its original colours (Vittoria 2026-07-17 — no duotone
 * here). A soft top scrim keeps the sector/area chips readable on any photo.
 */
function CaseBanner({ p, style, children }: { p: Project; style: CSSProperties; children?: React.ReactNode }) {
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "flex-end", overflow: "hidden", ...cardBanner, ...style }}>
      {p.image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,27,48,.42) 0%, rgba(16,27,48,0) 45%)" }} />
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

function ModalBlock({ label, first, children }: { label: string; first?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: first ? "clamp(28px,3.4vw,40px)" : "clamp(26px,3vw,36px)" }}>
      <p style={{ margin: "0 0 12px", fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: TEALD }}>{label}</p>
      {children}
    </div>
  );
}
