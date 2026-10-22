import { NextResponse, type NextRequest } from "next/server";

/**
 * Malformed Server Action requests (e.g. scanners sending `Next-Action: cachefn`)
 * would otherwise reach the App Router and make Next.js throw an invariant error.
 * Next.js 16 Server Action IDs are 42-character hex hashes, so reject anything else.
 */
const SERVER_ACTION_ID = /^[0-9a-f]{42}$/i;

export function proxy(request: NextRequest) {
  const actionId = request.headers.get("next-action");

  if (actionId && !SERVER_ACTION_ID.test(actionId)) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
