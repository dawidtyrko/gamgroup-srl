import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { en } from "@/lib/i18n/en";
import "../globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gamgroup-srl.vercel.app"),
  title: en.meta.title,
  description: en.meta.description,
};

export const viewport: Viewport = {
  themeColor: "#2D4BF0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Zilla+Slab:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
