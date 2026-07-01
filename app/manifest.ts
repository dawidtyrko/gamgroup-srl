import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GAM Group Srl",
    short_name: "GAM Group",
    description:
      "Consulenza IT & System Integration dal 2001 — Treviso.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#647DB6",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
