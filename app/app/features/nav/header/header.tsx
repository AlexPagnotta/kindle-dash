import { Bubbles, Palette } from "lucide-react";
import Link from "next/link";

import { HeaderDateTime } from "./date-time";
import { NavLink } from "./nav-link";
import { getCurrentDateTime } from "./utils";

export const Header = () => {
  const currentDateTime = getCurrentDateTime();

  return (
    <header className="w-full h-[60px] px-24 flex items-center justify-between">
      <div className="flex gap-24">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/news">News</NavLink>
        <NavLink href="/tasks">Tasks</NavLink>
      </div>

      <div className="flex gap-24 items-center">
        <Link href="/screen-reset">
          <Bubbles className="size-24" />
        </Link>
        <Link href="/screensaver">
          <Palette className="size-24" />
        </Link>
        <HeaderDateTime initialDateTime={currentDateTime} className="min-w-[130px]" />
      </div>
    </header>
  );
};
