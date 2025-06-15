"use client";

import { useEffect, useState } from "react";

import { getGreeting } from "./utils";

type GreetingsWidgetClientProps = {
  name: string;
  initialGreeting: string;
};

export const GreetingsWidgetClient = ({ name, initialGreeting }: GreetingsWidgetClientProps) => {
  const [greeting, setGreeting] = useState(initialGreeting);

  // Update greeting every hour, and retrieve correct one based on the time
  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="pl-24 copy-title-2 h-[82px] flex items-center">
      Hi {name}, {greeting}!
    </h1>
  );
};
