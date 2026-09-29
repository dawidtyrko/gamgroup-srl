import type { Dict } from "./types";

// English — reused copy comes from the previous site's reviewed translation;
// the new "H · Percorso" copy was translated on 28/09/2026 and still needs review.
export const en: Dict = {
  meta: {
    title: "GAM Group — IT Consulting & System Integration since 2001",
    description:
      "GAM Group Srl: a single partner for your company's IT. ERP consulting, AI & BI, development and system integration, support. Treviso, Italy — since 2001.",
  },
  pageMeta: {
    chiSiamo: {
      title: "About us — GAM Group",
      description: "GAM Group is an Italian company founded in 2001 and based in Treviso: the IT partner you can trust.",
    },
    clienti: {
      title: "Clients — GAM Group",
      description: "Over 130 companies rely on GAM Group: automotive, fashion, food, aerospace and public administration.",
    },
    lavora: {
      title: "Job Board — GAM Group",
      description: "Open positions at GAM Group: SAP consultants, analysts and IT specialists. Join our team.",
    },
    contatti: {
      title: "Contact — GAM Group",
      description: "Let's find out together what we can do. GAM Group, Via Siora Andriana del Vescovo, 5/C, Treviso, Italy — info@gamgroup.it",
    },
  },
  nav: {
    home: "Home",
    chiSiamo: "About us",
    servizi: "Services",
    clienti: "Clients",
    lavora: "Job Board",
    contattaci: "Contact us",
    menu: "Menu",
    close: "Close",
  },
  langSwitch: { label: "IT", aria: "Versione italiana", menuLabel: "Italiano →" },
  common: { scopri: "Learn more →", servizi: "Services", servizio: "Service" },

  stats: [
    { value: 25, label: "years of experience" },
    { value: 60, label: "qualified experts" },
    { value: 130, label: "clients" },
    { value: 20, label: "technology partners" },
  ],
  steps: [
    { title: "We listen and analyse", text: "We start from what you already have: processes, data, the systems in use." },
    {
      title: "We design around your ERP",
      text: "SAP, IBM i-Series, JDE, Infor, Oracle Cloud, NetSuite: we know the systems that run your company.",
    },
    { title: "We develop and integrate", text: "Custom software and connected systems in a single ecosystem, with clean, accessible data." },
    { title: "We stay by your side", text: "Multi-level help desk, networks, security, hosting: your systems keep running over time." },
  ],

  home: {
    badge: "since 2001",
    pill: "IT Consulting and System Integration in Treviso",
    title: { pre: "From analysis to maintenance, ", mark: "one single partner", post: " for your business." },
    subtitle:
      "Your problem becomes our problem — and we solve it for you.",
    ctaPrimary: "Let's talk about your project",
    ctaSecondary: "How we work ↓",
    clientsLabel: "Some of our clients",
    journey: {
      lbl: "How we work",
      title: "One journey, one point of contact.",
      lead: "Every project is tailor-made: it starts with a conversation, then the same team supports you through every phase.",
    },
    services: { lbl: "Services", title: "Every area has its own page." },
    contact: { lbl: "Contact", title: "Tell us where you're starting from.", cta: "Write to us →" },
  },

  services: {
    techLbl: "Technologies",
    pathLbl: "In the journey",
    pathTitle: "Where this service fits.",
    faqLbl: "Frequently asked questions",
    faqTitle: "About this service.",
    othersLbl: "Other services",
    contactLbl: "Contact",
    items: {
      erp: {
        num: "01",
        title: "ERP Technical Consulting",
        short: "Implementation, customisation, upgrades and AMS.",
        h1: { pre: "ERP ", mark: "Technical Consulting" },
        intro:
          "Over 25 years of hands-on experience — from implementation to customisation, from upgrades to AMS. GAM Group manages the leading ERP systems, including SAP, PWR (IBM i-Series), JDE, Infor, Oracle Cloud and NetSuite.",
        highlight:
          "Our team of experts knows the systems and the needs of your business. On that foundation we integrate automations and AI agents to take manual work off orders, master data and reporting.",
        cta: "Talk to an ERP consultant →",
        tags: ["JDE", "SAP", "IBM i-Series", "Infor", "Oracle Cloud", "NetSuite", "BI", "CyberPlan"],
        techTitle: "The systems we support.",
        eco: [
          { name: "SAP", items: ["SAP ECC", "SAP S/4HANA", "SAP B.One"] },
          { name: "IBM i-Series", items: ["SIGIP", "ACG", "STEALTH", "SMEUP", "GALILEO", "GEA", "Gipros"] },
        ],
        step: 2,
        stepText: "Implementation, customisation, upgrades and AMS of the leading ERP systems.",
        pathLead: "The same team follows you through every phase: ERP is the heart of step 2.",
        faq: [1, 4],
        contactTitle: "Tell us about your ERP.",
      },
      aiBi: {
        num: "02",
        title: "Applied Consulting, AI & BI",
        short: "Predictive dashboards, AI agents and copilots.",
        h1: { pre: "Applied Consulting, ", mark: "AI & BI" },
        intro:
          "Business data is often scattered across different management software, spreadsheets and various tools. We organise it in a structured way and make it easy to interpret, enabling more effective decision-making.",
        highlight:
          "Predictive dashboards, AI agents and copilots built on each company's own processes, ensuring the optimisation of the underlying process and the savings of the solutions designed.",
        cta: "Talk to an AI & BI consultant →",
        tags: ["Project Management", "Lean Management", "AI", "Business Intelligence", "AI Agents / Copilots"],
        techTitle: "The tools we use.",
        eco: [
          {
            name: "Microsoft 365",
            items: ["MS365 Suite", "Power Automate", "Power Apps", "SharePoint", "Dynamics 365", "Power BI", "Copilot 365", "Copilot Studio", "Azure AI", "AI Hub"],
          },
          { name: "Business Intelligence", items: ["Power BI", "Qlik", "Tableau", "SAP BO"] },
        ],
        step: 1,
        stepText: "We look at processes and data and find where AI and BI bring a measurable advantage.",
        pathLead: "The same team follows you through every phase: analysing data and processes is step 1.",
        faq: [6, 0, 2],
        contactTitle: "Tell us about your data.",
      },
      integrazione: {
        num: "03",
        title: "Development & System Integration",
        short: "Custom software, integration and migration.",
        h1: { pre: "Development & ", mark: "System Integration" },
        intro: "Custom software and application development and the integration of ERP, CRM and BI systems into a single ecosystem.",
        highlight:
          "A single point of contact with an end-to-end approach, from analysis to maintenance. The result is a single ecosystem, with clean, accessible data — the condition for AI to truly work.",
        cta: "Talk to one of our developers →",
        tags: ["Application Maintenance", "Software Development", "Integration & Migration"],
        techTitle: "Skills and technologies.",
        eco: [],
        step: 3,
        stepText: "Custom software and connected systems in a single ecosystem, with clean, accessible data.",
        pathLead: "The same team follows you through every phase: development and integration are step 3.",
        faq: [4, 1],
        contactTitle: "Tell us what you need to connect.",
      },
      assistenza: {
        num: "04",
        title: "Support & Maintenance",
        short: "Help desk, networks, security, hosting and cloud.",
        h1: { pre: "Support & ", mark: "Maintenance" },
        intro: "End-to-end 360° IT infrastructure — from multi-level help desk to data security, through to hosting and cloud.",
        highlight: "We guarantee fast, proactive interventions for a system that is always up and running.",
        cta: "Request support →",
        tags: ["Workplace services", "Networks & Infrastructure", "HD1 & HD2", "Security", "HW–SW", "Hosting"],
        techTitle: "Skills and technologies.",
        eco: [],
        step: 4,
        stepText: "Multi-level help desk, networks, security, hosting: your systems keep running over time.",
        pathLead: "The same team follows you through every phase: support is step 4.",
        faq: [5, 4],
        contactTitle: "Tell us about your infrastructure.",
      },
    },
  },

  about: {
    lbl: "About us",
    title: { pre: "The partner ", mark: "you can trust." },
    p: {
      pre: "GAM Group is an Italian company founded in ",
      year: "2001",
      mid: ", based in ",
      city: "Treviso",
      post: ". For over twenty years we have supported businesses in evolving and managing their IT systems, guiding them through the artificial-intelligence revolution with concrete solutions, integrated into their processes and results-oriented.",
    },
    approach: {
      lbl: "Our approach",
      title: "No predefined path.",
      text: "Every project is built to measure, taking into account the company's needs and characteristics, weighed against the experience we have gained in the field. It always starts with an open dialogue, followed by an in-depth analysis of the process, so we can pinpoint the concrete impact our work — whether consulting or development — can generate.",
    },
    sectorsLabel: "Sectors we work in",
    sectors: ["Retail", "Food", "Automotive", "Fashion", "Aerospace", "… and many more"],
    company: {
      lbl: "The company",
      title: "Where our projects begin.",
      lead: "A bright office in Treviso, a close-knit team and a shared passion for engines. This is where we build solutions with our clients, every single day.",
    },
    partners: { lbl: "Technology partners", title: "We work with the best technologies." },
    people: {
      lbl: "Our people",
      title: "We have worked where you work.",
      text: "Our team includes people who have worked inside companies, not just for them. They know the dynamics, processes and pressures of those who keep production, administration and logistics running every day. That is why our clients feel at home with us: we speak the same language.",
    },
    world: {
      lbl: "International",
      title: "From Treviso, all over the world.",
      text: "We run international projects for clients operating all over the world, with the same method and the same team.",
    },
    contact: { lbl: "Let's meet", title: "Talk to us.", cta: "Contact us →" },
  },

  clients: {
    lbl: "Clients",
    title: { pre: "Over ", mark: "130 companies", post: " rely on us." },
    lead: "From automotive to fashion, from food to aerospace, all the way to public administration: here are some of the organisations we work with.",
    sectors: {
      lbl: "Sectors",
      title: "Where we work.",
      items: ["Retail", "Food", "Automotive", "Fashion", "Aerospace", "Public administration", "… and many more"],
    },
    contact: { lbl: "You could be next", title: "Let's talk about your project.", cta: "Contact us →" },
  },

  jobs: {
    lbl: "Job Board",
    title: { pre: "Join ", mark: "GAM." },
    lead: "Join a team of IT experts. Open positions, growing all the time.",
    openLbl: "Open positions",
    countOne: "1 open position.",
    countMany: "{n} open positions.",
    none: "There are no open positions right now — send us your application anyway.",
    filters: { all: "All", sap: "SAP", dev: "Development", remote: "Remote" },
    details: "Details ↓",
    apply: "Apply now →",
    roleLabel: "The role",
    mailSubjectPrefix: "Application: ",
    spontaneous: {
      lbl: "Spontaneous application",
      title: "Can't find the right role?",
      textPre: "Send your CV to",
      cta: "Send your CV →",
    },
  },

  ai: {
    lbl: "AI in practice",
    listLbl: "Where we apply it",
    title: "Artificial intelligence, without fear.",
    intro:
      "We don't use it to impress: we apply it to everyday processes, to remove manual work, reduce errors and save time and money. We start from a concrete case, measure the result, then scale up.",
    close: "Thanks to AI we are optimising our clients' business processes, saving them time and money.",
    areas: [
      { title: "AI training for managers", text: "Hands-on courses for the people who run the company: what AI can do in their own processes and where to start, without jargon." },
      { title: "Tenders", text: "We have taken part in many tenders and, thanks to AI, always successfully." },
      { title: "Human resources", text: "Automations and AI assistants for repetitive HR work, from handling requests to staff documents." },
      { title: "Purchasing", text: "AI analysis of orders, suppliers and quotes, to decide faster and with more reliable data." },
      { title: "Customs management", text: "Customs documents and procedures prepared and checked with AI, to reduce errors and lead times." },
      { title: "Document reconciliation", text: "With Rivelio we automatically match documents against ERP data, flagging only what doesn't add up." },
      { title: "Production documentation", text: "With ProcederAI we turn videos, manuals and operators' know-how into always up-to-date procedures and documentation, available right on the production floor." },
      { title: "Dark factory", text: "We are involved in fully automated “lights-out” factory projects together with international partners." },
    ],
  },

  faq: [
    {
      q: "How do we start an AI journey if we're beginning from scratch?",
      a: "We start from what you already have. We look at your processes and data, identify a concrete case where AI delivers a measurable advantage, and begin there — a small first project with a visible result, before scaling up. No revolution: one step at a time.",
    },
    {
      q: "Which systems and technologies do you work with?",
      a: "We support the leading ERP systems, including SAP, IBM i-Series (PWR), JDE, Infor, Oracle Cloud and NetSuite. On the Microsoft side we work with the 365 ecosystem, Power Platform, Copilot and Azure AI. For data we mainly use Power BI and Business Intelligence tools.",
    },
    {
      q: "How do you train people on AI and new systems?",
      a: "We support teams through adoption, with paths tailored to roles and to the company's real processes. The goal is to identify practical adoption cases straight away and experiment with them during the training sessions, so that these technologies become part of the everyday work of the people involved.",
    },
    {
      q: "How do you work with public administration?",
      a: "We support several public bodies with training and up-skilling on artificial intelligence, with attention to the procedural constraints and data-management requirements that context demands, in compliance with the regulations in force.",
    },
    {
      q: "How does a collaboration with GAM Group begin?",
      a: "Our approach follows no predefined path: every project is built to measure, taking into account the company's specific needs and characteristics, weighed against the experience we have gained in the field. It always starts with an open dialogue, followed by an in-depth analysis of the process in question, so we can pinpoint the concrete impact our work — whether consulting or development — can generate. This lets us offer genuinely effective, targeted solutions that deliver tangible value from the very start.",
    },
    {
      q: "How can we request a first contact?",
      a: "You can write to info@gamgroup.it or fill in the form on the Contact page.",
    },
    {
      q: "Will artificial intelligence replace people in the company?",
      a: "No: we use it to remove repetitive work, not people. The goal is to give those who work with the systems more time for tasks that need experience and judgement. That is why every project starts with training and involves the people who will actually use the tool.",
    },
  ],

  contact: {
    lbl: "Contact",
    title: { pre: "Let's find out together ", mark: "what we can do." },
    lead: "Tell us where you're starting from: the first step is always an open conversation.",
    sedeLbl: "Office",
    emailLbl: "Email",
    candidatureLbl: "Applications",
    faqLbl: "Frequently asked questions",
    faqTitle: "Before you write to us.",
    nome: "First name",
    cognome: "Last name",
    email: "Business email",
    azienda: "Company",
    messaggio: "Message",
    msgPlaceholder: "Write your message here",
    privacyPre: "I have read the ",
    privacyLink: "privacy policy",
    privacyPost: " and consent to the processing of my personal data in order to answer my request.",
    send: "Send",
    sending: "Sending…",
    successTitle: "Thank you!",
    successBody: "We have received your message and will get back to you as soon as possible.",
    netError: "Network unreachable. Please try again.",
    errors: {
      missingFields: "Please fill in your name, email and message.",
      invalidEmail: "Invalid email address.",
      privacyRequired: "Please accept the privacy policy.",
      sendFailed: "Sending failed. Please try again later.",
    },
  },

  map: { label: "Our office", directions: "Get directions →" },
  photoAlts: {
    libreria: "The white bookcase in GAM’s Treviso office, with plants and books",
    riunione: "The GAM team gathered around a work table",
    scaffale: "A model Maserati on a bookcase, with the office and its screens blurred in the background",
    lavoro: "A colleague at work in the office with exposed wooden beams",
    tavolo: "The GAM team working around a large table, seen from above",
    scrivania: "A desk in the GAM office with laptops and a model aeroplane",
    salotto: "The lounge corner of the GAM office",
    caffe: "The office coffee corner with the GAM lettering",
    f1: "Two members of the GAM team in front of Formula 1 cars in a museum",
    modellini: "Model helicopter, Vespa, jeep and Maserati on a shelf",
    vespa: "A helmet and a model Vespa on a white shelf",
  },
  footer: {
    copyright: "© 2026 GAM Group Srl · Via Siora Andriana del Vescovo, 5/C, 31100 Treviso, Italy · VAT no. 03641560267",
    privacy: "Privacy",
  },
};
