import { notFound } from "next/navigation";
import { ServicePage } from "@/components/site/pages";
import { it } from "@/lib/i18n/it";
import { pageMetadata } from "@/lib/pageMeta";
import { SERVICE_KEYS, serviceFromSlug, serviceSlug } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_KEYS.map((k) => ({ slug: serviceSlug(k, "it") }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const key = serviceFromSlug(params.slug, "it");
  return key ? pageMetadata(`servizio:${key}`, "it") : {};
}

export default function Page({ params }: { params: { slug: string } }) {
  const key = serviceFromSlug(params.slug, "it");
  if (!key) notFound();
  return <ServicePage dict={it} locale="it" service={key} />;
}
