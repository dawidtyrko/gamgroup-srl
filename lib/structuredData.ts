import { ADDRESS, EMAIL, GEO } from "./contact";
import type { Dict, FaqId, Locale } from "./i18n/types";
import { pickFaq } from "./faqSelect";

// Structured data: company/office (local search) + FAQ (rich results, AI engines).
export function orgLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "GAM Group Srl",
    description:
      locale === "it"
        ? "Consulenza IT e system integration dal 2001: ERP (SAP, IBM i-Series), AI & Business Intelligence, sviluppo software, assistenza e manutenzione."
        : "IT consulting and system integration since 2001: ERP (SAP, IBM i-Series), AI & Business Intelligence, software development, support and maintenance.",
    foundingDate: "2001",
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      postalCode: ADDRESS.postalCode,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.province,
      addressCountry: ADDRESS.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
  };
}

/**
 * FAQPage markup for exactly the questions rendered on the page — Google
 * requires the structured data to match the visible content, so the caller
 * passes the same id list it gives <FaqList>.
 */
export function faqLd(dict: Dict, ids: FaqId[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pickFaq(dict, ids).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** `<script type="application/ld+json">` payload helper. */
export function ldJson(data: object) {
  return { __html: JSON.stringify(data) };
}
