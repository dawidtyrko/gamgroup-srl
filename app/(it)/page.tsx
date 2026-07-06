import type { Metadata } from "next";
import Site from "@/components/Site";
import { getProjects } from "@/lib/projects";
import { it } from "@/lib/i18n/it";
import { orgLd, faqLd } from "@/lib/structuredData";

/**
 * ISR: the page is statically rendered and cached, then revalidated at most
 * once per minute. Adding a project via /admin-cms also calls
 * revalidatePath("/") + revalidatePath("/en") so new case studies appear
 * without a redeploy, while regular visitors still get a flash-fast cached page.
 */
export const revalidate = 60;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { it: "/", en: "/en", "x-default": "/" },
  },
};

export default async function HomePage() {
  const projects = await getProjects();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd("it")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(it)) }}
      />
      <Site projects={projects} dict={it} locale="it" />
    </>
  );
}
