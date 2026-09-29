import { JobsPage } from "@/components/site/pages";
import { en } from "@/lib/i18n/en";
import { getJobs, localizeJob } from "@/lib/jobs";
import { pageMetadata } from "@/lib/pageMeta";

/**
 * ISR: cached, revalidated at most once a minute. Publishing a position from
 * /admin-cms also calls revalidatePath() on this page, so it shows up at once.
 */
export const revalidate = 60;

export const metadata = pageMetadata("lavora", "en");

export default async function Page() {
  const jobs = (await getJobs()).map((j) => ({ id: j.id, ...localizeJob(j, "en") }));
  return <JobsPage dict={en} locale="en" jobs={jobs} />;
}
