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
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
