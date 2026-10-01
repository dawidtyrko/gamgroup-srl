import type { MetadataRoute } from "next";
import { ALL_PAGES, href } from "@/lib/routes";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://gamgroup-srl.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_PAGES.flatMap((page) => {
    const languages = { it: `${BASE}${href(page, "it")}`, en: `${BASE}${href(page, "en")}` };
    const priority = page === "home" ? 1 : page === "privacy" ? 0.3 : 0.8;
    const changeFrequency = page === "lavora" ? "weekly" : page === "privacy" ? "yearly" : "monthly";
    return (["it", "en"] as const).map((locale) => ({
      url: languages[locale],
      changeFrequency,
      // the EN page of a pair ranks a touch below the Italian original
      priority: locale === "it" ? priority : Math.round(priority * 90) / 100,
      alternates: { languages },
    }));
  });
}
