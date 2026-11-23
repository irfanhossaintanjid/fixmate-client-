import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has("better-auth.session_token") || request.cookies.has("__Secure-better-auth.session_token");
  if (hasSession) return NextResponse.next();
  const redirectPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("redirect", redirectPath);
  return NextResponse.redirect(signInUrl);
}

export const config = { matcher: ["/dashboard/:path*"] };
