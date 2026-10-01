export type Locale = "it" | "en";

/** Text with one highlighted span: `pre` + <mark>`mark`</mark> + `post`. */
export type Marked = { pre: string; mark: string; post?: string };

export type ContactBlockText = { lbl: string; title: string; cta: string };

/**
 * Stable key for a FAQ entry. Services and the contact page select which
 * questions to show by id rather than by position, so reordering or adding an
 * entry in one locale file can no longer silently point at the wrong question
 * (or past the end of the array).
 */
export type FaqId =
  | "avvio-ai"
  | "gestionali"
  | "formazione"
  | "pa"
  | "collaborazione"
  | "contatto"
  | "ai-persone";

export type ServiceText = {
  num: string;
  title: string;
  short: string; // one line, for the service cards
  h1: Marked;
  intro: string; // first paragraph, next to the title
  highlight: string; // second paragraph, in the tinted box
  cta: string;
  tags: string[];
  techTitle: string;
  eco: { name: string; items: string[] }[];
  step: number; // 1-4: which step of the journey this service is
  stepText: string;
  pathLead: string;
  faq: FaqId[]; // which questions this service shows
  contactTitle: string;
};

/**
 * One shape for every language — TypeScript enforces that a new locale file
 * translates every key.
 */
export interface Dict {
  meta: { title: string; description: string };
  pageMeta: Record<"chiSiamo" | "clienti" | "lavora" | "contatti", { title: string; description: string }>;
  nav: {
    home: string;
    chiSiamo: string;
    servizi: string;
    clienti: string;
    lavora: string;
    contattaci: string;
    menu: string;
    close: string;
  };
  langSwitch: { label: string; aria: string; menuLabel: string };
  common: { scopri: string; servizi: string; servizio: string };

  stats: { value: number; label: string }[];
  /** The 4 steps of "come lavoriamo"; step i belongs to service i. */
  steps: { title: string; text: string }[];

  home: {
    badge: string;
    pill: string;
    title: Marked;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    clientsLabel: string;
    journey: { lbl: string; title: string; lead: string };
    services: { lbl: string; title: string };
    contact: ContactBlockText;
  };

  services: {
    techLbl: string;
    pathLbl: string;
    pathTitle: string;
    faqLbl: string;
    faqTitle: string;
    othersLbl: string;
    contactLbl: string;
    items: Record<"erp" | "aiBi" | "integrazione" | "assistenza", ServiceText>;
  };

  about: {
    lbl: string;
    title: Marked;
    p: { pre: string; year: string; mid: string; city: string; post: string };
    approach: { lbl: string; title: string; text: string };
    sectorsLabel: string;
    sectors: string[];
    company: { lbl: string; title: string; lead: string };
    partners: { lbl: string; title: string };
    people: { lbl: string; title: string; text: string };
    world: { lbl: string; title: string; text: string };
    contact: ContactBlockText;
  };

  clients: {
    lbl: string;
    title: Marked;
    lead: string;
    sectors: { lbl: string; title: string; items: string[] };
    contact: ContactBlockText;
  };

  jobs: {
    lbl: string;
    title: Marked;
    lead: string;
    openLbl: string;
    countOne: string;
    countMany: string; // "{n}" is replaced with the number
    none: string;
    filters: { all: string; sap: string; dev: string; remote: string };
    details: string;
    apply: string;
    roleLabel: string;
    mailSubjectPrefix: string;
    spontaneous: { lbl: string; title: string; textPre: string; cta: string };
  };

  /** "L'AI in pratica": cards on the home page, numbered list on the AI & BI page. */
  ai: { lbl: string; listLbl: string; title: string; intro: string; close: string; areas: { title: string; text: string }[] };

  faq: { id: FaqId; q: string; a: string }[];

  contact: {
    lbl: string;
    title: Marked;
    lead: string;
    sedeLbl: string;
    emailLbl: string;
    candidatureLbl: string;
    faqLbl: string;
    faqTitle: string;
    nome: string;
    cognome: string;
    email: string;
    azienda: string;
    messaggio: string;
    msgPlaceholder: string;
    privacyPre: string;
    privacyLink: string;
    privacyPost: string;
    send: string;
    sending: string;
    successTitle: string;
    successBody: string;
    netError: string;
    errors: {
      missingFields: string;
      invalidEmail: string;
      privacyRequired: string;
      sendFailed: string;
    };
  };

  map: { label: string; directions: string };
  photoAlts: Record<
    "libreria" | "riunione" | "scaffale" | "lavoro" | "tavolo" | "scrivania" | "salotto" | "caffe" | "f1" | "modellini" | "vespa",
    string
  >;
  footer: { copyright: string; privacy: string };
}
