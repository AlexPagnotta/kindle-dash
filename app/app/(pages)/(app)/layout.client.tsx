"use client";

import { useRevalidateData } from "~/features/utils/use-revalidate-data";

export const AppLayoutClient = ({ children }: { children: React.ReactNode }) => {
  useRevalidateData({ interval: 30 * 60 * 1000 }); // Revalidate page data every 30 minutes

  return children;
};
