import Link from "next/link";
import { getRandomUnsplashImage } from "./data";
import { DitheredImage } from "./dithered-image/dithered-image";

// Avoid caching the page, screensaver is fetched on every request
export const dynamic = "force-dynamic";

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
