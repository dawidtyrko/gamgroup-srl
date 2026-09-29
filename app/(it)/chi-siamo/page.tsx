import { AboutPage } from "@/components/site/pages";
import { it } from "@/lib/i18n/it";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("chiSiamo", "it");

export default function Page() {
  return <AboutPage dict={it} locale="it" />;
}
