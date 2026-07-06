export type Locale = "it" | "en";

/**
 * One shape for every language — TypeScript enforces that a new locale file
 * translates every key. Brand names, tech chips and contact data that never
 * change (SAP, Power BI, addresses…) still live in the dictionaries so each
 * locale COULD override them, but usually they are identical.
 */
export interface Dict {
  meta: { title: string; description: string };
  nav: {
    home: string;
    chisiamo: string;
    servizi: string;
    progetti: string;
    jobboard: string;
    contattaci: string;
  };
  dropdown: { pillars: string; channels: string };
  hero: {
    eyebrow: string;
    title: string; // line before the GAM wordmark
    subtitle: string;
    ctaServices: string;
    ctaContact: string;
    scroll: string;
    bandPlaceholder: string;
  };
  claim: { muted: string; strong: string; sub: string };
  services: {
    eyebrow: string;
    title: string;
    items: { num: string; title: string; tags: string[] }[];
  };
  channels: {
    eyebrow: string;
    title: string;
    items: { name: string; items: string[] }[];
  };
  stats: { eyebrow: string; items: { value: number; label: string }[] };
  about: {
    eyebrow: string;
    title: string;
    cta: string;
    // paragraph split around the bolded year/city
    p: { pre: string; year: string; mid: string; city: string; post: string };
    sectorsLabel: string;
    sectors: string[];
  };
  featured: { eyebrow: string };
  projectsSec: {
    eyebrow: string;
    title: string;
    readMore: string; // shared by gallery cards + featured card
    trailing: string;
    hint: string;
  };
  partners: { eyebrow: string; names: string[] };
  jobs: {
    eyebrow: string;
    title: string;
    lead: string;
    apply: string;
    mailSubjectPrefix: string;
    spontaneousPre: string; // text before the email link
    items: { title: string; sede: string; type: string; tags: string[] }[];
  };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  contact: {
    eyebrow: string;
    title: string;
    address: string;
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
  modal: { challenge: string; project: string; benefits: string; cta: string; close: string };
  footer: { copyright: string; privacy: string };
  langSwitch: { label: string; href: string; menuLabel: string };
}
