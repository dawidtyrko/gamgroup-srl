/**
 * Single source of truth for the company's contact details. These appear in the
 * header of several pages, in the contact block at the bottom of most of them
 * and in the Organization JSON-LD — keeping one copy means an address change is
 * a one-line edit (the address last moved on 2026-09-30).
 *
 * The localized marketing copy in lib/i18n/*.ts repeats the address inside full
 * sentences on purpose; that text is translated, so it stays in the dictionaries.
 */
export const ADDRESS = {
  street: "Via Siora Andriana del Vescovo, 5/C",
  postalCode: "31100",
  city: "Treviso",
  province: "TV",
  country: "IT",
} as const;

/** "Via Siora Andriana del Vescovo, 5/C, 31100 Treviso" — the contact-block line. */
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.city}`;

export const EMAIL = "info@gamgroup.it";
export const RECRUITMENT_EMAIL = "recruitment@gamgroup.it";

export const GEO = { lat: 45.6706739, lng: 12.2550351 } as const;
