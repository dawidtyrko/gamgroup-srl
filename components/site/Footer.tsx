import Link from "next/link";
import GamWordmark from "@/components/GamWordmark";
import type { Dict, Locale } from "@/lib/i18n/types";
import { href } from "@/lib/routes";
import { LOGO } from "./brand";

export default function Footer({ dict, locale }: { dict: Dict; locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <Link href={href("home", locale)} aria-label="GAM Group — Home">
          <GamWordmark color={LOGO} size={34} />
        </Link>
        <span>
          {dict.footer.copyright} · <Link href={href("privacy", locale)}>{dict.footer.privacy}</Link>
        </span>
      </div>
    </footer>
  );
}
