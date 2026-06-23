import AdminCms from "./AdminCms";

// Keep this page out of search engines / sitemaps.
export const metadata = {
  title: "Admin CMS — GAM Group",
  robots: { index: false, follow: false },
};

export default function AdminCmsPage() {
  return <AdminCms />;
}
