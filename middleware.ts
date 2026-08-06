import { NextResponse, type NextRequest } from "next/server";

/**
 * Automatic language routing for the homepage.
 *
 * Precedence:
 *   1. Manual choice — a `gam_locale` cookie (set when the visitor clicks the
 *      language switch) always wins, so a non-Italy visitor can still choose
 *      Italian and stay there without being redirected back.
 *   2. Geolocation — visitors located in Italy get the Italian site (`/`);
 *      everyone else is redirected to the English site (`/en`).
 *   3. Fallback — no cookie and no geo data (e.g. local dev) → Italian.
 *
 * Only the Italian homepage (`/`) can auto-redirect; `/en` and every other
 * route are served untouched (see `matcher`).
 */
export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("gam_locale")?.value;
  const country =
    req.geo?.country || req.headers.get("x-vercel-ip-country") || "";

  const preferEn = cookie
    ? cookie === "en"
    : country !== "" && country !== "IT";

  if (preferEn) {
    const url = req.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Homepage only — never intercept /en, assets, the API, or deep links.
  matcher: ["/"],
};
