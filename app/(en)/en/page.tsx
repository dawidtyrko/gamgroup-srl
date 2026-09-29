import { HomePage } from "@/components/site/pages";
import { en } from "@/lib/i18n/en";
import { pageMetadata } from "@/lib/pageMeta";
import { ldJson, orgLd } from "@/lib/structuredData";

export const metadata = pageMetadata("home", "en");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(orgLd("en"))} />
      <HomePage dict={en} locale="en" />
    </>
  );
}
