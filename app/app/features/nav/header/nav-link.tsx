"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "../../style/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export const NavLink = ({ href, children }: NavLinkProps) => {
  const isActive = usePathname() === href;

  return (
    <Link href={href} className={cn("copy-body-2", isActive && "underline underline-offset-8")}>
      {children}
    </Link>
  );
};
