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
    eyebrow: "Consulenza IT • System Integration • Intelligenza artificiale • dal 2001",
    title: "Benvenuti in",
    subtitle:
      "Evolviamo e ottimizziamo i processi aziendali delle aziende. Dalla consulenza ai sistemi, con l’AI come parte integrante di ogni progetto.",
    ctaServices: "Scopri i servizi",
    ctaContact: "Contattaci",
    scroll: "Scorri",
    bandPlaceholder: "[ team gam — foto a tutta larghezza ]",
  },
  bridge: { alt: "Il ponte tra business e IT: GAM al centro, powered by AI" },
  claim: {
    muted: "Portiamo il tuo business",
    strong: " al livello successivo.",
    sub: "Conosciamo a fondo i sistemi che fanno funzionare l’azienda e integriamo l’intelligenza artificiale per renderli ancora più efficienti, non limitandoci a progetti pilota. Implementiamo soluzioni su larga scala, monitorando e misurando i risultati concreti, e garantendo un ritorno dall’investimento delle nostre progettualità.",
  },
  services: {
    eyebrow: "01 — 04",
    title: "I nostri servizi",
    items: [
      {
        num: "01",
        title: "Consulenza Tecnica ERP",
        tags: ["JDE", "SAP", "IBM i-Series", "Infor", "Oracle Cloud", "NetSuite", "BI", "Zucchetti", "CyberPlan"],
        description: [
          "Oltre 30 anni di esperienza sul campo, dall’implementazione alla personalizzazione, dall’aggiornamento all’AMS, GAM Group gestisce i principali sistemi ERP, tra cui SAP, PWR (IBM i-Series), JDE, Infor, Oracle Cloud e NetSuite.",
          "Il nostro team di esperti conosce i sistemi e le esigenze del tuo business. Su questa base integriamo automazioni e agenti AI per togliere lavoro manuale su ordini, anagrafiche e reportistica.",
        ],
      },
      {
        num: "02",
        title: "Consulenza Applicativa, AI & BI",
        tags: ["Project Management", "Lean Management", "AI", "Business Intelligence", "AI Agents / Copilots"],
        description: [
          "I dati aziendali sono spesso distribuiti tra diversi software gestionali, fogli di calcolo e vari strumenti. Li organizziamo in modo strutturato e li rendiamo facilmente interpretabili, facilitando così processi decisionali più efficaci.",
          "Dashboard predittive, agenti AI e copilot costruiti sui processi della singola azienda, garantendo l’ottimizzazione del processo sottostante e il savings delle soluzioni progettate.",
        ],
      },
      {
        num: "03",
        title: "Sviluppo & System Integration",
        tags: ["Application Maintenance", "Sviluppo SW", "Integrazione & Migrazione"],
        description: [
          "Sviluppo software o applicativi su misura e integrazione di sistemi ERP, CRM e BI in un ecosistema unico.",
          "Un solo interlocutore con un approccio end-to-end, dall’analisi alla manutenzione. Il risultato è un ecosistema unico, con dati puliti e accessibili, la condizione perché l’AI possa lavorare davvero.",
        ],
      },
      {
        num: "04",
        title: "Assistenza & Manutenzione",
        tags: ["Attività PdL", "Reti & Infrastruttura", "HD1 & HD2", "Sicurezza", "HW–SW", "Hosting"],
        description: [
          "Infrastruttura IT seguita a 360 gradi, dall’help desk multilivello alla sicurezza dei dati, fino a hosting e cloud.",
          "Garantiamo interventi rapidi e proattivi per un sistema sempre operativo.",
        ],
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
      { name: "IBM i-Series", items: ["SIGIP", "ACG", "STEALTH", "SMEUP", "GALILEO", "GEA", "Gipros"] },
      // Per new spec the 4th channel is Business Intelligence (was Infor).
      // List confirmed from the approved copy review (GAM-copy-sito).
      { name: "Business Intelligence", items: ["Power BI", "Qlik", "Tableau", "SAP BO"] },
    ],
  },
  stats: {
    eyebrow: "I numeri sono il nostro forte",
    items: [
      { value: 25, label: "Anni di esperienza" },
      { value: 60, label: "Esperti qualificati" },
      { value: 130, label: "Clienti soddisfatti" },
      { value: 20, label: "Partner" },
    ],
  },
  ai: {
    eyebrow: "L’AI in pratica",
    title: "Intelligenza artificiale, senza paura.",
    intro:
      "Non la usiamo per stupire: la applichiamo ai processi di tutti i giorni, per togliere lavoro manuale, ridurre gli errori e far risparmiare tempo e costi. Partiamo da un caso concreto, misuriamo il risultato, poi allarghiamo.",
    close: "Grazie all’AI stiamo ottimizzando i processi aziendali dei nostri clienti, facendo risparmiare tempo e costi.",
    areas: [
      { title: "Formazione AI per manager", text: "Corsi pratici per chi guida l’azienda: capire cosa l’AI può fare nei propri processi e da dove partire, senza tecnicismi." },
      { title: "Gare e appalti", text: "Abbiamo affrontato tante gare d’appalto e, grazie all’AI, sempre con successo." },
      { title: "Risorse umane", text: "Automazioni e assistenti AI per le attività ripetitive dell’HR, dalla gestione delle richieste ai documenti del personale." },
      { title: "Acquisti", text: "Analisi di ordini, fornitori e offerte con l’AI, per decidere più in fretta e con dati più affidabili." },
      { title: "Gestione doganale", text: "Documenti e pratiche doganali preparati e controllati con l’AI, per ridurre errori e tempi." },
      { title: "Riconciliazione documenti", text: "Con Rivelio confrontiamo in automatico documenti e dati del gestionale, segnalando solo ciò che non torna." },
      { title: "Documentazione di produzione", text: "Con ProcederAI trasformiamo video, manuali e l’esperienza degli operatori in procedure e documentazione sempre aggiornata, consultabile direttamente in produzione." },
      { title: "Dark factory", text: "Siamo coinvolti in progetti di fabbriche automatizzate “a luci spente” insieme a realtà internazionali." },
    ],
  },
  gallery: {
    eyebrow: "L’azienda",
    title: "Dove nascono i nostri progetti.",
    lead: "Un ufficio luminoso a Treviso, un team affiatato e qualche passione in comune per i motori. È qui che ogni giorno costruiamo soluzioni insieme ai nostri clienti.",
    alts: {
      salotto: "L’angolo salotto dell’ufficio GAM",
      caffe: "L’angolo caffè dell’ufficio con la scritta GAM",
      f1: "Due persone del team GAM davanti a monoposto di Formula 1 in un museo",
      modellini: "Modellini di elicottero, Vespa, jeep e Maserati su una mensola",
      vespa: "Un casco e un modellino di Vespa su uno scaffale bianco",
    },
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
      post: ". Da oltre vent’anni affianchiamo le imprese nell’evoluzione e nella gestione dei loro sistemi IT, accompagnandole nella rivoluzione dell’intelligenza artificiale con soluzioni concrete, integrate nei processi e orientate ai risultati.",
    },
    sectorsLabel: "Settori in cui operiamo",
    sectors: ["Retail", "Food", "Automotive", "Fashion", "Aerospace", "Pubblica amministrazione", "… e molti altri"],
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
  clients: { eyebrow: "Alcuni dei nostri clienti" },
  jobs: {
    eyebrow: "Lavora con noi",
    title: "Entra in GAM",
    lead: "Unisciti a un team di esperti IT. Le posizioni aperte, in continua crescita.",
    apply: "Candidati ora →",
    learnMore: "Scopri di più →",
    roleLabel: "Il ruolo",
    mailSubjectPrefix: "Candidatura: ",
    spontaneousPre: "Candidatura spontanea — invia il CV a",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Domande frequenti",
    items: [
      {
        q: "Come si inizia un percorso di AI se partiamo da zero?",
        a: "Si parte da quello che avete già. Guardiamo processi e dati, individuiamo un caso concreto dove l’AI porta un vantaggio misurabile e cominciamo da lì. Un primo progetto contenuto, con un risultato visibile, prima di allargare. Nessuna rivoluzione, si inizia un passo alla volta.",
      },
      {
        q: "Su quali gestionali e tecnologie lavorate?",
        a: "Seguiamo i principali sistemi ERP, tra cui SAP, IBM i-Series (PWR), JDE, Infor, Oracle Cloud e NetSuite. Sul fronte Microsoft lavoriamo con l’ecosistema 365, Power Platform, Copilot e Azure AI. Per i dati usiamo principalmente Power BI e strumenti di Business Intelligence.",
      },
      {
        q: "Come formate le persone sull’AI e sui nuovi sistemi?",
        a: "Affianchiamo i team nell’adozione, con percorsi tarati sui ruoli e sui processi reali dell’azienda. L’obiettivo è quello di identificare subito casi pratici di adozione e di sperimentare su di essi durante le sessioni formative, così che queste tecnologie entrino nel lavoro di tutti i giorni delle figure coinvolte.",
      },
      {
        q: "In che modo lavorate con la pubblica amministrazione?",
        a: "Affianchiamo diversi enti pubblici per la formazione e up-skilling sull’intelligenza artificiale, con attenzione ai vincoli di procedura e alla gestione dei dati che quel contesto richiede, in conformità con le normative vigenti in materia.",
      },
      {
        q: "Come nasce una collaborazione con GAM Group?",
        a: "Il nostro approccio non segue percorsi predefiniti, infatti ogni progetto viene costruito su misura, tenendo conto delle specifiche esigenze e delle peculiarità dell’azienda, confrontate con la nostra esperienza maturata nel settore. Si inizia sempre con un dialogo aperto, seguito da un’analisi approfondita del processo oggetto di interesse, così da individuare con precisione l’impatto concreto che il nostro intervento, sia esso consulenziale o di sviluppo, può generare. Questo ci permette di offrire soluzioni realmente efficaci e mirate, capaci di portare valore tangibile fin da subito.",
      },
      {
        q: "Come possiamo richiedere un primo contatto?",
        a: "Potete scrivere a info@gamgroup.it oppure compilare il modulo nella sezione Contattaci che segue.",
      },
      {
        q: "L’intelligenza artificiale sostituirà le persone in azienda?",
        a: "No. L’AI toglie il lavoro ripetitivo — ricopiare dati, controllare documenti, cercare informazioni — e lascia alle persone le decisioni e le relazioni. Nei progetti che seguiamo il risultato è che il tempo si sposta dalle attività manuali a quelle che portano valore.",
      },
    ],
  },
  contact: {
    eyebrow: "Contatti",
    title: "Scopriamo insieme cosa possiamo fare.",
    address: "Via Siora Andriana del Vescovo, 5/C – 31100 Treviso",
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
    copyright: "© 2026 GAM Group Srl — Via Siora Andriana del Vescovo, 5/C, 31100 Treviso (TV) — P.IVA 03641560267",
    privacy: "Privacy",
  },
  langSwitch: { label: "EN", href: "/en", menuLabel: "English →" },
};
