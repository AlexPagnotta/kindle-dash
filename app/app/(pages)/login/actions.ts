"use server";

import { redirect } from "next/navigation";
import { getSession } from "~/features/auth/session";

export async function auth(formData: FormData) {
  const session = await getSession();
  const shouldAuthenticate = formData.get("pin") == process.env.APP_PIN;

  session.isAuthenticated = shouldAuthenticate;

  await session.save();

  if (!shouldAuthenticate) {
    redirect(`/login`);
  }

  redirect("/");
}
