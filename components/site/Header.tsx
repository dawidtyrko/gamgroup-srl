"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import GamWordmark from "@/components/GamWordmark";
import type { Dict, Locale } from "@/lib/i18n/types";
import { href, type PageKey } from "@/lib/routes";
import { LOGO } from "./brand";

/** The manual language choice wins over geolocation (see middleware.ts). */
function rememberLang(target: Locale) {
  document.cookie = `gam_locale=${target}; path=/; max-age=31536000; samesite=lax`;
}

export default function Header({
  dict,
  locale,
  page,
}: {
  dict: Pick<Dict, "nav" | "langSwitch">;
  locale: Locale;
  page: PageKey;
}) {
  const [open, setOpen] = useState(false);
  const other: Locale = locale === "it" ? "en" : "it";
  const isService = page.startsWith("servizio:");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items: { label: string; to: PageKey; on: boolean }[] = [
    { label: dict.nav.chiSiamo, to: "chiSiamo", on: page === "chiSiamo" },
    { label: dict.nav.servizi, to: "servizio:erp", on: isService },
    { label: dict.nav.clienti, to: "clienti", on: page === "clienti" },
    { label: dict.nav.lavora, to: "lavora", on: page === "lavora" },
  ];

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href={href("home", locale)} aria-label="GAM Group — Home" className="header-logo">
          <GamWordmark color={LOGO} size={40} />
        </Link>

        <nav className="header-nav" aria-label="Menu">
          {items.map((it) => (
            <Link key={it.to} href={href(it.to, locale)} className={it.on ? "on" : undefined}>
              {it.label}
            </Link>
          ))}
          <Link href={href("contatti", locale)} className={`cta${page === "contatti" ? " on" : ""}`}>
            {dict.nav.contattaci}
          </Link>
          <Link href={href(page, other)} className="lang" aria-label={dict.langSwitch.aria} onClick={() => rememberLang(other)}>
            {dict.langSwitch.label}
          </Link>
        </nav>

        <button className="burger" onClick={() => setOpen(true)} aria-label={dict.nav.menu} aria-expanded={open}>
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <div className="wrap header-row">
            <Link href={href("home", locale)} onClick={() => setOpen(false)} aria-label="GAM Group — Home">
              <GamWordmark color={LOGO} size={34} />
            </Link>
            <button className="mobile-close" onClick={() => setOpen(false)} aria-label={dict.nav.close}>
              ×
            </button>
          </div>
          <nav className="wrap mobile-nav">
            {[{ label: dict.nav.home, to: "home" as PageKey }, ...items, { label: dict.nav.contattaci, to: "contatti" as PageKey }].map((it) => (
              <Link key={it.to} href={href(it.to, locale)} onClick={() => setOpen(false)} className={it.to === "contatti" ? "accent" : undefined}>
                {it.label}
              </Link>
            ))}
            <Link href={href(page, other)} className="mobile-lang" onClick={() => rememberLang(other)}>
              {dict.langSwitch.menuLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
