import type { Dict } from "./types";

// Italian — source copy from the approved v2 design handoff (do not reword).
export const it: Dict = {
  meta: {
    title: "GAM Group — Consulenza IT & System Integration dal 2001",
    description:
      "GAM Group Srl: evolviamo e ottimizziamo i processi aziendali dei nostri clienti, dalla consulenza ai sistemi. Treviso, dal 2001.",
  },
  nav: {
    home: "Home",
    chisiamo: "Chi Siamo",
    servizi: "Servizi",
    progetti: "Progetti",
    jobboard: "Job Board",
    contattaci: "Contattaci",
  },
  dropdown: { pillars: "Pilastri", channels: "Canali" },
  hero: {
    eyebrow: "Consulenza IT — System Integration — dal 2001",
    title: "Benvenuti in",
    subtitle:
      "Evolviamo e ottimizziamo i processi aziendali dei nostri clienti, dalla consulenza ai sistemi.",
    ctaServices: "Scopri i servizi",
    ctaContact: "Contattaci",
    scroll: "Scorri",
    bandPlaceholder: "[ team gam — foto a tutta larghezza ]",
  },
  claim: {
    muted: "Portiamo il tuo business",
    strong: " al livello successivo.",
    sub: "Innovare i sistemi IT riduce i costi, aumenta la flessibilità e migliora la qualità dei servizi.",
  },
  services: {
    eyebrow: "01 — 04",
    title: "I nostri servizi",
    items: [
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
    ],
  },
  channels: {
    eyebrow: "Tecnologie",
    title: "I nostri canali",
    items: [
      {
        name: "MS 365",
        items: ["MS365 Suite", "Power Automate", "Power Apps", "SharePoint", "Dynamics 365", "Power BI", "Copilot 365", "Copilot Studio", "Azure AI", "AI Hub"],
      },
      { name: "SAP", items: ["SAP ECC", "SAP S/4HANA", "Business ByDesign", "SAP B.One"] },
      { name: "IBM i-Series", items: ["SIGIP", "ACG", "STEALTH", "SMEUP", "GALILEO", "GEA"] },
      // NOTE: per new spec the 4th channel is Business Intelligence (was Infor).
      // Items are placeholders — confirm the exact list with the team.
      { name: "Business Intelligence", items: ["Power BI", "Dashboard & Reporting", "Analisi dati", "Data Integration"] },
    ],
  },
  stats: {
    eyebrow: "I numeri sono il nostro forte",
    items: [
      { value: 20, label: "Anni di esperienza" },
      { value: 50, label: "Esperti qualificati" },
      { value: 130, label: "Clienti soddisfatti" },
      { value: 15, label: "Partner" },
    ],
  },
  about: {
    eyebrow: "Chi siamo",
    title: "Il partner di cui ti puoi fidare.",
    cta: "Parla con noi →",
    p: {
      pre: "GAM Group è un’azienda italiana fondata nel ",
      year: "2001",
      mid: ", con sede a ",
      city: "Treviso",
      post: ". Da oltre vent’anni affianchiamo le imprese nell’evoluzione e nella gestione dei loro sistemi IT.",
    },
    sectorsLabel: "Settori",
    sectors: ["Retail", "Food", "Automotive", "Fashion", "Aerospace", "… and many more"],
  },
  projectsSec: {
    eyebrow: "Case studies",
    title: "I progetti",
    readMore: "Leggi il case study →",
    trailing: "E molti altri progetti, in ogni settore.",
    hint: "Scorri per esplorare →",
  },
  partners: {
    eyebrow: "I nostri partner tecnologici",
    // Client names/logos may only appear once the release clause is in the
    // contracts (website spec §7). Until then: technology partners.
    names: ["Rivelio", "Microsoft Partner", "ProcederAI", "Claude", "AWS"],
  },
  jobs: {
    eyebrow: "Lavora con noi",
    title: "Entra in GAM",
    lead: "Unisciti a un team di esperti IT. Le posizioni aperte, in continua crescita.",
    apply: "Candidati ora →",
    mailSubjectPrefix: "Candidatura: ",
    spontaneousPre: "Candidatura spontanea — invia il CV a",
    items: [
      { title: "Consulente SAP S/4HANA", sede: "Treviso", type: "Tempo indeterminato", tags: ["SAP S/4HANA", "FI/CO o MM/SD", "3+ anni"] },
      { title: "Service Manager AMS", sede: "Treviso", type: "Tempo indeterminato", tags: ["ITIL", "Gestione team", "AMS"] },
      { title: "Analista SAP Tecnico-Funzionale", sede: "Treviso", type: "Tempo indeterminato", tags: ["ABAP", "Moduli SAP", "Analisi funzionale"] },
      { title: "IT Specialist", sede: "Treviso", type: "Tempo indeterminato", tags: ["Sistemistica", "Reti", "Help Desk"] },
      { title: "Senior IT Consultant", sede: "Treviso", type: "Tempo indeterminato", tags: ["ERP", "Project Management", "5+ anni"] },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Domande frequenti",
    items: [
      {
        q: "Di cosa si occupa GAM Group?",
        a: "GAM Group è una società di consulenza IT e system integration attiva dal 2001. Affianchiamo le imprese su ERP (SAP, IBM i-Series), consulenza applicativa con AI e Business Intelligence, sviluppo software e assistenza sistemistica.",
      },
      {
        q: "Dove si trova GAM Group?",
        a: "La sede è a Treviso, in Via Callalta 31/E. Lavoriamo con clienti in tutta Italia, dalle PMI alle multinazionali e alla pubblica amministrazione.",
      },
      {
        q: "Con quali sistemi e tecnologie lavorate?",
        a: "SAP (ECC, S/4HANA), IBM i-Series (AS400), Microsoft 365 con Power Platform e Copilot, e strumenti di Business Intelligence come Power BI.",
      },
      {
        q: "Come posso richiedere una consulenza?",
        a: "Compila il modulo nella sezione Contattaci, scrivi a info@gamgroup.it o chiama il +39 0422 583693: ti risponderemo al più presto.",
      },
    ],
  },
  contact: {
    eyebrow: "Contatti",
    title: "Scopriamo insieme cosa possiamo fare.",
    address: "Via Callalta 31/E – 31100 Treviso",
    nome: "Nome",
    cognome: "Cognome",
    email: "Email aziendale",
    azienda: "Azienda",
    messaggio: "Messaggio",
    msgPlaceholder: "Scrivi qui il tuo messaggio",
    privacyPre: "Ho letto l’",
    privacyLink: "informativa privacy",
    privacyPost: " e acconsento al trattamento dei miei dati personali per rispondere alla mia richiesta.",
    send: "Invia",
    sending: "Invio…",
    successTitle: "Grazie!",
    successBody: "Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.",
    netError: "Rete non raggiungibile. Riprova.",
    errors: {
      missingFields: "Compila nome, email e messaggio.",
      invalidEmail: "Email non valida.",
      privacyRequired: "Devi accettare l\u2019informativa privacy.",
      sendFailed: "Invio non riuscito. Riprova pi\u00f9 tardi.",
    },
  },
  map: { label: "La nostra sede", directions: "Ottieni indicazioni →" },
  modal: {
    challenge: "La sfida",
    project: "Il progetto",
    benefits: "Benefici",
    cta: "Parla con noi del tuo progetto →",
    close: "Chiudi",
  },
  footer: {
    copyright: "© 2026 GAM Group Srl — Via Callalta 31/E, 31100 Treviso (TV) — P.IVA 03641560267",
    privacy: "Privacy",
  },
  langSwitch: { label: "EN", href: "/en", menuLabel: "English →" },
};
