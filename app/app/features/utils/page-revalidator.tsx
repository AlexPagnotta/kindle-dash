"use client";

import { useRevalidateData, UseRevalidateDataOptions } from "./use-revalidate-data";

export const PageRevalidator = ({
  options,
  children,
}: {
  options?: UseRevalidateDataOptions;
  children: React.ReactNode;
}) => {
  useRevalidateData(options);

  return children;
};
