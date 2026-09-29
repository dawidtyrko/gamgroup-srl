import { ContactPage } from "@/components/site/pages";
import { it } from "@/lib/i18n/it";
import { pageMetadata } from "@/lib/pageMeta";
import { faqLd, ldJson } from "@/lib/structuredData";

export const metadata = pageMetadata("contatti", "it");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(faqLd(it))} />
      <ContactPage dict={it} locale="it" />
    </>
  );
}
