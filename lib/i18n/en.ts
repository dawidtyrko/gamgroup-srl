import type { Dict } from "./types";

// English — pillar names follow the EN naming in the website spec (§2).
// NOTE: translation drafted by the dev team — to be reviewed by Vittoria/marketing.
export const en: Dict = {
  meta: {
    title: "GAM Group — IT Consulting & System Integration since 2001",
    description:
      "GAM Group Srl: we evolve and optimise our clients' business processes, from consulting to systems. Treviso, Italy — since 2001.",
  },
  nav: {
    home: "Home",
    chisiamo: "About Us",
    servizi: "Services",
    progetti: "Projects",
    jobboard: "Careers",
    contattaci: "Contact us",
  },
  dropdown: { pillars: "Pillars", channels: "Channels" },
  hero: {
    eyebrow: "IT Consulting • System Integration • Artificial Intelligence • since 2001",
    title: "Welcome to",
    subtitle:
      "We evolve and optimise companies' business processes. From consulting to systems, with AI as an integral part of every project.",
    ctaServices: "Explore our services",
    ctaContact: "Contact us",
    scroll: "Scroll",
    bandPlaceholder: "[ gam team — full-width photo ]",
  },
  bridge: { alt: "The bridge between business and IT: GAM at the centre, powered by AI" },
  claim: {
    muted: "We take your business",
    strong: " to the next level.",
    sub: "We know the systems that run your company inside out, and we integrate artificial intelligence to make them even more efficient — going well beyond pilot projects. We deliver solutions at scale, monitoring and measuring concrete results, and ensuring a return on the investment in our projects.",
  },
  services: {
    eyebrow: "01 — 04",
    title: "Our services",
    items: [
      {
        num: "01",
        title: "ERP Technical Consulting",
        tags: ["JDE", "SAP", "IBM i-Series", "Infor", "Oracle Cloud", "NetSuite", "BI", "Zucchetti", "CyberPlan"],
        description: [
          "Over 30 years of hands-on experience — from implementation to customisation, from upgrades to AMS. GAM Group manages the leading ERP systems, including SAP, PWR (IBM i-Series), JDE, Infor, Oracle Cloud and NetSuite.",
          "Our team of experts knows the systems and the needs of your business. On that foundation we integrate automations and AI agents to take manual work off orders, master data and reporting.",
        ],
      },
      {
        num: "02",
        title: "Applied Consulting, AI & BI",
        tags: ["Project Management", "Lean Management", "AI", "Business Intelligence", "AI Agents / Copilots"],
        description: [
          "Business data is often scattered across different management software, spreadsheets and various tools. We organise it in a structured way and make it easy to interpret, enabling more effective decision-making.",
          "Predictive dashboards, AI agents and copilots built on each company's own processes, ensuring the optimisation of the underlying process and the savings of the solutions designed.",
        ],
      },
      {
        num: "03",
        title: "Development & System Integration",
        tags: ["Application Maintenance", "Software Development", "Integration & Migration"],
        description: [
          "Custom software and application development and the integration of ERP, CRM and BI systems into a single ecosystem.",
          "A single point of contact with an end-to-end approach, from analysis to maintenance. The result is a single ecosystem, with clean, accessible data — the condition for AI to truly work.",
        ],
      },
      {
        num: "04",
        title: "Support & Maintenance",
        tags: ["Workplace services", "Networks & Infrastructure", "HD1 & HD2", "Security", "HW–SW", "Hosting"],
        description: [
          "End-to-end 360° IT infrastructure — from multi-level help desk to data security, through to hosting and cloud.",
          "We guarantee fast, proactive interventions for a system that is always up and running.",
        ],
      },
    ],
  },
  channels: {
    eyebrow: "Technologies",
    title: "Our channels",
    items: [
      {
        name: "MS 365",
        items: ["MS365 Suite", "Power Automate", "Power Apps", "SharePoint", "Dynamics 365", "Power BI", "Copilot 365", "Copilot Studio", "Azure AI", "AI Hub"],
      },
      { name: "SAP", items: ["SAP ECC", "SAP S/4HANA", "Business ByDesign", "SAP B.One"] },
      { name: "IBM i-Series", items: ["SIGIP", "ACG", "STEALTH", "SMEUP", "GALILEO", "GEA", "Gipros"] },
      { name: "Business Intelligence", items: ["Power BI", "Qlik", "Tableau", "SAP BO"] },
    ],
  },
  stats: {
    eyebrow: "Numbers are our strength",
    items: [
      { value: 25, label: "Years of experience" },
      { value: 60, label: "Qualified experts" },
      { value: 130, label: "Satisfied clients" },
      { value: 20, label: "Partners" },
    ],
  },
  ai: {
    eyebrow: "AI in practice",
    title: "Artificial intelligence, without fear.",
    intro:
      "We don’t use it to impress: we apply it to everyday processes, to remove manual work, reduce errors and save time and money. We start from a concrete case, measure the result, then scale up.",
    close: "Thanks to AI we are optimising our clients’ business processes, saving them time and money.",
    areas: [
      { title: "AI training for managers", text: "Hands-on courses for the people who run the company: what AI can do in their own processes and where to start, without jargon." },
      { title: "Tenders", text: "We have taken part in many tenders and, thanks to AI, always successfully." },
      { title: "Human resources", text: "Automations and AI assistants for repetitive HR work, from handling requests to staff documents." },
      { title: "Purchasing", text: "AI analysis of orders, suppliers and quotes, to decide faster and with more reliable data." },
      { title: "Customs management", text: "Customs documents and procedures prepared and checked with AI, to reduce errors and lead times." },
      { title: "Document reconciliation", text: "With Rivelio we automatically match documents against ERP data, flagging only what doesn’t add up." },
      { title: "Production documentation", text: "With ProcederAI we turn videos, manuals and operators’ know-how into always up-to-date procedures and documentation, available right on the production floor." },
      { title: "Dark factory", text: "We are involved in fully automated “lights-out” factory projects together with international partners." },
    ],
  },
  gallery: {
    eyebrow: "The company",
    title: "Where our projects take shape.",
    lead: "A bright office in Treviso, a close-knit team and a shared passion for engines. This is where we build solutions alongside our clients every day.",
    alts: {
      salotto: "The lounge corner of the GAM office",
      caffe: "The office coffee corner with the GAM lettering",
      f1: "Two members of the GAM team in front of Formula 1 cars in a museum",
      modellini: "Model helicopter, Vespa, jeep and Maserati on a shelf",
      vespa: "A helmet and a model Vespa on a white shelf",
    },
  },
  about: {
    eyebrow: "About us",
    title: "The partner you can trust.",
    cta: "Talk to us →",
    p: {
      pre: "GAM Group is an Italian company founded in ",
      year: "2001",
      mid: ", based in ",
      city: "Treviso",
      post: ". For over twenty years we have supported businesses in evolving and managing their IT systems, guiding them through the artificial-intelligence revolution with concrete solutions, integrated into their processes and results-oriented.",
    },
    sectorsLabel: "Sectors we work in",
    sectors: ["Retail", "Food", "Automotive", "Fashion", "Aerospace", "Public administration", "… and many more"],
  },
  projectsSec: {
    eyebrow: "Case studies",
    title: "Our projects",
    readMore: "Read the case study →",
    trailing: "And many more projects, across every sector.",
    hint: "Scroll to explore →",
  },
  partners: {
    eyebrow: "Our technology partners",
    names: ["Rivelio", "Microsoft Partner", "ProcederAI", "Claude", "AWS"],
  },
  clients: { eyebrow: "Some of our clients" },
  jobs: {
    eyebrow: "Work with us",
    title: "Join GAM",
    lead: "Join a team of IT experts. Open positions, growing all the time.",
    apply: "Apply now →",
    learnMore: "Learn more →",
    roleLabel: "The role",
    mailSubjectPrefix: "Application: ",
    spontaneousPre: "Spontaneous application — send your CV to",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
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
        a: "You can write to info@gamgroup.it or fill in the form in the Contact section below.",
      },
      {
        q: "Will artificial intelligence replace people in the company?",
        a: "No. AI removes the repetitive work — re-keying data, checking documents, hunting for information — and leaves decisions and relationships to people. In the projects we run, the result is that time shifts from manual tasks to the ones that add value.",
      },
    ],
  },
  contact: {
    eyebrow: "Contacts",
    title: "Let's find out together what we can do.",
    address: "Via Siora Andriana del Vescovo, 5/C – 31100 Treviso, Italy",
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
  modal: {
    challenge: "The challenge",
    project: "The project",
    benefits: "Benefits",
    cta: "Talk to us about your project →",
    close: "Close",
  },
  footer: {
    copyright: "© 2026 GAM Group Srl — Via Siora Andriana del Vescovo, 5/C, 31100 Treviso (TV), Italy — VAT no. 03641560267",
    privacy: "Privacy",
  },
  langSwitch: { label: "IT", href: "/", menuLabel: "Italiano →" },
};
