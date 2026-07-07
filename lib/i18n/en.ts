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
    eyebrow: "IT Consulting — System Integration — since 2001",
    title: "Welcome to",
    subtitle:
      "We evolve and optimise our clients' business processes, from consulting to systems.",
    ctaServices: "Explore our services",
    ctaContact: "Contact us",
    scroll: "Scroll",
    bandPlaceholder: "[ gam team — full-width photo ]",
  },
  claim: {
    muted: "We take your business",
    strong: " to the next level.",
    sub: "Innovating IT systems cuts costs, increases flexibility and improves service quality.",
  },
  services: {
    eyebrow: "01 — 04",
    title: "Our services",
    items: [
      {
        num: "01",
        title: "ERP Technical Consulting",
        tags: ["JDE", "SAP", "IBM i-Series", "Infor", "Oracle Cloud", "NetSuite", "BI", "Zucchetti", "CyberPlan"],
      },
      {
        num: "02",
        title: "Applied Consulting, AI & BI",
        tags: ["Project Management", "Lean Management", "AI", "Business Intelligence", "AI Agents / Copilots"],
      },
      {
        num: "03",
        title: "Development & System Integration",
        tags: ["Application Maintenance", "Software Development", "Integration & Migration"],
      },
      {
        num: "04",
        title: "Support & Maintenance",
        tags: ["Workplace services", "Networks & Infrastructure", "HD1 & HD2", "Security", "HW–SW", "Hosting"],
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
      { name: "IBM i-Series", items: ["SIGIP", "ACG", "STEALTH", "SMEUP", "GALILEO", "GEA"] },
      { name: "Business Intelligence", items: ["Power BI", "Dashboard & Reporting", "Data analysis", "Data Integration"] },
    ],
  },
  stats: {
    eyebrow: "Numbers are our strength",
    items: [
      { value: 20, label: "Years of experience" },
      { value: 60, label: "Qualified experts" },
      { value: 130, label: "Satisfied clients" },
      { value: 20, label: "Partners" },
    ],
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
      post: ". For over twenty years we have supported businesses in evolving and managing their IT systems.",
    },
    sectorsLabel: "Sectors",
    sectors: ["Retail", "Food", "Automotive", "Fashion", "Aerospace", "… and many more"],
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
  jobs: {
    eyebrow: "Work with us",
    title: "Join GAM",
    lead: "Join a team of IT experts. Open positions, growing all the time.",
    apply: "Apply now →",
    mailSubjectPrefix: "Application: ",
    spontaneousPre: "Spontaneous application — send your CV to",
    items: [
      { title: "SAP S/4HANA Consultant", sede: "Treviso", type: "Permanent contract", tags: ["SAP S/4HANA", "FI/CO or MM/SD", "3+ years"] },
      { title: "AMS Service Manager", sede: "Treviso", type: "Permanent contract", tags: ["ITIL", "Team management", "AMS"] },
      { title: "SAP Technical-Functional Analyst", sede: "Treviso", type: "Permanent contract", tags: ["ABAP", "SAP modules", "Functional analysis"] },
      { title: "IT Specialist", sede: "Treviso", type: "Permanent contract", tags: ["Systems administration", "Networks", "Help Desk"] },
      { title: "Senior IT Consultant", sede: "Treviso", type: "Permanent contract", tags: ["ERP", "Project Management", "5+ years"] },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        q: "What does GAM Group do?",
        a: "GAM Group is an IT consulting and system integration company active since 2001. We support businesses with ERP (SAP, IBM i-Series), applied consulting with AI and Business Intelligence, software development and systems support.",
      },
      {
        q: "Where is GAM Group located?",
        a: "Our office is in Treviso, Italy — Via Callalta 31/E. We work with clients across Italy, from SMEs to multinationals and public administration.",
      },
      {
        q: "Which systems and technologies do you work with?",
        a: "SAP (ECC, S/4HANA), IBM i-Series (AS400), Microsoft 365 with Power Platform and Copilot, and Business Intelligence tools such as Power BI.",
      },
      {
        q: "How can I request a consultation?",
        a: "Fill in the form in the Contact section, write to info@gamgroup.it or call +39 0422 583693 — we will get back to you as soon as possible.",
      },
    ],
  },
  contact: {
    eyebrow: "Contacts",
    title: "Let's find out together what we can do.",
    address: "Via Callalta 31/E – 31100 Treviso, Italy",
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
    copyright: "© 2026 GAM Group Srl — Via Callalta 31/E, 31100 Treviso (TV), Italy — VAT no. 03641560267",
    privacy: "Privacy",
  },
  langSwitch: { label: "IT", href: "/", menuLabel: "Italiano →" },
};
