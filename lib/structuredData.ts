import type { Dict, Locale } from "./i18n/types";

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
    email: "info@gamgroup.it",
    telephone: "+39 0422 583693",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Callalta 31/E",
      postalCode: "31100",
      addressLocality: "Treviso",
      addressRegion: "TV",
      addressCountry: "IT",
    },
    geo: { "@type": "GeoCoordinates", latitude: 45.66099553158068, longitude: 12.276944105971117 },
  };
}

export function faqLd(dict: Dict) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
