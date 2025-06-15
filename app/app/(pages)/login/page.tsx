import { redirect } from "next/navigation";

import { getSession } from "~/features/auth/session";

import { LoginPageClient } from "./page.client";

export default async function LoginPage(props: { searchParams: Promise<{ redirect?: string; error?: string }> }) {
  const searchParams = await props.searchParams;
  const session = await getSession();

  if (session.isAuthenticated) {
    redirect("/");
  }

  const isRateLimitError = searchParams.error === "rate-limit";

  return <LoginPageClient rateLimitError={isRateLimitError} />;
}
