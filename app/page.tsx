import Site from "@/components/Site";
import { getProjects } from "@/lib/projects";

/**
 * ISR: the page is statically rendered and cached, then revalidated at most
 * once per minute. Adding a project via /admin-cms also calls
 * revalidatePath("/") so new case studies appear without a redeploy, while
 * regular visitors still get a flash-fast cached page.
 */
export const revalidate = 60;

export default async function HomePage() {
  const projects = await getProjects();
  return <Site projects={projects} />;
}
