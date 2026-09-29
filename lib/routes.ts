import type { Locale } from "./i18n/types";

/**
 * Every public page, keyed once and mapped to its URL in each language.
 * The header's language switch uses this to jump to the SAME page in the
 * other language; the sitemap and hreflang alternates are built from it too.
 */
export type ServiceKey = "erp" | "aiBi" | "integrazione" | "assistenza";
export type PageKey =
  | "home"
  | "chiSiamo"
  | "clienti"
  | "lavora"
  | "contatti"
  | "privacy"
  | `servizio:${ServiceKey}`;

export const SERVICE_KEYS: ServiceKey[] = ["erp", "aiBi", "integrazione", "assistenza"];

const SERVICE_SLUGS: Record<ServiceKey, { it: string; en: string }> = {
  erp: { it: "consulenza-erp", en: "erp-consulting" },
  aiBi: { it: "ai-bi", en: "ai-bi" },
  integrazione: { it: "sviluppo-integrazione", en: "development-integration" },
  assistenza: { it: "assistenza", en: "support" },
};

const PATHS: Record<Exclude<PageKey, `servizio:${ServiceKey}`>, { it: string; en: string }> = {
  home: { it: "/", en: "/en" },
  chiSiamo: { it: "/chi-siamo", en: "/en/about" },
  clienti: { it: "/clienti", en: "/en/clients" },
  lavora: { it: "/lavora-con-noi", en: "/en/job-board" },
  contatti: { it: "/contatti", en: "/en/contact" },
  privacy: { it: "/privacy", en: "/en/privacy" },
};

export function serviceSlug(key: ServiceKey, locale: Locale): string {
  return SERVICE_SLUGS[key][locale];
}

export function serviceFromSlug(slug: string, locale: Locale): ServiceKey | undefined {
  return SERVICE_KEYS.find((k) => SERVICE_SLUGS[k][locale] === slug);
}

export function href(page: PageKey, locale: Locale): string {
  if (page.startsWith("servizio:")) {
    const key = page.slice("servizio:".length) as ServiceKey;
    return `${locale === "it" ? "/servizi" : "/en/services"}/${SERVICE_SLUGS[key][locale]}`;
  }
  return PATHS[page as keyof typeof PATHS][locale];
}

/** hreflang alternates for a page's `metadata.alternates`. */
export function alternates(page: PageKey, locale: Locale) {
  return {
    canonical: href(page, locale),
    languages: { it: href(page, "it"), en: href(page, "en"), "x-default": href(page, "it") },
  };
}

/** Every page, for the sitemap. */
export const ALL_PAGES: PageKey[] = [
  "home",
  "chiSiamo",
  ...SERVICE_KEYS.map((k) => `servizio:${k}` as PageKey),
  "clienti",
  "lavora",
  "contatti",
  "privacy",
];
