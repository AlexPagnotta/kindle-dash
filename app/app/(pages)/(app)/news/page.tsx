import { FeedWidget } from "~/features/feed/widget";
import { HackerNewsWidget } from "~/features/hacker-news/widget";
import { PageRevalidator } from "~/features/utils/page-revalidator";

export default function NewsPage() {
  return (
    <PageRevalidator>
      <main className="w-full flex-1 grid grid-cols-2 gap-16 p-16 min-h-0">
        <FeedWidget />
        <HackerNewsWidget />
      </main>
    </PageRevalidator>
  );
}
