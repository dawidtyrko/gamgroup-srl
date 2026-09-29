import type { Metadata } from "next";
import { en } from "./i18n/en";
import { it } from "./i18n/it";
import type { Dict, Locale } from "./i18n/types";
import { alternates, type PageKey, type ServiceKey } from "./routes";

export const dicts: Record<Locale, Dict> = { it, en };

/** Title, description and hreflang alternates for a page, in one call. */
export function pageMetadata(page: PageKey, locale: Locale): Metadata {
  const d = dicts[locale];
  let title = d.meta.title;
  let description = d.meta.description;
  if (page.startsWith("servizio:")) {
    const s = d.services.items[page.slice("servizio:".length) as ServiceKey];
    title = `${s.title} — GAM Group`;
    description = s.intro;
  } else if (page in d.pageMeta) {
    ({ title, description } = d.pageMeta[page as keyof Dict["pageMeta"]]);
  }
  return {
    title,
    description,
    alternates: alternates(page, locale),
    openGraph: { title, description, locale: locale === "it" ? "it_IT" : "en_GB", siteName: "GAM Group" },
  };
}
