import { AboutPage } from "@/components/site/pages";
import { en } from "@/lib/i18n/en";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("chiSiamo", "en");

export default function Page() {
  return <AboutPage dict={en} locale="en" />;
}
