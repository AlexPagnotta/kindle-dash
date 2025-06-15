"use server";

import { redirect } from "next/navigation";

import { isLoginDisabled, recordFailedAttempt } from "~/features/auth/rate-limiter";
import { getSession } from "~/features/auth/session";

export async function auth(formData: FormData) {
  // Check if login is disabled due to rate limiting
  if (isLoginDisabled()) {
    redirect(`/login?error=rate-limit`);
  }

  const session = await getSession();
  const shouldAuthenticate = formData.get("pin") == process.env.APP_PIN;

  // Authentication is successful
  if (shouldAuthenticate) {
    session.isAuthenticated = true;
    await session.save();
    redirect("/");
  }
  // Authentication is not successful
  else {
    session.isAuthenticated = false;
    await session.save();

    // Record the failed attempt
    recordFailedAttempt();
    if (isLoginDisabled()) {
      redirect(`/login?error=rate-limit`);
    } else {
      redirect(`/login`);
    }
  }
}
