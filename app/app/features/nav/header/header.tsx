"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../style/utils";
import { Bubbles, Palette } from "lucide-react";
import { useGetDateTime } from "./use-get-date-time";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const isActive = usePathname() === href;

  return (
    <Link href={href} className={cn("copy-body-2", isActive && "underline underline-offset-8")}>
      {children}
    </Link>
  );
};

export const Header = () => {
  const currentDateTime = useGetDateTime();

  return (
    <header className="w-full h-[60px] px-24 flex items-center justify-between">
      <div className="flex gap-24">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/news">News</NavLink>
        <NavLink href="/tasks">Tasks</NavLink>
        <NavLink href="/calendar">Calendar</NavLink>
      </div>

      <div className="flex gap-24 items-center">
        <Link href="/screen-reset">
          <Bubbles className="size-24" />
        </Link>
        <Link href="/screensaver">
          <Palette className="size-24" />
        </Link>
        <div className="min-w-[130px]">{currentDateTime}</div>
      </div>
    </header>
  );
};
