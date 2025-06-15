"use client";

import { useEffect, useState } from "react";

import { getCurrentDateTime } from "./utils";

type HeaderDateTimeProps = {
  initialDateTime: string;
  className?: string;
};

export const HeaderDateTime = ({ initialDateTime, className }: HeaderDateTimeProps) => {
  const [currentDateTime, setCurrentDateTime] = useState(initialDateTime);

  useEffect(() => {
    // Set up interval to update every 10 seconds
    const intervalId = setInterval(() => setCurrentDateTime(getCurrentDateTime()), 10_000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return <div className={className}>{currentDateTime}</div>;
};
