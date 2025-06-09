import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { Header } from "~/features/nav/header/header";

import "~/features/style/main.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "kindle-dash",
  description: "kindle-dash",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang="en" className={`${ibmPlexSans.variable}`}>
      {/* Cursor is hidden in production, as app is meant to be used with touch */}
      <body className={isProd ? "cursor-none" : ""}>{children}</body>
    </html>
  );
}
