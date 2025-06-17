import Link from "next/link";

import { getRandomUnsplashImage } from "./data";
import { DitheredImage } from "./dithered-image/dithered-image";

export const revalidate = 4 * 60 * 60; // 4 hours in seconds

export default async function ScreensaverPage() {
  const imageData = await getRandomUnsplashImage(process.env.SCREENSAVER_QUERY);

  const imageBaseUrl = imageData.imageUrl;

  return (
    <main className="relative size-full overflow-hidden">
      <Link href="/" className="size-full">
        <DitheredImage
          src={`${imageBaseUrl}?q=80&w=800&auto=format&fit=crop`}
          alt="Screensaver image"
          className="object-cover size-full"
        />
      </Link>
    </main>
  );
}
