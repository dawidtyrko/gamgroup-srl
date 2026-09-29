import { notFound } from "next/navigation";
import { ServicePage } from "@/components/site/pages";
import { en } from "@/lib/i18n/en";
import { pageMetadata } from "@/lib/pageMeta";
import { SERVICE_KEYS, serviceFromSlug, serviceSlug } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_KEYS.map((k) => ({ slug: serviceSlug(k, "en") }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const key = serviceFromSlug(params.slug, "en");
  return key ? pageMetadata(`servizio:${key}`, "en") : {};
}

export default function Page({ params }: { params: { slug: string } }) {
  const key = serviceFromSlug(params.slug, "en");
  if (!key) notFound();
  return <ServicePage dict={en} locale="en" service={key} />;
}
