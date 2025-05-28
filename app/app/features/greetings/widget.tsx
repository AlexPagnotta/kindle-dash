"use client";

import { useState, useEffect } from "react";
import { getGreeting } from "./utils";

export const GreetingsWidget = () => {
  const name = process.env.NEXT_PUBLIC_USER_NAME;
  const [greeting, setGreeting] = useState("");

  // Update greeting every hour, and retrieve correct one based on the time
  useEffect(() => {
    setGreeting(getGreeting());

    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="pl-24 copy-title-2 h-[82px] flex items-center">
      Hi {name}, {greeting}!
    </h1>
  );
};
