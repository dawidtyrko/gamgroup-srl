import { ContactPage } from "@/components/site/pages";
import { en } from "@/lib/i18n/en";
import { pageMetadata } from "@/lib/pageMeta";
import { CONTACT_FAQ } from "@/lib/faq";
import { faqLd, ldJson } from "@/lib/structuredData";

export const metadata = pageMetadata("contatti", "en");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(faqLd(en, CONTACT_FAQ))} />
      <ContactPage dict={en} locale="en" />
    </>
  );
}
