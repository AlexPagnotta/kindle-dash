"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * This page is used to reset the ink screen
 * showing a black bg will reset the ink state and remove ghosting
 */
export default function ScreenResetPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.back();
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return <main className="size-full bg-black flex justify-center items-center text-white">Screen reset...</main>;
}
