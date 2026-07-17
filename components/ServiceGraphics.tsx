/**
 * Animated service diagrams — Vittoria's "clean" (label-free) handoff graphics,
 * inlined as SVG so they animate and stay a few KB (originals in
 * design-reference/gam-0X-*.html). Shown in the collapsed accordion row as a
 * placeholder; the labelled PNG version appears in the expanded detail.
 * Shared styles live in globals.css under the svcg- prefix.
 * Index matches the services order; null = graphic not delivered yet (03, 04).
 */

/** 01 · Consulenza Tecnica ERP — ERP core with lifecycle ring + system chips */
function ErpGraphic() {
  return (
    <svg
      className="svcg"
      viewBox="0 0 600 340"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Il sistema ERP al centro, gestito lungo tutto il suo ciclo di vita, con i gestionali collegati"
    >
      <ellipse className="svcg-ring" cx="300" cy="170" rx="150" ry="118" />
      <path className="svcg-arc" d="M300,52 A150,118 0 0 1 450,170" markerEnd="url(#svcg-ah)" />
      <defs>
        <marker id="svcg-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,1 L9,5 L0,9" fill="none" stroke="#BFD9DE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      <g className="svcg-chip">
        <rect x="256" y="36" width="88" height="32" rx="16" />
        <rect x="418" y="154" width="88" height="32" rx="16" />
        <rect x="256" y="272" width="88" height="32" rx="16" />
        <rect x="94" y="154" width="88" height="32" rx="16" />
      </g>
      <g fill="#4D93A2">
        <circle cx="300" cy="52" r="4" />
        <circle cx="450" cy="170" r="4" />
        <circle cx="300" cy="288" r="4" />
        <circle cx="150" cy="170" r="4" />
      </g>
      <g className="svcg-g" stroke="#4D93A2">
        <path d="M292,52 h16 M300,44 v16" />
      </g>

      <circle className="svcg-halo" cx="300" cy="170" r="62" style={{ transformOrigin: "300px 170px" }} />

      <rect x="248" y="130" width="104" height="80" rx="14" fill="#4D93A2" />
      <g className="svcg-g">
        <path d="M268,148 H332" />
        <path d="M268,162 H332" />
        <path d="M268,176 H312" />
        <path d="M268,190 H312" />
      </g>
      <circle cx="326" cy="188" r="3.5" fill="#BFD9DE" />
    </svg>
  );
}

/** 02 · Consulenza Applicativa, AI & BI — data in, AI core, dashboard out */
function AiBiGraphic() {
  return (
    <svg
      className="svcg"
      viewBox="0 0 600 340"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="I dati entrano, l'AI li elabora, esce una dashboard con andamento in crescita"
    >
      <path className="svcg-link" id="svcg-s1" d="M110,86 C170,86 190,170 224,170" />
      <path className="svcg-link" id="svcg-s2" d="M96,170 C160,170 196,170 224,170" />
      <path className="svcg-link" id="svcg-s3" d="M110,254 C170,254 190,170 224,170" />
      <g className="svcg-chip-l">
        <rect x="34" y="70" width="76" height="32" rx="9" />
        <rect x="20" y="154" width="76" height="32" rx="9" />
        <rect x="34" y="238" width="76" height="32" rx="9" />
      </g>
      <g stroke="#C6D2D8" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M52,80 h18 M52,86 h30 M52,92 h24" />
        <path d="M38,164 h18 M38,170 h30 M38,176 h24" />
        <path d="M52,248 h18 M52,254 h30 M52,260 h24" />
      </g>

      <path className="svcg-link-on" id="svcg-s4" d="M316,170 C348,170 352,170 380,170" />

      <rect x="380" y="72" width="196" height="196" rx="16" fill="#fff" stroke="#DDE6E8" strokeWidth="1.8" />
      <path d="M380,104 H576" stroke="#DDE6E8" strokeWidth="1.5" />
      <circle cx="398" cy="88" r="3.5" fill="#BFD9DE" />
      <circle cx="410" cy="88" r="3.5" fill="#DDE6E8" />
      <rect x="404" y="204" width="22" height="40" rx="5" className="svcg-bar-l" />
      <rect x="434" y="184" width="22" height="60" rx="5" className="svcg-bar-l" />
      <rect x="464" y="158" width="22" height="86" rx="5" className="svcg-bar" />
      <rect x="494" y="138" width="22" height="106" rx="5" className="svcg-bar" />
      <rect x="524" y="114" width="22" height="130" rx="5" className="svcg-bar" />
      <path d="M415,196 L445,176 L475,150 L505,130 L535,106" fill="none" stroke="#35707E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="535" cy="106" r="5" fill="#35707E" />

      <circle className="svcg-halo" cx="270" cy="170" r="46" style={{ transformOrigin: "270px 170px" }} />
      <circle className="svcg-core" cx="270" cy="170" r="46" />
      <g className="svcg-g">
        <circle cx="270" cy="170" r="5.5" fill="none" />
        <circle cx="252" cy="152" r="3.5" fill="#fff" stroke="none" />
        <circle cx="288" cy="152" r="3.5" fill="#fff" stroke="none" />
        <circle cx="252" cy="188" r="3.5" fill="#fff" stroke="none" />
        <circle cx="288" cy="188" r="3.5" fill="#fff" stroke="none" />
        <path d="M255,155 L266,166 M285,155 L274,166 M255,185 L266,174 M285,185 L274,174" />
      </g>

      <circle className="svcg-dot" r="4">
        <animateMotion dur="2.4s" begin="-0.1s" repeatCount="indefinite">
          <mpath href="#svcg-s1" xlinkHref="#svcg-s1" />
        </animateMotion>
      </circle>
      <circle className="svcg-dot" r="4">
        <animateMotion dur="2.4s" begin="-0.9s" repeatCount="indefinite">
          <mpath href="#svcg-s2" xlinkHref="#svcg-s2" />
        </animateMotion>
      </circle>
      <circle className="svcg-dot" r="4">
        <animateMotion dur="2.4s" begin="-1.7s" repeatCount="indefinite">
          <mpath href="#svcg-s3" xlinkHref="#svcg-s3" />
        </animateMotion>
      </circle>
      <circle className="svcg-dot" r="4">
        <animateMotion dur="2.4s" begin="-0.5s" repeatCount="indefinite">
          <mpath href="#svcg-s4" xlinkHref="#svcg-s4" />
        </animateMotion>
      </circle>
    </svg>
  );
}

export const serviceGraphics: (JSX.Element | null)[] = [
  <ErpGraphic key="erp" />,
  <AiBiGraphic key="ai-bi" />,
  null, // 03 sviluppo & integration — clean version not delivered yet
  null, // 04 assistenza — clean version not delivered yet
];
