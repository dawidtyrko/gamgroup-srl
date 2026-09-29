import type { Dict } from "./types";

// Italiano — testi del sito attuale + testi delle anteprime "H · Percorso" approvate il 28/09/2026.
export const it: Dict = {
  meta: {
    title: "GAM Group — Consulenza IT & System Integration dal 2001",
    description:
      "GAM Group Srl: un unico partner per l’IT della tua azienda. Consulenza ERP, AI & BI, sviluppo e system integration, assistenza. Treviso, dal 2001.",
  },
  pageMeta: {
    chiSiamo: {
      title: "Chi siamo — GAM Group",
      description: "GAM Group è un’azienda italiana fondata nel 2001, con sede a Treviso: il partner IT di cui ti puoi fidare.",
    },
    clienti: {
      title: "Clienti — GAM Group",
      description: "Oltre 130 aziende si affidano a GAM Group: automotive, fashion, food, aerospace e pubblica amministrazione.",
    },
    lavora: {
      title: "Lavora con noi — GAM Group",
      description: "Le posizioni aperte in GAM Group: consulenti SAP, analisti e specialisti IT. Unisciti al nostro team.",
    },
    contatti: {
      title: "Contatti — GAM Group",
      description: "Scopriamo insieme cosa possiamo fare. GAM Group, Via Siora Andriana del Vescovo, 5/C, Treviso — info@gamgroup.it",
    },
  },
  nav: {
    home: "Home",
    chiSiamo: "Chi siamo",
    servizi: "Servizi",
    clienti: "Clienti",
    lavora: "Lavora con noi",
    contattaci: "Contattaci",
    menu: "Menu",
    close: "Chiudi",
  },
  langSwitch: { label: "EN", aria: "English version", menuLabel: "English →" },
  common: { scopri: "Scopri →", servizi: "Servizi", servizio: "Servizio" },

  stats: [
    { value: 25, label: "anni di esperienza" },
    { value: 60, label: "esperti qualificati" },
    { value: 130, label: "clienti" },
    { value: 20, label: "partner tecnologici" },
  ],
  steps: [
    { title: "Ascoltiamo e analizziamo", text: "Partiamo da quello che avete già: processi, dati, sistemi in uso." },
    {
      title: "Progettiamo sui vostri gestionali",
      text: "SAP, IBM i-Series, JDE, Infor, Oracle Cloud, NetSuite: conosciamo i sistemi che fanno funzionare l’azienda.",
    },
    { title: "Sviluppiamo e integriamo", text: "Software su misura e sistemi collegati in un ecosistema unico, con dati puliti e accessibili." },
    { title: "Restiamo al vostro fianco", text: "Help desk multilivello, reti, sicurezza, hosting: il sistema resta operativo nel tempo." },
  ],

  home: {
    badge: "dal 2001",
    pill: "Consulenza IT e System Integration a Treviso",
    title: { pre: "Dall’analisi alla manutenzione, ", mark: "un unico partner", post: " per la tua azienda." },
    subtitle:
      "Il tuo problema diventa il nostro problema, e noi te lo risolviamo.",
    ctaPrimary: "Parliamo del tuo progetto",
    ctaSecondary: "Come lavoriamo ↓",
    clientsLabel: "Alcuni dei nostri clienti",
    journey: {
      lbl: "Come lavoriamo",
      title: "Un percorso, un solo interlocutore.",
      lead: "Ogni progetto è costruito su misura: si parte da un dialogo, poi lo stesso team vi accompagna in ogni fase.",
    },
    services: { lbl: "Servizi", title: "Ogni area, la sua pagina." },
    contact: { lbl: "Contatti", title: "Raccontaci da dove parti.", cta: "Scrivici →" },
  },

  services: {
    techLbl: "Tecnologie",
    pathLbl: "Nel percorso",
    pathTitle: "Dove entra questo servizio.",
    faqLbl: "Domande frequenti",
    faqTitle: "Su questo servizio.",
    othersLbl: "Altri servizi",
    contactLbl: "Contatti",
    items: {
      erp: {
        num: "01",
        title: "Consulenza Tecnica ERP",
        short: "Implementazione, personalizzazione, upgrade e AMS.",
        h1: { pre: "Consulenza ", mark: "Tecnica ERP" },
        intro:
          "Oltre 25 anni di esperienza sul campo, dall’implementazione alla personalizzazione, dall’aggiornamento all’AMS: GAM Group gestisce i principali sistemi ERP, tra cui SAP, PWR (IBM i-Series), JDE, Infor, Oracle Cloud e NetSuite.",
        highlight:
          "Il nostro team di esperti conosce i sistemi e le esigenze del tuo business. Su questa base integriamo automazioni e agenti AI per togliere lavoro manuale su ordini, anagrafiche e reportistica.",
        cta: "Parla con un consulente ERP →",
        tags: ["JDE", "SAP", "IBM i-Series", "Infor", "Oracle Cloud", "NetSuite", "BI", "CyberPlan"],
        techTitle: "I sistemi che seguiamo.",
        eco: [
          { name: "SAP", items: ["SAP ECC", "SAP S/4HANA", "SAP B.One"] },
          { name: "IBM i-Series", items: ["SIGIP", "ACG", "STEALTH", "SMEUP", "GALILEO", "GEA", "Gipros"] },
        ],
        step: 2,
        stepText: "Implementazione, personalizzazione, aggiornamento e AMS dei principali ERP.",
        pathLead: "Lo stesso team vi segue in ogni fase: l’ERP è il cuore del passo 2.",
        faq: [1, 4],
        contactTitle: "Raccontaci il tuo gestionale.",
      },
      aiBi: {
        num: "02",
        title: "Consulenza Applicativa, AI & BI",
        short: "Dashboard predittive, agenti AI e copilot.",
        h1: { pre: "Consulenza ", mark: "Applicativa, AI & BI" },
        intro:
          "I dati aziendali sono spesso distribuiti tra diversi software gestionali, fogli di calcolo e vari strumenti. Li organizziamo in modo strutturato e li rendiamo facilmente interpretabili, facilitando così processi decisionali più efficaci.",
        highlight:
          "Dashboard predittive, agenti AI e copilot costruiti sui processi della singola azienda, garantendo l’ottimizzazione del processo sottostante e il savings delle soluzioni progettate.",
        cta: "Parla con un consulente AI & BI →",
        tags: ["Project Management", "Lean Management", "AI", "Business Intelligence", "AI Agents / Copilots"],
        techTitle: "Gli strumenti che usiamo.",
        eco: [
          {
            name: "Microsoft 365",
            items: ["MS365 Suite", "Power Automate", "Power Apps", "SharePoint", "Dynamics 365", "Power BI", "Copilot 365", "Copilot Studio", "Azure AI", "AI Hub"],
          },
          { name: "Business Intelligence", items: ["Power BI", "Qlik", "Tableau", "SAP BO"] },
        ],
        step: 1,
        stepText: "Guardiamo processi e dati, individuiamo dove l’AI e la BI portano un vantaggio misurabile.",
        pathLead: "Lo stesso team vi segue in ogni fase: l’analisi di dati e processi è il passo 1.",
        faq: [6, 0, 2],
        contactTitle: "Raccontaci i tuoi dati.",
      },
      integrazione: {
        num: "03",
        title: "Sviluppo & System Integration",
        short: "Software su misura, integrazione e migrazione.",
        h1: { pre: "Sviluppo & ", mark: "System Integration" },
        intro: "Sviluppo software o applicativi su misura e integrazione di sistemi ERP, CRM e BI in un ecosistema unico.",
        highlight:
          "Un solo interlocutore con un approccio end-to-end, dall’analisi alla manutenzione. Il risultato è un ecosistema unico, con dati puliti e accessibili, la condizione perché l’AI possa lavorare davvero.",
        cta: "Parla con un nostro sviluppatore →",
        tags: ["Application Maintenance", "Sviluppo SW", "Integrazione & Migrazione"],
        techTitle: "Competenze e tecnologie.",
        eco: [],
        step: 3,
        stepText: "Software su misura e sistemi collegati in un ecosistema unico, con dati puliti e accessibili.",
        pathLead: "Lo stesso team vi segue in ogni fase: sviluppo e integrazione sono il passo 3.",
        faq: [4, 1],
        contactTitle: "Raccontaci cosa vuoi collegare.",
      },
      assistenza: {
        num: "04",
        title: "Assistenza & Manutenzione",
        short: "Help desk, reti, sicurezza, hosting e cloud.",
        h1: { pre: "Assistenza & ", mark: "Manutenzione" },
        intro: "Infrastruttura IT seguita a 360 gradi, dall’help desk multilivello alla sicurezza dei dati, fino a hosting e cloud.",
        highlight: "Garantiamo interventi rapidi e proattivi per un sistema sempre operativo.",
        cta: "Richiedi assistenza →",
        tags: ["Attività PdL", "Reti & Infrastruttura", "HD1 & HD2", "Sicurezza", "HW–SW", "Hosting"],
        techTitle: "Competenze e tecnologie.",
        eco: [],
        step: 4,
        stepText: "Help desk multilivello, reti, sicurezza, hosting: il sistema resta operativo nel tempo.",
        pathLead: "Lo stesso team vi segue in ogni fase: l’assistenza è il passo 4.",
        faq: [5, 4],
        contactTitle: "Raccontaci la tua infrastruttura.",
      },
    },
  },

  about: {
    lbl: "Chi siamo",
    title: { pre: "Il partner di cui ", mark: "ti puoi fidare." },
    p: {
      pre: "GAM Group è un’azienda italiana fondata nel ",
      year: "2001",
      mid: ", con sede a ",
      city: "Treviso",
      post: ". Da oltre vent’anni affianchiamo le imprese nell’evoluzione e nella gestione dei loro sistemi IT, accompagnandole nella rivoluzione dell’intelligenza artificiale con soluzioni concrete, integrate nei processi e orientate ai risultati.",
    },
    approach: {
      lbl: "Il nostro approccio",
      title: "Nessun percorso predefinito.",
      text: "Ogni progetto viene costruito su misura, tenendo conto delle esigenze e delle peculiarità dell’azienda, confrontate con l’esperienza maturata nel settore. Si inizia sempre con un dialogo aperto, seguito da un’analisi approfondita del processo, così da individuare con precisione l’impatto concreto che il nostro intervento, consulenziale o di sviluppo, può generare.",
    },
    sectorsLabel: "Settori in cui operiamo",
    sectors: ["Retail", "Food", "Automotive", "Fashion", "Aerospace", "… e molti altri"],
    company: {
      lbl: "L’azienda",
      title: "Dove nascono i nostri progetti.",
      lead: "Un ufficio luminoso a Treviso, un team affiatato e qualche passione in comune per i motori. È qui che ogni giorno costruiamo soluzioni insieme ai nostri clienti.",
    },
    partners: { lbl: "Partner tecnologici", title: "Lavoriamo con le migliori tecnologie." },
    people: {
      lbl: "Le nostre persone",
      title: "Abbiamo lavorato dove lavori tu.",
      text: "Nel nostro team ci sono persone che hanno lavorato dentro le aziende, non solo per le aziende. Conoscono le dinamiche, i processi e le urgenze di chi ogni giorno deve far funzionare produzione, amministrazione e logistica. È per questo che i nostri clienti si trovano bene con noi: parliamo la stessa lingua.",
    },
    world: {
      lbl: "Internazionale",
      title: "Da Treviso, in tutto il mondo.",
      text: "Seguiamo progetti internazionali per clienti che operano in tutto il mondo, con lo stesso metodo e lo stesso team.",
    },
    contact: { lbl: "Conosciamoci", title: "Parla con noi.", cta: "Contattaci →" },
  },

  clients: {
    lbl: "Clienti",
    title: { pre: "Oltre ", mark: "130 aziende", post: " si affidano a noi." },
    lead: "Dall’automotive al fashion, dal food all’aerospace, fino alla pubblica amministrazione: ecco alcune delle realtà che seguiamo.",
    sectors: {
      lbl: "Settori",
      title: "Dove operiamo.",
      items: ["Retail", "Food", "Automotive", "Fashion", "Aerospace", "Pubblica amministrazione", "… e molti altri"],
    },
    contact: { lbl: "Il prossimo potresti essere tu", title: "Parliamo del tuo progetto.", cta: "Contattaci →" },
  },

  jobs: {
    lbl: "Lavora con noi",
    title: { pre: "Entra in ", mark: "GAM." },
    lead: "Unisciti a un team di esperti IT. Le posizioni aperte, in continua crescita.",
    openLbl: "Posizioni aperte",
    countOne: "1 posizione aperta.",
    countMany: "{n} posizioni aperte.",
    none: "Al momento non ci sono posizioni aperte: mandaci comunque la tua candidatura.",
    filters: { all: "Tutte", sap: "SAP", dev: "Sviluppo", remote: "Remoto" },
    details: "Dettagli ↓",
    apply: "Candidati ora →",
    roleLabel: "Il ruolo",
    mailSubjectPrefix: "Candidatura: ",
    spontaneous: {
      lbl: "Candidatura spontanea",
      title: "Non trovi il ruolo giusto?",
      textPre: "Invia il tuo CV a",
      cta: "Invia il CV →",
    },
  },

  ai: {
    lbl: "L’AI in pratica",
    listLbl: "Dove la applichiamo",
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

  faq: [
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
      a: "Potete scrivere a info@gamgroup.it oppure compilare il modulo nella pagina Contatti.",
    },
    {
      q: "L’intelligenza artificiale sostituirà le persone in azienda?",
      a: "No: la usiamo per togliere il lavoro ripetitivo, non le persone. L’obiettivo è che chi lavora con i sistemi abbia più tempo per le attività che richiedono esperienza e giudizio. Per questo ogni progetto parte dalla formazione e coinvolge chi userà davvero lo strumento.",
    },
  ],

  contact: {
    lbl: "Contatti",
    title: { pre: "Scopriamo insieme ", mark: "cosa possiamo fare." },
    lead: "Raccontaci da dove parti: il primo passo è sempre un dialogo aperto.",
    sedeLbl: "Sede",
    emailLbl: "Email",
    candidatureLbl: "Candidature",
    faqLbl: "Domande frequenti",
    faqTitle: "Prima di scriverci.",
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
      privacyRequired: "Devi accettare l’informativa privacy.",
      sendFailed: "Invio non riuscito. Riprova più tardi.",
    },
  },

  map: { label: "La nostra sede", directions: "Ottieni indicazioni →" },
  photoAlts: {
    libreria: "La libreria bianca dell’ufficio GAM di Treviso, con piante e libri",
    riunione: "Il team GAM riunito attorno a un tavolo di lavoro",
    scaffale: "Un modellino di Maserati su una libreria, con l’ufficio e gli schermi sfocati sullo sfondo",
    lavoro: "Una collega al lavoro nell’ufficio con le travi in legno a vista",
    tavolo: "Il team GAM al lavoro attorno a un grande tavolo, visto dall’alto",
    scrivania: "Una scrivania dell’ufficio GAM con portatili e un modellino di aereo",
    salotto: "L’angolo salotto dell’ufficio GAM",
    caffe: "L’angolo caffè dell’ufficio con la scritta GAM",
    f1: "Due persone del team GAM davanti a monoposto di Formula 1 in un museo",
    modellini: "Modellini di elicottero, Vespa, jeep e Maserati su una mensola",
    vespa: "Un casco e un modellino di Vespa su uno scaffale bianco",
  },
  footer: {
    copyright: "© 2026 GAM Group Srl · Via Siora Andriana del Vescovo, 5/C, 31100 Treviso · P.IVA 03641560267",
    privacy: "Privacy",
  },
};
