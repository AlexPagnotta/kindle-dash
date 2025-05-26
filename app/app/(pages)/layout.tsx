import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
