import { getSession } from "~/features/auth/session";
import { LoginPageClient } from "./page.client";
import { redirect } from "next/navigation";

export default async function LoginPage(props: { searchParams: Promise<{ redirect?: string; error?: string }> }) {
  const searchParams = await props.searchParams;
  const session = await getSession();

  if (session.isAuthenticated) {
    redirect("/");
  }

  const isRateLimitError = searchParams.error === "rate-limit";

  return <LoginPageClient rateLimitError={isRateLimitError} />;
}
