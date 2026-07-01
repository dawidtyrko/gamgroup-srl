import { NextResponse } from "next/server";

/**
 * Guards a mutating admin request. Returns an error NextResponse when the
 * request is not authorised (or the server is misconfigured), otherwise null.
 * The password may come from the `x-admin-password` header or a `password`
 * field in the JSON body.
 */
export function adminGuard(
  req: Request,
  body: Record<string, unknown>
): NextResponse | null {
  const expected = process.env.ADMIN_CMS_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_CMS_PASSWORD is not configured on the server." },
      { status: 500 }
    );
  }
  const provided =
    req.headers.get("x-admin-password") ?? (body.password as string | undefined);
  if (provided !== expected) {
    return NextResponse.json({ error: "Password non valida." }, { status: 401 });
  }
  return null;
}
