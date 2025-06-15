"use client";

import useSWR from "swr";

import { cn } from "../style/utils";
import { Tile, TileTitle } from "../ui/tile";

import { fetchHackerNewsStories } from "./data";
import { formatStoryTime } from "./utils";
import { type HackerNewsWidgetProps } from "./widget";

type Props = HackerNewsWidgetProps & {
  initialData?: Awaited<ReturnType<typeof fetchHackerNewsStories>>;
  hasInitialDataError: boolean;
};

export const HackerNewsWidgetClient = ({ initialData, hasInitialDataError, className, preview, ...rest }: Props) => {
  const { data, error } = useSWR("hacker-news-widget", () => fetchHackerNewsStories(10), {
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
        {hasError || !data || data.length === 0 ? (
          <div className="flex items-center justify-center h-full copy-body-1">Failed to load stories</div>
        ) : (
          data.map((story) => (
            <div key={story.id} className="flex flex-col gap-4">
              <div className="copy-body-1">
                {formatStoryTime(story.time)} - {story.score} points
              </div>
              <h2 className="copy-body-2 line-clamp-2">{story.title}</h2>
            </div>
          ))
        )}
      </div>
      {!preview && <TileTitle>Hacker News</TileTitle>}
    </Tile>
  );
};
