import { NextRequest, NextResponse } from "next/server";
import { ROUTE_PATHS } from "./components/views/route";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuthenticatedPage = !request.nextUrl.pathname.includes("/auth");

  if (!accessToken && isAuthenticatedPage) {
    const absoluteURL = new URL(
      ROUTE_PATHS.AUTH.SIGNIN,
      request.nextUrl.origin
    );
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (accessToken && !isAuthenticatedPage) {
    const absoluteURL = new URL(ROUTE_PATHS.ROOT, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
