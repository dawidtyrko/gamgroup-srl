import { ContactPage } from "@/components/site/pages";
import { en } from "@/lib/i18n/en";
import { pageMetadata } from "@/lib/pageMeta";
import { faqLd, ldJson } from "@/lib/structuredData";

export const metadata = pageMetadata("contatti", "en");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(faqLd(en))} />
      <ContactPage dict={en} locale="en" />
    </>
  );
}
