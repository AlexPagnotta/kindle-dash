import { getSession } from "~/features/auth/session";
import { NextRequest, NextResponse } from "next/server";

// Common bot user agents to block
const BOT_USER_AGENTS = [
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "pinterest",
  "crawler",
  "spider",
  "bot",
  "scraper",
];

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";

  // Block known bots
  const isBot = BOT_USER_AGENTS.some((botAgent) => userAgent.includes(botAgent));
  if (isBot) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  const session = await getSession();

  if (!session.isAuthenticated) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login).*)"],
};
