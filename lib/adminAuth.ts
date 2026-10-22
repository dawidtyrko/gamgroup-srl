import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { kv } from "@vercel/kv";

/** Failed attempts allowed per IP before the lockout kicks in. */
const MAX_ATTEMPTS = 10;
/** Lockout / counter window, in seconds. */
const WINDOW_SECONDS = 600; // 10 minutes

/** True only when the KV REST credentials are present in the environment. */
function kvConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 * Constant-time secret comparison. Both sides are hashed first so the digests
 * are always 32 bytes — `timingSafeEqual` throws on a length mismatch, and
 * comparing the raw strings would leak the expected password's length.
 */
function secretsMatch(provided: string, expected: string): boolean {
  const digest = (s: string) => createHash("sha256").update(s, "utf8").digest();
  return timingSafeEqual(digest(provided), digest(expected));
}

/**
 * Best-effort client IP. On Vercel `x-forwarded-for` is set by the edge and
 * its first entry is the real client; the rest are proxies.
 */
function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

const failKey = (ip: string) => `gam:admin:fail:${ip}`;

/**
 * Guards a mutating admin request. Returns an error NextResponse when the
 * request is not authorised (or the server is misconfigured), otherwise null.
 *
 * The password must arrive in the `x-admin-password` header. It is deliberately
 * NOT read from the JSON body: request bodies are far more likely than headers
 * to end up in proxy/monitoring logs.
 *
 * Repeated failures from one IP are counted in KV and locked out for
 * WINDOW_SECONDS once MAX_ATTEMPTS is reached — without this a single shared
 * password is brute-forceable at will. The lockout is checked *before* the
 * password, so a locked-out IP is refused even with the right password.
 * Rate limiting fails open when KV is absent (local dev) or unreachable: a KV
 * outage must not lock the CMS out entirely.
 */
export async function adminGuard(req: Request): Promise<NextResponse | null> {
  const expected = process.env.ADMIN_CMS_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_CMS_PASSWORD is not configured on the server." },
      { status: 500 }
    );
  }

  const ip = clientIp(req);
  const limited = kvConfigured();

  if (limited) {
    try {
      const fails = Number((await kv.get(failKey(ip))) ?? 0);
      if (fails >= MAX_ATTEMPTS) {
        return NextResponse.json(
          { error: "Troppi tentativi. Riprova tra qualche minuto." },
          { status: 429, headers: { "Retry-After": String(WINDOW_SECONDS) } }
        );
      }
    } catch (err) {
      console.error("[adminAuth] rate-limit read failed, allowing:", err);
    }
  }

  const provided = req.headers.get("x-admin-password");
  if (!provided || !secretsMatch(provided, expected)) {
    if (limited) {
      try {
        // The window starts at the first failure and is not extended by later
        // ones, so a locked-out IP always frees up WINDOW_SECONDS later.
        const fails = await kv.incr(failKey(ip));
        if (fails === 1) await kv.expire(failKey(ip), WINDOW_SECONDS);
      } catch (err) {
        console.error("[adminAuth] rate-limit write failed:", err);
      }
    }
    return NextResponse.json({ error: "Password non valida." }, { status: 401 });
  }

  if (limited) {
    try {
      await kv.del(failKey(ip));
    } catch {
      /* a stale counter expires on its own */
    }
  }
  return null;
}
