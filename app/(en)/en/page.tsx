import type { Metadata } from "next";
import Site from "@/components/Site";
import { getProjects, localizeProject } from "@/lib/projects";
import { getJobs, localizeJob } from "@/lib/jobs";
import { en } from "@/lib/i18n/en";
import { orgLd, faqLd } from "@/lib/structuredData";

// Same ISR behaviour as the Italian homepage; CMS operations revalidate /en too.
export const revalidate = 60;

export const metadata: Metadata = {
  alternates: {
    canonical: "/en",
    languages: { it: "/", en: "/en", "x-default": "/" },
  },
};

export default async function HomePageEn() {
  // English fields (project.en) override Italian per-field; anything not yet
  // translated in /admin-cms falls back to the Italian original.
  const projects = (await getProjects()).map((p) => localizeProject(p, "en"));
  const jobs = (await getJobs()).map((j) => localizeJob(j, "en"));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd("en")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(en)) }}
      />
      <Site projects={projects} jobs={jobs} dict={en} locale="en" />
    </>
  );
}
