import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/" || PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Token is stored in localStorage (client-side only)
  // Route protection is handled by AuthGuard component
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
