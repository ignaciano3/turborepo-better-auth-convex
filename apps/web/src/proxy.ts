import { isAuthenticated } from "@repo/backend/lib/auth-server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const UNAUTHENTICATED_PATHS = ["/sign-up", "/sign-in"];

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasToken = await isAuthenticated();

  if (
    hasToken &&
    UNAUTHENTICATED_PATHS.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!hasToken && !UNAUTHENTICATED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/sign-up", "/sign-in"],
};
