"use client";

import useSWR from "swr";

import { cn } from "../style/utils";
import { Tile, TileTitle } from "../ui/tile";

import { fetchRSSFeed } from "./data";
import { formatFeedTime } from "./utils";
import { type FeedWidgetProps } from "./widget";

type Props = FeedWidgetProps & {
  initialData?: Awaited<ReturnType<typeof fetchRSSFeed>>;
  hasInitialDataError: boolean;
};

export const FeedWidgetClient = ({ initialData, hasInitialDataError, preview, className, ...rest }: Props) => {
  const { data: feedData, error } = useSWR("feed-widget", () => fetchRSSFeed(10), {
    fallbackData: initialData,
    refreshInterval: 30 * 60 * 1000, // Update data every 30 minutes
    revalidateOnFocus: false,
    revalidateOnMount: false,
    shouldRetryOnError: false,
  });

  const hasError = hasInitialDataError || !!error;

  return (
    <Tile className={cn("h-full min-h-0", className)} {...rest}>
      <div className="flex flex-col h-full gap-16 px-16 py-24 overflow-y-auto scrollbar-hidden">
        {hasError || !feedData || feedData.length === 0 ? (
          <div className="flex items-center justify-center h-full copy-body-1">Failed to load feed</div>
        ) : (
          feedData.map((item, index) => (
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
