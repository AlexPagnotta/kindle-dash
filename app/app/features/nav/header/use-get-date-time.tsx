"use client";

import { useEffect, useState } from "react";

const UPDATE_INTERVAL = 10_000;

/**
 * Returns the current date and time in the format "DD MMM HH:MM"
 *
 * @returns The current date and time in the format "DD MMM HH:MM"
 */
export const useGetDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
      const formattedTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setCurrentDateTime(`${formattedDate} ${formattedTime}`);
    };

    // Update at first render
    updateDateTime();

    // Set up interval to update every 10 seconds
    const intervalId = setInterval(updateDateTime, UPDATE_INTERVAL);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return currentDateTime;
};
