import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = {
  // No need to store any additional info for our use case
  isAuthenticated: boolean;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: "_auth",
  cookieOptions: {
    secure: process.env.NODE_ENV == "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return await getIronSession<SessionData>(cookieStore, sessionOptions);
}
