import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const referer = request.headers.get("referer") || "";
  if (request.nextUrl.pathname.startsWith("/RestoreUser")) {
    if (!referer.includes("/api/auth/callback/")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Add this condition to redirect /viewall to /viewall/discover
  if (request.nextUrl.pathname === "/View") {
    return NextResponse.redirect(new URL("/View/discover", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/RestoreUser/:path*",
    "/View", // Add this line to apply the middleware to /viewall
  ],
};
