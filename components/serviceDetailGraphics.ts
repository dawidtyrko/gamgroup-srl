/**
 * Detailed labelled service diagrams — Vittoria's richer handoff graphics
 * (gam-servizio-0X-*.html, 2026-07-20), shown FULL-SIZE in the expanded
 * accordion panel. The small ServiceGraphics.tsx set stays in the collapsed
 * rows. Stored as raw SVG (injected via dangerouslySetInnerHTML) so the dense
 * handoff markup and its SMIL animations survive verbatim; element ids are
 * pre-namespaced per service (-d1..-d4) so the four graphics can coexist in
 * the DOM. Styles are scoped under .svc-detail-graphic in globals.css.
 * Index matches the services order.
 */
export const serviceDetailGraphics: string[] = [
  // erp
  `<svg viewBox="0 0 1040 660" xmlns="http://www.w3.org/2000/svg" role="img"
         aria-label="Il ciclo di vita dell'ERP in cinque fasi attorno al sistema, con i gestionali gestiti">
  <defs>
    <marker id="ar-d1" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
      <path d="M0,1.5 L8,5 L0,8.5" fill="none" stroke="#BFD9DE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
      <text class="kicker" x="520" y="34" text-anchor="middle">IL CICLO DI VITA DEL TUO ERP</text>
      <ellipse cx="520" cy="300" rx="290" ry="182" fill="none" stroke="#EDF2F4" stroke-width="2"/>
      <path class="flow-d" id="c1-d1" d="M520,118 A290,182 0 0 1 796,246" marker-end="url(#ar-d1)"/>
      <path class="flow-d" id="c2-d1" d="M800,352 A290,182 0 0 1 640,472" marker-end="url(#ar-d1)"/>
      <path class="flow-d" id="c3-d1" d="M400,472 A290,182 0 0 1 240,352" marker-end="url(#ar-d1)"/>
      <path class="flow-d" id="c4-d1" d="M244,246 A290,182 0 0 1 520,118" marker-end="url(#ar-d1)"/>
    <circle cx="520" cy="118" r="30" fill="#4D93A2"/>
    <circle cx="542" cy="96" r="10" fill="#35707E"/>
    <text class="num" x="542" y="96" text-anchor="middle" dominant-baseline="central">1</text>
    <g class="g" transform="translate(509,107)"><circle cx="9" cy="9" r="7" fill="none"/><path d="M14.5,14.5 L21,21"/></g>
      <text class="stage-l" x="520" y="66" text-anchor="middle">Analisi</text>
    <circle cx="796" cy="246" r="30" fill="#4D93A2"/>
    <circle cx="818" cy="224" r="10" fill="#35707E"/>
    <text class="num" x="818" y="224" text-anchor="middle" dominant-baseline="central">2</text>
    <g class="g" transform="translate(785,235)"><path d="M11,1 L21,6 V16 L11,21 L1,16 V6 Z"/><path d="M1,6 L11,11 L21,6 M11,11 V21"/></g>
      <text class="stage-l" x="878" y="242">Implementazione</text>
      <text class="stage-s" x="878" y="264">Go live senza fermi</text>
    <circle cx="730" cy="452" r="30" fill="#4D93A2"/>
    <circle cx="752" cy="430" r="10" fill="#35707E"/>
    <text class="num" x="752" y="430" text-anchor="middle" dominant-baseline="central">3</text>
    <g class="g" transform="translate(719,441)"><path d="M4,3 V19 M11,3 V19 M18,3 V19"/><circle cx="4" cy="8" r="2.6" fill="#4D93A2"/><circle cx="11" cy="14" r="2.6" fill="#4D93A2"/><circle cx="18" cy="7" r="2.6" fill="#4D93A2"/></g>
      <text class="stage-l" x="778" y="448">Personalizzazione</text>
      <text class="stage-s" x="778" y="470">Sul tuo processo</text>
    <circle cx="310" cy="452" r="30" fill="#4D93A2"/>
    <circle cx="332" cy="430" r="10" fill="#35707E"/>
    <text class="num" x="332" y="430" text-anchor="middle" dominant-baseline="central">4</text>
    <g class="g" transform="translate(299,441)"><path d="M11,20 V4 M4,11 L11,4 L18,11"/></g>
      <text class="stage-l" x="262" y="448" text-anchor="end">Aggiornamento</text>
      <text class="stage-s" x="262" y="470" text-anchor="end">Sempre alla versione giusta</text>
    <circle cx="244" cy="246" r="30" fill="#4D93A2"/>
    <circle cx="266" cy="224" r="10" fill="#35707E"/>
    <text class="num" x="266" y="224" text-anchor="middle" dominant-baseline="central">5</text>
    <g class="g" transform="translate(233,235)"><path d="M11,1 L20,5 V11 C20,16.5 15.5,20 11,21.5 C6.5,20 2,16.5 2,11 V5 Z"/><path d="M7.5,11 L10,13.5 L15,8"/></g>
      <text class="stage-l" x="162" y="242" text-anchor="end">AMS</text>
      <text class="stage-s" x="162" y="264" text-anchor="end">Presidio continuo</text>
      <ellipse class="halo" cx="520" cy="304" rx="104" ry="56" style="transform-origin:520px 304px"/>
      <rect x="416" y="248" width="208" height="112" rx="18" fill="#4D93A2"/>
      <g class="g" transform="translate(0,4)">
        <path d="M452,282 H588"/><path d="M452,302 H588"/><path d="M452,322 H548"/>
      </g>
      <circle cx="576" cy="326" r="5" fill="#BFD9DE"/>
      <text x="520" y="236" text-anchor="middle" font-size="13" font-weight="600" fill="#35707E" letter-spacing="3">ERP</text>
      <circle class="dot" r="4.5"><animateMotion dur="2.6s" begin="-0.2s" repeatCount="indefinite"><mpath href="#c1-d1"/></animateMotion></circle>
      <circle class="dot" r="4.5"><animateMotion dur="2.6s" begin="-0.9s" repeatCount="indefinite"><mpath href="#c2-d1"/></animateMotion></circle>
      <circle class="dot" r="4.5"><animateMotion dur="2.6s" begin="-1.6s" repeatCount="indefinite"><mpath href="#c3-d1"/></animateMotion></circle>
      <circle class="dot" r="4.5"><animateMotion dur="2.6s" begin="-2.2s" repeatCount="indefinite"><mpath href="#c4-d1"/></animateMotion></circle>
      <text class="kicker" x="520" y="576" text-anchor="middle">I SISTEMI CHE GESTIAMO</text>
      <g fill="#fff" stroke="#BFD9DE" stroke-width="1.5">
        <rect x="176" y="600" width="82"  height="34" rx="17"/>
        <rect x="270" y="600" width="72"  height="34" rx="17"/>
        <rect x="354" y="600" width="130" height="34" rx="17"/>
        <rect x="496" y="600" width="82"  height="34" rx="17"/>
        <rect x="590" y="600" width="130" height="34" rx="17"/>
        <rect x="732" y="600" width="112" height="34" rx="17"/>
      </g>
      <g class="chip-t" text-anchor="middle" dominant-baseline="central">
        <text x="217" y="618">SAP</text>
        <text x="306" y="618">JDE</text>
        <text x="419" y="618">IBM i-Series</text>
        <text x="537" y="618">Infor</text>
        <text x="655" y="618">Oracle Cloud</text>
        <text x="788" y="618">NetSuite</text>
      </g>
    </svg>`,
  // ai-bi
  `<svg viewBox="0 0 1040 620" xmlns="http://www.w3.org/2000/svg" role="img"
         aria-label="Dai dati sparsi ai modelli AI, alla dashboard, fino alle decisioni">
  <defs>
    <marker id="ar-d2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
      <path d="M0,1.5 L8,5 L0,8.5" fill="none" stroke="#BFD9DE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
      <text class="kicker" x="520" y="36" text-anchor="middle">DAL DATO ALLA DECISIONE</text>
      <path class="flow-d" id="f1-d2" d="M196,220 H302" marker-end="url(#ar-d2)"/>
      <path class="flow-d" id="f2-d2" d="M436,220 H542" marker-end="url(#ar-d2)"/>
      <path class="flow-d" id="f3-d2" d="M676,220 H782" marker-end="url(#ar-d2)"/>
      <rect x="46" y="140" width="150" height="160" rx="18" fill="#fff" stroke="#DDE6E8" stroke-width="2"/>
      <g stroke="#C6D2D8" stroke-width="2" fill="none" stroke-linecap="round">
        <path d="M84,178 h74 M84,196 h50 M84,214 h74 M84,232 h40 M84,250 h62"/>
      </g>
      <circle cx="72" cy="178" r="4" fill="#DDE6E8"/><circle cx="72" cy="196" r="4" fill="#DDE6E8"/>
      <circle cx="72" cy="214" r="4" fill="#DDE6E8"/><circle cx="72" cy="232" r="4" fill="#DDE6E8"/>
      <circle cx="72" cy="250" r="4" fill="#DDE6E8"/>
      <text class="stage-l" x="121" y="348" text-anchor="middle">Dati sparsi</text>
      <text class="stage-s" x="121" y="372" text-anchor="middle">ERP, gestionali, fogli,</text>
      <text class="stage-s" x="121" y="392" text-anchor="middle">fonti diverse</text>
      <rect class="halo" x="302" y="140" width="134" height="160" rx="18" fill="none" style="transform-origin:369px 220px"/>
      <rect x="302" y="140" width="134" height="160" rx="18" fill="#4D93A2"/>
      <g class="g">
        <circle cx="369" cy="220" r="7" fill="none"/>
        <circle cx="343" cy="192" r="4.5" fill="#fff" stroke="none"/>
        <circle cx="395" cy="192" r="4.5" fill="#fff" stroke="none"/>
        <circle cx="343" cy="248" r="4.5" fill="#fff" stroke="none"/>
        <circle cx="395" cy="248" r="4.5" fill="#fff" stroke="none"/>
        <path d="M347,196 L364,214 M391,196 L374,214 M347,244 L364,226 M391,244 L374,226"/>
      </g>
      <text class="stage-l" x="369" y="348" text-anchor="middle">Modelli e AI</text>
      <text class="stage-s" x="369" y="372" text-anchor="middle">Analisi predittiva,</text>
      <text class="stage-s" x="369" y="392" text-anchor="middle">agenti e copilot</text>
      <rect x="542" y="140" width="134" height="160" rx="18" fill="#fff" stroke="#4D93A2" stroke-width="2"/>
      <path d="M542,170 H676" stroke="#DDE6E8" stroke-width="1.6"/>
      <circle cx="558" cy="155" r="3.4" fill="#BFD9DE"/><circle cx="569" cy="155" r="3.4" fill="#DDE6E8"/>
      <g style="transform-origin:0 282px">
        <rect class="rise" x="562" y="248" width="17" height="34" rx="4" fill="#BFD9DE" style="transform-origin:570px 282px;animation-delay:0s"/>
        <rect class="rise" x="586" y="230" width="17" height="52" rx="4" fill="#BFD9DE" style="transform-origin:594px 282px;animation-delay:.2s"/>
        <rect class="rise" x="610" y="206" width="17" height="76" rx="4" fill="#4D93A2" style="transform-origin:618px 282px;animation-delay:.4s"/>
        <rect class="rise" x="634" y="186" width="17" height="96" rx="4" fill="#4D93A2" style="transform-origin:642px 282px;animation-delay:.6s"/>
      </g>
      <path d="M570,240 L594,222 L618,198 L642,180" fill="none" stroke="#35707E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="642" cy="180" r="4.5" fill="#35707E"/>
      <text class="stage-l" x="609" y="348" text-anchor="middle">Dashboard</text>
      <text class="stage-s" x="609" y="372" text-anchor="middle">KPI in tempo reale,</text>
      <text class="stage-s" x="609" y="392" text-anchor="middle">tutto in un posto</text>
      <rect x="782" y="140" width="150" height="160" rx="18" fill="#fff" stroke="#DDE6E8" stroke-width="2"/>
      <g class="gt">
        <path d="M834,252 L834,206"/>
        <path d="M816,224 L834,206 L852,224"/>
        <circle cx="857" cy="186" r="4" fill="#35707E" stroke="none"/>
        <path d="M812,268 h44"/>
      </g>
      <path d="M857,186 m-20,0 a20,20 0 0 1 20,-20" fill="none" stroke="#BFD9DE" stroke-width="2" stroke-linecap="round"/>
      <text class="stage-l" x="857" y="348" text-anchor="middle">Decisioni</text>
      <text class="stage-s" x="857" y="372" text-anchor="middle">Azioni misurabili,</text>
      <text class="stage-s" x="857" y="392" text-anchor="middle">non intuizioni</text>
      <circle class="dot" r="4.5"><animateMotion dur="2.2s" begin="-0.1s" repeatCount="indefinite"><mpath href="#f1-d2"/></animateMotion></circle>
      <circle class="dot" r="4.5"><animateMotion dur="2.2s" begin="-0.8s" repeatCount="indefinite"><mpath href="#f2-d2"/></animateMotion></circle>
      <circle class="dot" r="4.5"><animateMotion dur="2.2s" begin="-1.5s" repeatCount="indefinite"><mpath href="#f3-d2"/></animateMotion></circle>
      <text class="kicker" x="520" y="502" text-anchor="middle">COSA METTIAMO IN CAMPO</text>
      <g fill="#fff" stroke="#BFD9DE" stroke-width="1.5">
        <rect x="150" y="526" width="168" height="34" rx="17"/>
        <rect x="330" y="526" width="160" height="34" rx="17"/>
        <rect x="502" y="526" width="196" height="34" rx="17"/>
        <rect x="710" y="526" width="180" height="34" rx="17"/>
      </g>
      <g class="chip-t" text-anchor="middle" dominant-baseline="central">
        <text x="234" y="544">Project Management</text>
        <text x="410" y="544">Lean Management</text>
        <text x="600" y="544">Business Intelligence</text>
        <text x="800" y="544">AI Agents / Copilot</text>
      </g>
    </svg>`,
  // integration
  `<svg viewBox="0 0 1040 640" xmlns="http://www.w3.org/2000/svg" role="img"
         aria-label="La catena end to end in sette tappe, e il risultato: da sistemi separati a un ecosistema unico">
  <defs>
    <marker id="ar-d3" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
      <path d="M0,1.5 L8,5 L0,8.5" fill="none" stroke="#BFD9DE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
      <text class="kicker" x="520" y="36" text-anchor="middle">UN PERCORSO END TO END</text>
      <path class="flow-d" id="h1-d3" d="M132,150 H166" marker-end="url(#ar-d3)"/>
      <path class="flow-d" id="h2-d3" d="M266,150 H300" marker-end="url(#ar-d3)"/>
      <path class="flow-d" id="h3-d3" d="M400,150 H434" marker-end="url(#ar-d3)"/>
      <path class="flow-d" id="h4-d3" d="M534,150 H568" marker-end="url(#ar-d3)"/>
      <path class="flow-d" id="h5-d3" d="M668,150 H702" marker-end="url(#ar-d3)"/>
      <path class="flow-d" id="h6-d3" d="M802,150 H836" marker-end="url(#ar-d3)"/>
      <circle cx="98" cy="150" r="34" fill="#4D93A2"/>
      <circle cx="123" cy="125" r="10.5" fill="#35707E"/>
      <text class="num" x="123" y="125" text-anchor="middle" dominant-baseline="central">1</text>
      <g class="g" transform="translate(87,139)"><path d="M4,1 H14 L18,5 V21 H4 Z"/><path d="M14,1 V5 H18"/><path d="M8,11 h6 M8,16 h6"/></g>
      <text class="stage-l" x="98" y="218" text-anchor="middle" font-size="15">Analisi</text>
      <text class="stage-s" x="98" y="240" text-anchor="middle" font-size="12">Requisiti reali</text>
      <circle cx="232" cy="150" r="34" fill="#4D93A2"/>
      <circle cx="257" cy="125" r="10.5" fill="#35707E"/>
      <text class="num" x="257" y="125" text-anchor="middle" dominant-baseline="central">2</text>
      <g class="g" transform="translate(221,139)"><path d="M2,20 L6,19 L20,5 L17,2 L3,16 Z"/><path d="M15,4 L18,7"/></g>
      <text class="stage-l" x="232" y="218" text-anchor="middle" font-size="15">Progettazione</text>
      <text class="stage-s" x="232" y="240" text-anchor="middle" font-size="12">Su misura</text>
      <circle cx="366" cy="150" r="34" fill="#4D93A2"/>
      <circle cx="391" cy="125" r="10.5" fill="#35707E"/>
      <text class="num" x="391" y="125" text-anchor="middle" dominant-baseline="central">3</text>
      <g class="g" transform="translate(355,139)"><path d="M7,5 L1,11 L7,17"/><path d="M15,5 L21,11 L15,17"/><path d="M13,3 L9,19"/></g>
      <text class="stage-l" x="366" y="218" text-anchor="middle" font-size="15">Sviluppo</text>
      <text class="stage-s" x="366" y="240" text-anchor="middle" font-size="12">Codice e moduli</text>
      <circle cx="500" cy="150" r="34" fill="#4D93A2"/>
      <circle cx="525" cy="125" r="10.5" fill="#35707E"/>
      <text class="num" x="525" y="125" text-anchor="middle" dominant-baseline="central">4</text>
      <g class="g" transform="translate(489,139)"><circle cx="11" cy="11" r="9.5" fill="none"/><path d="M6.5,11.5 L9.5,14.5 L15.5,7.5"/></g>
      <text class="stage-l" x="500" y="218" text-anchor="middle" font-size="15">Test</text>
      <text class="stage-s" x="500" y="240" text-anchor="middle" font-size="12">Collaudo</text>
      <circle cx="634" cy="150" r="34" fill="#4D93A2"/>
      <circle cx="659" cy="125" r="10.5" fill="#35707E"/>
      <text class="num" x="659" y="125" text-anchor="middle" dominant-baseline="central">5</text>
      <g class="g" transform="translate(623,139)"><path d="M11,1 C15,5 17,10 17,14 L11,20 L5,14 C5,10 7,5 11,1 Z"/><circle cx="11" cy="9" r="2.4"/></g>
      <text class="stage-l" x="634" y="218" text-anchor="middle" font-size="15">Rilascio</text>
      <text class="stage-s" x="634" y="240" text-anchor="middle" font-size="12">Go live</text>
      <circle cx="768" cy="150" r="34" fill="#4D93A2"/>
      <circle cx="793" cy="125" r="10.5" fill="#35707E"/>
      <text class="num" x="793" y="125" text-anchor="middle" dominant-baseline="central">6</text>
      <g class="g" transform="translate(757,139)"><circle cx="11" cy="11" r="4" fill="none"/><path d="M11,1 v3 M11,18 v3 M1,11 h3 M18,11 h3 M4,4 l2,2 M16,16 l2,2 M18,4 l-2,2 M6,16 l-2,2"/></g>
      <text class="stage-l" x="768" y="218" text-anchor="middle" font-size="15">Integrazione</text>
      <text class="stage-s" x="768" y="240" text-anchor="middle" font-size="12">Sistemi connessi</text>
      <circle cx="902" cy="150" r="34" fill="#4D93A2"/>
      <circle cx="927" cy="125" r="10.5" fill="#35707E"/>
      <text class="num" x="927" y="125" text-anchor="middle" dominant-baseline="central">7</text>
      <g class="g" transform="translate(891,139)"><path d="M11,1 L20,5 V11 C20,16.5 15.5,20 11,21.5 C6.5,20 2,16.5 2,11 V5 Z"/><path d="M7.5,11 L10,13.5 L15,8"/></g>
      <text class="stage-l" x="902" y="218" text-anchor="middle" font-size="15">Manutenzione</text>
      <text class="stage-s" x="902" y="240" text-anchor="middle" font-size="12">AMS nel tempo</text>
      <circle class="dot" r="3.6"><animateMotion dur="1.9s" begin="-0.0s" repeatCount="indefinite"><mpath href="#h1-d3"/></animateMotion></circle>
      <circle class="dot" r="3.6"><animateMotion dur="1.9s" begin="-0.3s" repeatCount="indefinite"><mpath href="#h2-d3"/></animateMotion></circle>
      <circle class="dot" r="3.6"><animateMotion dur="1.9s" begin="-0.6s" repeatCount="indefinite"><mpath href="#h3-d3"/></animateMotion></circle>
      <circle class="dot" r="3.6"><animateMotion dur="1.9s" begin="-0.9s" repeatCount="indefinite"><mpath href="#h4-d3"/></animateMotion></circle>
      <circle class="dot" r="3.6"><animateMotion dur="1.9s" begin="-1.2s" repeatCount="indefinite"><mpath href="#h5-d3"/></animateMotion></circle>
      <circle class="dot" r="3.6"><animateMotion dur="1.9s" begin="-1.5s" repeatCount="indefinite"><mpath href="#h6-d3"/></animateMotion></circle>
      <text class="kicker" x="520" y="336" text-anchor="middle">IL RISULTATO</text>
      <g fill="#fff" stroke="#C6D2D8" stroke-width="1.8">
        <rect x="118" y="382" width="118" height="52" rx="12" transform="rotate(-6 177 408)"/>
        <rect x="118" y="454" width="118" height="52" rx="12" transform="rotate(4 177 480)"/>
        <rect x="118" y="526" width="118" height="52" rx="12" transform="rotate(-3 177 552)"/>
      </g>
      <g font-size="14" font-weight="500" fill="#7A8B9B" text-anchor="middle" dominant-baseline="central">
        <text x="177" y="408" transform="rotate(-6 177 408)">ERP</text>
        <text x="177" y="480" transform="rotate(4 177 480)">CRM</text>
        <text x="177" y="552" transform="rotate(-3 177 552)">BI</text>
      </g>
      <text class="stage-s" x="177" y="606" text-anchor="middle">Sistemi separati</text>
      <path class="flow-d" id="h7-d3" d="M256,480 H352" marker-end="url(#ar-d3)" stroke="#4D93A2" opacity=".5"/>
      <circle class="halo" cx="420" cy="480" r="46" style="transform-origin:420px 480px"/>
      <circle cx="420" cy="480" r="46" fill="#4D93A2"/>
      <g class="g" transform="translate(409,469)"><path d="M7,5 L1,11 L7,17"/><path d="M15,5 L21,11 L15,17"/><path d="M13,3 L9,19"/></g>
      <text class="stage-s" x="420" y="606" text-anchor="middle">GAM</text>
      <path class="flow-d" id="h8-d3" d="M488,480 H584" marker-end="url(#ar-d3)" stroke="#4D93A2" opacity=".5"/>
      <circle class="dot" r="4.5"><animateMotion dur="2.1s" begin="-0.2s" repeatCount="indefinite"><mpath href="#h7-d3"/></animateMotion></circle>
      <circle class="dot" r="4.5"><animateMotion dur="2.1s" begin="-1.1s" repeatCount="indefinite"><mpath href="#h8-d3"/></animateMotion></circle>
      <rect x="616" y="386" width="306" height="188" rx="20" fill="#fff" stroke="#4D93A2" stroke-width="2"/>
      <g stroke="#BFD9DE" stroke-width="2" fill="none">
        <path d="M700,438 H838 M700,522 H838 M700,438 V522 M838,438 V522 M769,438 V522 M700,480 H838"/>
      </g>
      <g>
        <rect x="676" y="414" width="48" height="48" rx="11" fill="#4D93A2"/>
        <rect x="814" y="414" width="48" height="48" rx="11" fill="#4D93A2" opacity=".66"/>
        <rect x="676" y="498" width="48" height="48" rx="11" fill="#4D93A2" opacity=".66"/>
        <rect x="814" y="498" width="48" height="48" rx="11" fill="#4D93A2"/>
      </g>
      <circle cx="769" cy="480" r="11" fill="#35707E"/>
      <text class="stage-l" x="769" y="606" text-anchor="middle" font-size="15">Un ecosistema unico</text>
    </svg>`,
  // assistenza
  `<svg viewBox="0 0 1040 640" xmlns="http://www.w3.org/2000/svg" role="img"
         aria-label="I quattro tipi di intervento attorno all'infrastruttura, con un presidio che gira sempre">
      <text class="kicker" x="520" y="36" text-anchor="middle">QUATTRO MODI DI TENERTI ACCESO</text>
      <ellipse id="orb-d4" cx="520" cy="290" rx="212" ry="150" fill="none" stroke="#EDF2F4" stroke-width="2"/>
      <ellipse cx="520" cy="290" rx="150" ry="106" fill="none" stroke="#BFD9DE" stroke-width="1.6" stroke-dasharray="3 8"/>
      <circle cx="370" cy="176" r="34" fill="#4D93A2"/>
      <g class="g" transform="translate(359,165)"><path d="M20,4 A6.5,6.5 0 0 1 11,13 L4,20 L2,18 L9,11 A6.5,6.5 0 0 1 18,2 L14,6 L16,8 Z"/></g>
      <text class="stage-l" x="322" y="172" text-anchor="end" font-size="16">Correttiva</text>
      <text class="stage-s" x="322" y="194" text-anchor="end" font-size="12.5">Risolviamo quando si rompe</text>
      <circle cx="670" cy="176" r="34" fill="#4D93A2"/>
      <g class="g" transform="translate(659,165)"><rect x="2" y="4" width="18" height="17" rx="3" fill="none"/><path d="M2,9 H20 M7,1 V6 M15,1 V6"/><circle cx="11" cy="15" r="2" fill="#fff" stroke="none"/></g>
      <text class="stage-l" x="718" y="172" text-anchor="start" font-size="16">Preventiva</text>
      <text class="stage-s" x="718" y="194" text-anchor="start" font-size="12.5">Interveniamo prima che accada</text>
      <circle cx="370" cy="404" r="34" fill="#4D93A2"/>
      <g class="g" transform="translate(359,393)"><path d="M11,20 V3 M4,10 L11,3 L18,10"/><path d="M4,20 h14"/></g>
      <text class="stage-l" x="322" y="400" text-anchor="end" font-size="16">Evolutiva</text>
      <text class="stage-s" x="322" y="422" text-anchor="end" font-size="12.5">Il sistema cresce con te</text>
      <circle cx="670" cy="404" r="34" fill="#4D93A2"/>
      <g class="g" transform="translate(659,393)"><path d="M1,11 H6 L8.5,4 L13.5,18 L16,11 H21"/></g>
      <text class="stage-l" x="718" y="400" text-anchor="start" font-size="16">Continuativa</text>
      <text class="stage-s" x="718" y="422" text-anchor="start" font-size="12.5">Un presidio che non si ferma</text>
      <circle class="halo" cx="520" cy="290" r="62" style="transform-origin:520px 290px"/>
      <circle cx="520" cy="290" r="62" fill="#35707E"/>
      <g class="g" transform="translate(509,279) scale(1.05)">
        <rect x="0" y="1" width="21" height="14" rx="2.5" fill="none"/>
        <path d="M7,19 h8 M10.5,15 v4"/>
      </g>
      <text x="520" y="382" text-anchor="middle" font-size="12" font-weight="600" fill="#9DAEBB" letter-spacing="2.5">LA TUA INFRASTRUTTURA</text>
      <circle class="dot" r="5.5"><animateMotion dur="6.0s" begin="0s" repeatCount="indefinite"><mpath href="#orb-d4"/></animateMotion></circle>
      <circle class="dot" r="4"><animateMotion dur="6.0s" begin="-3.0s" repeatCount="indefinite"><mpath href="#orb-d4"/></animateMotion></circle>
      <text class="kicker" x="520" y="512" text-anchor="middle">SU COSA INTERVENIAMO</text>
      <g fill="#fff" stroke="#BFD9DE" stroke-width="1.5">
        <rect x="128" y="536" width="150" height="34" rx="17"/>
        <rect x="290" y="536" width="176" height="34" rx="17"/>
        <rect x="478" y="536" width="112" height="34" rx="17"/>
        <rect x="602" y="536" width="124" height="34" rx="17"/>
        <rect x="738" y="536" width="174" height="34" rx="17"/>
      </g>
      <g class="chip-t" text-anchor="middle" dominant-baseline="central">
        <text x="203" y="554">HD1 e HD2</text>
        <text x="378" y="554">Reti e infrastruttura</text>
        <text x="534" y="554">Sicurezza</text>
        <text x="664" y="554">Attivita PdL</text>
        <text x="825" y="554">Hosting e noleggio</text>
      </g>
    </svg>`,
];
