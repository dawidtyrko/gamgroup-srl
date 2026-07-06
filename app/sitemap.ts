import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://gamgroup-srl.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/`,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { it: `${BASE}/`, en: `${BASE}/en` } },
    },
    {
      url: `${BASE}/en`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { it: `${BASE}/`, en: `${BASE}/en` } },
    },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/en/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
