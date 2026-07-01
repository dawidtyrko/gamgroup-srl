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

/* ---- tokens ---- */
const NAVY = "#1B2A4A";
const TEAL = "#3CC8BD";
const PERI = "#647DB6"; // brand periwinkle (from the logo) — 2nd accent, readable on white
const GREY = "#6B7686";
const MUT = "#9aa4b2";
const S2 = "#475569";
const MONO = "'Space Mono', monospace";
const GRO = "'Space Grotesk', sans-serif";

const eyebrow = (color = TEAL): CSSProperties => ({
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
  { name: "Infor", items: ["BAAN", "LN", "M3", "CloudSuite"] },
];

const stats = [
  { value: 20, label: "Anni di esperienza" },
  { value: 50, label: "Esperti qualificati" },
  { value: 130, label: "Clienti soddisfatti" },
  { value: 15, label: "Partner" },
];

const sectors = ["Retail", "Food", "Automotive", "Fashion", "Aerospace", "… and many more"];
const clients = ["Maserati", "Miele", "CNH Industrial", "Geox", "Safilo"];

const jobs = [
  { title: "Consulente SAP S/4HANA", sede: "Treviso", type: "Tempo indeterminato", tags: ["SAP S/4HANA", "FI/CO o MM/SD", "3+ anni"] },
  { title: "Service Manager AMS", sede: "Treviso", type: "Tempo indeterminato", tags: ["ITIL", "Gestione team", "AMS"] },
  { title: "Analista SAP Tecnico-Funzionale", sede: "Treviso", type: "Tempo indeterminato", tags: ["ABAP", "Moduli SAP", "Analisi funzionale"] },
  { title: "IT Specialist", sede: "Treviso", type: "Tempo indeterminato", tags: ["Sistemistica", "Reti", "Help Desk"] },
  { title: "Senior IT Consultant", sede: "Treviso", type: "Tempo indeterminato", tags: ["ERP", "Project Management", "5+ anni"] },
];

const cardBanner: CSSProperties = {
  background:
    "repeating-linear-gradient(135deg,rgba(60,200,189,.12) 0 16px,rgba(255,255,255,0) 16px 32px),linear-gradient(125deg,#22325a,#16233f)",
};

export default function Site({ projects }: { projects: Project[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [projectIndex, setProjectIndex] = useState<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const pinWrap = useRef<HTMLDivElement>(null);
  const pinTrack = useRef<HTMLDivElement>(null);

  /* ---- scroll-driven behaviour (ported from the prototype rAF loop) ---- */
  useEffect(() => {
    let raf = 0;
    let solid: boolean | null = null;
    let curNav: string | null = null;
    let countersDone = false;

    const runCounters = () => {
      const sec = statsRef.current;
      if (!sec) return;
      sec.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseInt(el.getAttribute("data-count") || "0", 10) || 0;
        const suffix = el.getAttribute("data-suffix") || "";
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
        a.style.color = a.getAttribute("data-nav") === key ? TEAL : NAVY;
      });
    };

    const measure = () => {
      const root = rootRef.current;
      if (!root) return;
      const vh = window.innerHeight || 700;
      const scrolled = -root.getBoundingClientRect().top;

      // Hero parallax
      const m = heroMediaRef.current;
      if (m && m.parentElement) {
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

      // Pinned horizontal gallery
      const pw = pinWrap.current;
      const pt = pinTrack.current;
      if (pw && pt) {
        const total = pw.offsetHeight - vh;
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
    };
  }, []);

  /* ---- navigation ---- */
  const goto = (id: string) => {
    setMenuOpen(false);
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

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    setFormSent(true);
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
          <img src="/gam-logo-blue.svg" alt="GAM Group — It's my world" width={77} height={46} style={{ display: "block", height: 46, width: "auto" }} />
        </a>

        <nav ref={navRef} data-desktop-nav style={{ display: "flex", alignItems: "center", gap: 38 }}>
          {[
            ["home", "Home", "top"],
            ["chisiamo", "Chi Siamo", "chisiamo"],
            ["servizi", "Servizi", "servizi"],
            ["progetti", "Progetti", "progetti"],
            ["jobboard", "Job Board", "jobboard"],
          ].map(([key, label, id]) => (
            <a
              key={key}
              data-nav={key}
              className="nav-link"
              href={id === "top" ? "#" : `#${id}`}
              onClick={nav(id)}
              style={{ fontSize: 15, fontWeight: 500, color: NAVY, textDecoration: "none", cursor: "pointer", transition: "color .3s ease" }}
            >
              {label}
            </a>
          ))}
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
              background: NAVY,
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
          <span style={{ display: "block", width: 26, height: 2, background: NAVY, borderRadius: 2 }} />
          <span style={{ display: "block", width: 26, height: 2, background: NAVY, borderRadius: 2 }} />
        </button>
      </header>

      {/* ---- Hero ---- */}
      <section
        id="top"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "150px 6vw 70px",
          background: "#fff",
        }}
      >
        <span data-rise style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: TEAL }}>
          Consulenza IT — System Integration — dal 2001
        </span>
        <h1 style={{ margin: "30px 0 0", fontFamily: GRO, fontWeight: 700, fontSize: "clamp(58px,10vw,164px)", lineHeight: 0.92, letterSpacing: "-.035em", color: NAVY }}>
          <span data-rise style={{ display: "inline-block" }}>
            Benvenuti in
          </span>
          <br />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-rise
            src="/gam-wordmark-blue.svg"
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
            style={{ background: NAVY, color: "#fff", border: "none", borderRadius: 999, padding: "16px 34px", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "background .3s ease,transform .3s ease" }}
          >
            Scopri i servizi
          </button>
          <button
            onClick={nav("contatti")}
            className="btn-ghost"
            style={{ background: "transparent", color: NAVY, border: "1.5px solid #d3dae4", borderRadius: 999, padding: "16px 34px", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "border-color .3s ease,color .3s ease" }}
          >
            Contattaci
          </button>
        </div>
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
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
              "repeating-linear-gradient(135deg,rgba(60,200,189,.10) 0 18px,rgba(255,255,255,0) 18px 36px),linear-gradient(120deg,#1d3056,#16233f 60%,#101b30)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            willChange: "transform",
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".18em", color: "rgba(255,255,255,.22)", textTransform: "uppercase" }}>
            [ team gam — foto a tutta larghezza ]
          </span>
        </div>
      </section>

      {/* ---- Claim ---- */}
      <section style={{ background: "#fff", padding: "clamp(110px,15vw,220px) 6vw" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p data-rise style={{ margin: 0, fontFamily: GRO, fontWeight: 500, fontSize: "clamp(30px,4.6vw,62px)", lineHeight: 1.16, letterSpacing: "-.02em", color: NAVY }}>
            <span style={{ color: MUT }}>Portiamo il tuo business</span> al livello successivo.
            <span style={{ display: "block", marginTop: 18, fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.65, color: GREY, maxWidth: 680 }}>
              Innovare i sistemi IT riduce i costi, aumenta la flessibilità e migliora la qualità dei servizi.
            </span>
          </p>
        </div>
      </section>

      {/* ---- Servizi ---- */}
      <section id="servizi" style={{ background: "#F6F7F9", padding: "clamp(90px,12vw,170px) 6vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-rise style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: "clamp(40px,5vw,70px)" }}>
            <span style={eyebrow()}>01 — 04</span>
            <h2 style={h2}>I nostri servizi</h2>
          </div>
          <div style={{ borderTop: "1px solid rgba(60,200,189,.32)" }}>
            {services.map((svc) => (
              <div
                key={svc.num}
                data-svc-row
                className="svc-row"
                style={{ display: "grid", gridTemplateColumns: "64px minmax(220px,1fr) 1.2fr", gap: 28, alignItems: "center", padding: "clamp(28px,3.4vw,46px) 0", borderBottom: "1px solid rgba(60,200,189,.32)", transition: "padding-left .4s ease", cursor: "default" }}
              >
                <span style={{ fontFamily: MONO, fontSize: 14, color: TEAL }}>{svc.num}</span>
                <div>
                  <h3 style={{ margin: 0, fontFamily: GRO, fontWeight: 500, fontSize: "clamp(22px,2.4vw,34px)", lineHeight: 1.1, letterSpacing: "-.015em", color: NAVY }}>{svc.title}</h3>
                </div>
                <div data-svc-tags style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {svc.tags.map((t) => (
                    <span key={t} className="chip" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".04em", color: "#56627a", border: "1px solid rgba(27,42,74,.16)", borderRadius: 999, padding: "6px 13px" }}>
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
          <div data-chan style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid rgba(60,200,189,.32)", borderLeft: "1px solid rgba(60,200,189,.32)" }}>
            {channels.map((ch) => (
              <div key={ch.name} className="chan-cell" style={{ borderRight: "1px solid rgba(60,200,189,.32)", borderBottom: "1px solid rgba(60,200,189,.32)", padding: "clamp(26px,2.4vw,40px)", minHeight: 260, display: "flex", flexDirection: "column", transition: "background .4s ease" }}>
                <span style={{ fontFamily: GRO, fontWeight: 700, fontSize: "clamp(22px,1.9vw,28px)", letterSpacing: "-.01em", color: NAVY }}>{ch.name}</span>
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
          <p data-rise style={{ margin: "0 0 clamp(40px,5vw,72px)", ...eyebrow(), textAlign: "center" }}>I numeri sono il nostro forte</p>
          <div data-grid-2 style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
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
            <h2 data-rise style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(34px,4.6vw,68px)", lineHeight: 1.02, letterSpacing: "-.025em", color: NAVY }}>Il partner di cui ti puoi fidare.</h2>
            <button data-rise onClick={nav("contatti")} className="btn-ghost" style={{ marginTop: 38, display: "inline-flex", alignItems: "center", gap: 10, background: "transparent", color: NAVY, border: "1.5px solid #d3dae4", borderRadius: 999, padding: "15px 30px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "border-color .3s ease,color .3s ease" }}>
              Parla con noi →
            </button>
          </div>
          <div>
            <p data-rise style={{ margin: 0, fontWeight: 300, fontSize: "clamp(17px,1.7vw,22px)", lineHeight: 1.7, color: S2 }}>
              GAM Group è un’azienda italiana fondata nel <strong style={{ fontWeight: 700, color: PERI }}>2001</strong>, con sede a <strong style={{ fontWeight: 700, color: PERI }}>Treviso</strong>. Da oltre vent’anni affianchiamo le imprese nell’evoluzione e nella gestione dei loro sistemi IT.
            </p>
            <div data-rise style={{ marginTop: 40, paddingTop: 34, borderTop: "1px solid rgba(60,200,189,.32)" }}>
              <p style={{ margin: "0 0 18px", fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: MUT }}>Settori</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {sectors.map((sec) => (
                  <span key={sec} className="chip" style={{ fontFamily: GRO, fontWeight: 500, fontSize: "clamp(15px,1.4vw,19px)", color: NAVY, border: "1px solid rgba(27,42,74,.16)", borderRadius: 999, padding: "9px 18px" }}>{sec}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- I progetti (pinned horizontal gallery) ---- */}
      <section id="progetti" style={{ background: "#101b30" }}>
        <div ref={pinWrap} style={{ position: "relative", height: "340vh" }}>
          <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ padding: "0 6vw", marginBottom: "clamp(28px,4vh,52px)", display: "flex", alignItems: "baseline", gap: 16 }}>
              <span style={eyebrow()}>Case studies</span>
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
                  <div style={{ height: "clamp(200px,30vh,300px)", position: "relative", display: "flex", alignItems: "flex-end", padding: 20, ...cardBanner }}>
                    <span style={{ position: "absolute", top: 20, left: 20, fontFamily: MONO, fontSize: 11, fontWeight: 400, letterSpacing: ".12em", textTransform: "uppercase", color: TEAL, border: "1px solid rgba(60,200,189,.5)", padding: "6px 13px", borderRadius: 999 }}>{p.sector}</span>
                    <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".12em", color: "rgba(255,255,255,.4)", textTransform: "uppercase" }}>{p.img}</span>
                  </div>
                  <div style={{ padding: 30, display: "flex", flexDirection: "column", gap: 22, minHeight: 200 }}>
                    <h3 style={{ margin: 0, fontFamily: GRO, fontWeight: 500, fontSize: "clamp(20px,1.8vw,26px)", lineHeight: 1.28, color: "#fff" }}>{p.title}</h3>
                    <span style={{ marginTop: "auto", fontFamily: MONO, fontSize: 13, letterSpacing: ".04em", color: TEAL }}>Leggi il case study →</span>
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
        <p data-rise style={{ margin: "0 0 clamp(40px,5vw,64px)", textAlign: "center", ...eyebrow(MUT), padding: "0 6vw" }}>Alcuni dei nostri clienti</p>
        <div style={{ display: "flex", width: "max-content", gap: 88, animation: "gam-marq 28s linear infinite", paddingLeft: 88 }}>
          {[...clients, ...clients].map((c, i) => (
            <span key={`${c}-${i}`} style={{ fontFamily: GRO, fontWeight: 700, fontSize: "clamp(26px,3.2vw,44px)", letterSpacing: "-.01em", color: "#c2c9d3", whiteSpace: "nowrap" }}>{c}</span>
          ))}
        </div>
      </section>

      {/* ---- Job Board ---- */}
      <section id="jobboard" style={{ background: "#F6F7F9", padding: "clamp(90px,12vw,170px) 6vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-rise style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 18 }}>
            <span style={eyebrow()}>Lavora con noi</span>
            <h2 style={h2}>Entra in GAM</h2>
          </div>
          <p data-rise style={{ margin: "0 0 clamp(40px,5vw,64px)", maxWidth: 560, fontWeight: 300, fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.6, color: GREY }}>
            Unisciti a un team di esperti IT. Le posizioni aperte, in continua crescita.
          </p>
          <div style={{ borderTop: "1px solid rgba(60,200,189,.32)" }}>
            {jobs.map((job) => (
              <div key={job.title} data-job-row className="job-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, padding: "clamp(26px,3vw,40px) 0", borderBottom: "1px solid rgba(60,200,189,.32)", transition: "padding-left .4s ease" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ margin: 0, fontFamily: GRO, fontWeight: 500, fontSize: "clamp(22px,2.4vw,32px)", lineHeight: 1.1, letterSpacing: "-.015em", color: NAVY }}>{job.title}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".04em", color: GREY }}>{job.sede}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#c2c9d3" }} />
                    <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".04em", color: GREY }}>{job.type}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {job.tags.map((t) => (
                      <span key={t} className="chip" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".04em", color: "#56627a", border: "1px solid rgba(27,42,74,.16)", borderRadius: 999, padding: "6px 13px" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <a
                  href={`mailto:recruitment@gamgroup.it?subject=${encodeURIComponent(`Candidatura: ${job.title}`)}`}
                  className="btn-navy"
                  style={{ flex: "none", display: "inline-flex", alignItems: "center", gap: 9, background: NAVY, color: "#fff", borderRadius: 999, padding: "14px 28px", fontSize: 15, fontWeight: 600, textDecoration: "none", transition: "background .3s ease,transform .3s ease" }}
                >
                  Candidati ora →
                </a>
              </div>
            ))}
          </div>
          <p data-rise style={{ margin: "clamp(36px,4vw,52px) 0 0", fontWeight: 300, fontSize: 16, color: GREY }}>
            Candidatura spontanea — invia il CV a{" "}
            <a href="mailto:recruitment@gamgroup.it" style={{ color: NAVY, fontWeight: 500, textDecoration: "none", borderBottom: `1px solid ${TEAL}` }}>recruitment@gamgroup.it</a>
          </p>
        </div>
      </section>

      {/* ---- Contatti ---- */}
      <section id="contatti" style={{ background: NAVY, padding: "clamp(90px,12vw,170px) 6vw", color: "#fff" }}>
        <div data-grid-2 style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: "clamp(44px,7vw,110px)", alignItems: "start" }}>
          <div>
            <p data-rise style={{ margin: "0 0 22px", ...eyebrow() }}>Contatti</p>
            <h2 data-rise style={{ margin: 0, maxWidth: "15ch", fontFamily: GRO, fontWeight: 700, fontSize: "clamp(34px,4.8vw,66px)", lineHeight: 1.02, letterSpacing: "-.025em", color: "#fff" }}>Scopriamo insieme cosa possiamo fare.</h2>
            <div data-rise style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 16, fontWeight: 300, fontSize: 18 }}>
              <span style={{ color: "rgba(255,255,255,.75)" }}>Via Callalta 31/E – 31100 Treviso</span>
              <a href="mailto:info@gamgroup.it" className="link-teal-white" style={{ color: TEAL, textDecoration: "none", transition: "color .3s ease" }}>info@gamgroup.it</a>
              <a href="tel:+390422583693" className="link-teal-white" style={{ color: TEAL, textDecoration: "none", transition: "color .3s ease" }}>+39 0422 583693</a>
            </div>
          </div>
          <div data-rise>
            {!formSent ? (
              <form onSubmit={submitForm} style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                <div data-form-row style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
                  <Field label="Nome" type="text" />
                  <Field label="Cognome" type="text" />
                </div>
                <Field label="Email" type="email" />
                <label style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={fieldLabel}>Messaggio</span>
                  <textarea rows={3} placeholder="Scrivi qui il tuo messaggio" className="field-input" style={{ ...fieldInput, resize: "vertical" }} />
                </label>
                <button type="submit" className="btn-teal" style={{ alignSelf: "flex-start", background: TEAL, color: "#06231f", border: "none", borderRadius: 999, padding: "16px 46px", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "background .3s ease,transform .3s ease" }}>Invia</button>
              </form>
            ) : (
              <div style={{ border: "1px solid rgba(60,200,189,.4)", borderRadius: 20, padding: "48px 40px", background: "rgba(60,200,189,.08)" }}>
                <div style={{ fontSize: 40, lineHeight: 1, color: TEAL, marginBottom: 18 }}>✓</div>
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
        <span>© 2026 GAM Group Srl — Via Callalta 31/E, 31100 Treviso (TV)</span>
      </footer>

      {/* ---- Case study modal ---- */}
      {activeProject && (
        <div onClick={() => setProjectIndex(null)} style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(16,27,48,.62)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, maxWidth: 720, width: "100%", maxHeight: "88vh", overflow: "auto", boxShadow: "0 40px 100px rgba(16,27,48,.45)" }}>
            <div style={{ position: "relative", height: "clamp(160px,22vw,220px)", display: "flex", alignItems: "flex-end", padding: 24, ...cardBanner }}>
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: TEAL, border: "1px solid rgba(60,200,189,.5)", padding: "6px 13px", borderRadius: 999 }}>{activeProject.sector}</span>
              <button onClick={() => setProjectIndex(null)} aria-label="Chiudi" className="modal-close" style={{ position: "absolute", top: 18, right: 18, width: 40, height: 40, borderRadius: "50%", border: "none", background: "rgba(255,255,255,.12)", color: "#fff", fontSize: 24, lineHeight: 1, cursor: "pointer", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", transition: "background .3s ease" }}>×</button>
            </div>
            <div style={{ padding: "clamp(28px,4vw,48px)" }}>
              <h3 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(24px,3vw,38px)", lineHeight: 1.12, letterSpacing: "-.02em", color: NAVY }}>{activeProject.title}</h3>
              <ModalBlock label="La sfida">
                <p style={modalPara}>{activeProject.challenge}</p>
              </ModalBlock>
              <ModalBlock label="Il progetto">
                <p style={modalPara}>{activeProject.description}</p>
              </ModalBlock>
              <div style={{ marginTop: "clamp(26px,3vw,36px)" }}>
                <p style={{ margin: "0 0 16px", fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: TEAL }}>Benefici</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {activeProject.benefits.map((b) => (
                    <li key={b} style={{ display: "flex", gap: 11, alignItems: "flex-start", fontSize: 16, fontWeight: 400, color: NAVY, lineHeight: 1.4 }}>
                      <span style={{ marginTop: 2, color: TEAL, fontSize: 16 }}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={nav("contatti")} className="btn-navy" style={{ marginTop: "clamp(30px,3.6vw,44px)", background: NAVY, color: "#fff", border: "none", borderRadius: 999, padding: "16px 34px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "background .3s ease,transform .3s ease" }}>Parla con noi del tuo progetto →</button>
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
              <img src="/gam-logo-blue.svg" alt="GAM Group — It's my world" width={80} height={48} style={{ display: "block", height: 48, width: "auto" }} />
            </div>
            <button onClick={() => setMenuOpen(false)} aria-label="Chiudi" style={{ background: "none", border: "none", color: NAVY, fontSize: 38, lineHeight: 1, cursor: "pointer", fontWeight: 300 }}>×</button>
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
                style={{ fontFamily: GRO, fontSize: 30, fontWeight: 500, color: id === "contatti" ? TEAL : NAVY, textDecoration: "none", padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(27,42,74,.1)" : "none" }}
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

function Field({ label, type }: { label: string; type: string }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={fieldLabel}>{label}</span>
      <input type={type} required className="field-input" style={fieldInput} />
    </label>
  );
}

function ModalBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: label === "La sfida" ? "clamp(28px,3.4vw,40px)" : "clamp(26px,3vw,36px)" }}>
      <p style={{ margin: "0 0 12px", fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: TEAL }}>{label}</p>
      {children}
    </div>
  );
}
