import { getSession } from "~/features/auth/session";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (!session.isAuthenticated) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login).*)"],
};
