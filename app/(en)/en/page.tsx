import type { Metadata } from "next";
import Site from "@/components/Site";
import { getProjects } from "@/lib/projects";
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
  // Case studies still come from KV in Italian — English fields arrive in
  // phase 2 of the i18n plan (optional `en` sub-object with per-field fallback).
  const projects = await getProjects();
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
      <Site projects={projects} dict={en} locale="en" />
    </>
  );
}
