import { JobsPage } from "@/components/site/pages";
import { it } from "@/lib/i18n/it";
import { getJobs, localizeJob } from "@/lib/jobs";
import { pageMetadata } from "@/lib/pageMeta";

/**
 * ISR: cached, revalidated at most once a minute. Publishing a position from
 * /admin-cms also calls revalidatePath() on this page, so it shows up at once.
 */
export const revalidate = 60;

export const metadata = pageMetadata("lavora", "it");

export default async function Page() {
  const jobs = (await getJobs()).map((j) => ({ id: j.id, ...localizeJob(j, "it") }));
  return <JobsPage dict={it} locale="it" jobs={jobs} />;
}
