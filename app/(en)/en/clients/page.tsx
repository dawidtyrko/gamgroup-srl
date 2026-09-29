import { ClientsPage } from "@/components/site/pages";
import { en } from "@/lib/i18n/en";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("clienti", "en");

export default function Page() {
  return <ClientsPage dict={en} locale="en" />;
}
