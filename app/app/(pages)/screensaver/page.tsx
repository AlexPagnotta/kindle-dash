import Link from "next/link";
import Image from "next/image";
import { getRandomUnsplashImage } from "./data";

export default async function ScreensaverPage() {
  const imageData = await getRandomUnsplashImage(process.env.SCREENSAVER_QUERY);

  const imageBaseUrl = imageData.imageUrl;

  return (
    <main className="relative size-full overflow-hidden">
      <Link href="/" className="size-full">
        <img src={`${imageBaseUrl}?q=80&w=800&auto=format&fit=crop`} alt="" className="object-cover size-full" />
      </Link>
    </main>
  );
}
