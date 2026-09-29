import { ClientsPage } from "@/components/site/pages";
import { it } from "@/lib/i18n/it";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata("clienti", "it");

export default function Page() {
  return <ClientsPage dict={it} locale="it" />;
}
