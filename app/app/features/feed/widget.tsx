import { ComponentPropsWithoutRef } from "react";
import { cn } from "../style/utils";
import { Tile, TileTitle } from "../ui/tile";
import { fetchRSSFeed, RSSFeedItem } from "./data";
import { formatFeedTime } from "./utils";

type FeedWidgetProps = Omit<ComponentPropsWithoutRef<typeof Tile>, "title"> & {
  preview?: boolean;
};

export const FeedWidget = async ({ preview, className, ...rest }: FeedWidgetProps) => {
  let hasError = false;
  let feedItems: RSSFeedItem[] = [];

  try {
    feedItems = await fetchRSSFeed(10);
  } catch (error) {
    hasError = true;
  }

  return (
    <Tile className={cn("h-full min-h-0", className)} {...rest}>
      <div className="flex flex-col h-full gap-16 px-16 py-24 overflow-y-auto scrollbar-hidden">
        {hasError || !feedItems || feedItems.length === 0 ? (
          <div className="flex items-center justify-center h-full copy-body-1">Failed to load feed</div>
        ) : (
          feedItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="copy-body-1">
                {item.source} - {formatFeedTime(item.pubDate)}
              </div>
              <h2 className="copy-body-2 line-clamp-2">{item.title}</h2>
            </div>
          ))
        )}
      </div>
      {!preview && <TileTitle>Feed</TileTitle>}
    </Tile>
  );
};
