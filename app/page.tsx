import Site from "@/components/Site";
import { getProjects } from "@/lib/projects";
import { faqs } from "@/lib/faqs";

/**
 * ISR: the page is statically rendered and cached, then revalidated at most
 * once per minute. Adding a project via /admin-cms also calls
 * revalidatePath("/") so new case studies appear without a redeploy, while
 * regular visitors still get a flash-fast cached page.
 */
export const revalidate = 60;

// Structured data: company/office (local search) + FAQ (rich results, AI engines).
const orgLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "GAM Group Srl",
  description:
    "Consulenza IT e system integration dal 2001: ERP (SAP, IBM i-Series), AI & Business Intelligence, sviluppo software, assistenza e manutenzione.",
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

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function HomePage() {
  const projects = await getProjects();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Site projects={projects} />
    </>
  );
}
