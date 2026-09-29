import { HomePage } from "@/components/site/pages";
import { it } from "@/lib/i18n/it";
import { pageMetadata } from "@/lib/pageMeta";
import { ldJson, orgLd } from "@/lib/structuredData";

export const metadata = pageMetadata("home", "it");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(orgLd("it"))} />
      <HomePage dict={it} locale="it" />
    </>
  );
}
