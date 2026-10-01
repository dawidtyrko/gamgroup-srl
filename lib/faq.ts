import type { FaqId } from "./i18n/types";

/**
 * The questions the Contatti / Contact page shows. Exported so the page and
 * its FAQPage JSON-LD stay in sync — Google requires the markup to describe
 * exactly the Q&As that are visible on the page.
 */
export const CONTACT_FAQ: FaqId[] = ["avvio-ai", "gestionali", "formazione", "pa", "collaborazione"];
