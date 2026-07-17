/**
 * Animated service diagrams — Vittoria's "clean" (label-free) handoff graphics,
 * inlined as SVG so they animate and stay a few KB (originals in
 * design-reference/gam-0X-*.html). Shown in the collapsed accordion row as a
 * placeholder; the labelled PNG version appears in the expanded detail.
 * Shared styles live in globals.css under the svcg- prefix.
 * Index matches the services order.
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

/** 03 · Sviluppo & System Integration — scattered systems into one connected grid */
function IntegrationGraphic() {
  return (
    <svg
      className="svcg"
      viewBox="0 0 600 340"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sistemi separati che diventano un ecosistema unico e connesso"
    >
      <path className="svcg-link" id="svcg-t1" d="M118,84 C176,84 196,170 226,170" />
      <path className="svcg-link" id="svcg-t2" d="M104,170 C170,170 200,170 226,170" />
      <path className="svcg-link" id="svcg-t3" d="M118,256 C176,256 196,170 226,170" />
      <g className="svcg-chip-l">
        <rect x="40" y="62" width="78" height="44" rx="10" transform="rotate(-8 79 84)" />
        <rect x="26" y="148" width="78" height="44" rx="10" transform="rotate(5 65 170)" />
        <rect x="40" y="234" width="78" height="44" rx="10" transform="rotate(-5 79 256)" />
      </g>
      <g stroke="#C6D2D8" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M62,80 h30 M62,90 h18" transform="rotate(-8 79 84)" />
        <path d="M48,166 h30 M48,176 h18" transform="rotate(5 65 170)" />
        <path d="M62,252 h30 M62,262 h18" transform="rotate(-5 79 256)" />
      </g>

      <path className="svcg-link-on" id="svcg-t4" d="M314,170 C344,170 350,170 378,170" />

      <rect x="378" y="82" width="192" height="176" rx="16" fill="#fff" stroke="#4D93A2" strokeWidth="1.8" />
      <g stroke="#BFD9DE" strokeWidth="1.8" fill="none">
        <path d="M426,130 H522 M426,210 H522 M426,130 V210 M522,130 V210 M474,130 V210 M426,170 H522" />
      </g>
      <g>
        <rect x="406" y="110" width="40" height="40" rx="9" fill="#4D93A2" />
        <rect x="502" y="110" width="40" height="40" rx="9" fill="#4D93A2" opacity=".68" />
        <rect x="406" y="190" width="40" height="40" rx="9" fill="#4D93A2" opacity=".68" />
        <rect x="502" y="190" width="40" height="40" rx="9" fill="#4D93A2" />
      </g>
      <circle cx="474" cy="170" r="9" fill="#35707E" />

      <circle className="svcg-halo" cx="270" cy="170" r="44" style={{ transformOrigin: "270px 170px" }} />
      <circle className="svcg-core" cx="270" cy="170" r="44" />
      <g className="svcg-g">
        <path d="M256,156 L244,170 L256,184" />
        <path d="M284,156 L296,170 L284,184" />
        <path d="M276,152 L264,188" />
      </g>

      <circle className="svcg-dot" r="4">
        <animateMotion dur="2.3s" begin="-0.2s" repeatCount="indefinite">
          <mpath href="#svcg-t1" xlinkHref="#svcg-t1" />
        </animateMotion>
      </circle>
      <circle className="svcg-dot" r="4">
        <animateMotion dur="2.3s" begin="-1s" repeatCount="indefinite">
          <mpath href="#svcg-t2" xlinkHref="#svcg-t2" />
        </animateMotion>
      </circle>
      <circle className="svcg-dot" r="4">
        <animateMotion dur="2.3s" begin="-1.8s" repeatCount="indefinite">
          <mpath href="#svcg-t3" xlinkHref="#svcg-t3" />
        </animateMotion>
      </circle>
      <circle className="svcg-dot" r="4">
        <animateMotion dur="2.3s" begin="-0.6s" repeatCount="indefinite">
          <mpath href="#svcg-t4" xlinkHref="#svcg-t4" />
        </animateMotion>
      </circle>
    </svg>
  );
}

/** 04 · Assistenza & Manutenzione — shield with patrolling dots on an orbit */
function AssistenzaGraphic() {
  return (
    <svg
      className="svcg"
      viewBox="0 0 600 340"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="L'infrastruttura protetta e monitorata da un presidio continuo"
    >
      <ellipse className="svcg-ring" id="svcg-orbit" cx="300" cy="170" rx="152" ry="120" />
      <ellipse className="svcg-ring" cx="300" cy="170" rx="108" ry="84" strokeDasharray="3 8" stroke="#BFD9DE" strokeWidth="1.6" />

      <g className="svcg-chip">
        <rect x="264" y="34" width="72" height="30" rx="15" />
        <rect x="420" y="155" width="72" height="30" rx="15" />
        <rect x="264" y="276" width="72" height="30" rx="15" />
        <rect x="108" y="155" width="72" height="30" rx="15" />
      </g>
      <g stroke="#4D93A2" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M292,49 h16 M300,41 v16" />
        <path d="M448,163 l8,7 -8,7 M464,163 l-8,7 8,7" />
        <path d="M292,291 h16 M300,283 v16" />
        <path d="M136,285 m0,0" />
        <circle cx="144" cy="170" r="5" />
        <path d="M152,170 h10" />
      </g>

      <path d="M300,116 L344,134 V176 C344,204 324,222 300,230 C276,222 256,204 256,176 V134 Z" fill="#4D93A2" />
      <g className="svcg-g">
        <path d="M280,172 L294,186 L322,156" />
      </g>
      <circle className="svcg-halo" cx="300" cy="173" r="58" style={{ transformOrigin: "300px 173px" }} />

      <circle className="svcg-dot" r="5.5">
        <animateMotion dur="5.4s" repeatCount="indefinite">
          <mpath href="#svcg-orbit" xlinkHref="#svcg-orbit" />
        </animateMotion>
      </circle>
      <circle className="svcg-dot" r="4" opacity=".45">
        <animateMotion dur="5.4s" begin="-2.7s" repeatCount="indefinite">
          <mpath href="#svcg-orbit" xlinkHref="#svcg-orbit" />
        </animateMotion>
      </circle>
    </svg>
  );
}

export const serviceGraphics: (JSX.Element | null)[] = [
  <ErpGraphic key="erp" />,
  <AiBiGraphic key="ai-bi" />,
  <IntegrationGraphic key="integration" />,
  <AssistenzaGraphic key="assistenza" />,
];
