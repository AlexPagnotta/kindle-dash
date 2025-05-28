"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export type UseRevalidateDataOptions = {
  /**
   * Interval in milliseconds for revalidating data
   * @default 600000 (10 minutes)
   */
  interval?: number;
  /**
   * Whether the revalidation is enabled
   * @default true
   */
  enabled?: boolean;
};

/**
 * Custom hook to automatically revalidate server data at specified intervals
 * @param options Configuration options for the revalidation behavior
 */
export const useRevalidateData = (options: UseRevalidateDataOptions = {}) => {
  const { interval = 600000, enabled = true } = options;
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;

    // Set up interval to refresh server data
    const intervalId = setInterval(() => {
      router.refresh();
    }, interval);

    // Cleanup interval on component unmount or when dependencies change
    return () => clearInterval(intervalId);
  }, [router, interval, enabled]);
};
