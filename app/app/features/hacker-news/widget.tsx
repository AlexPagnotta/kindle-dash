import { ComponentPropsWithoutRef } from "react";
import { cn } from "../style/utils";
import { Tile, TileTitle } from "../ui/tile";
import { fetchHackerNewsStories, HackerNewsStory } from "./data";
import { formatStoryTime } from "./utils";

type HackerNewsWidgetProps = Omit<ComponentPropsWithoutRef<typeof Tile>, "title"> & {
  preview?: boolean;
};

export const HackerNewsWidget = async ({ preview, className, ...rest }: HackerNewsWidgetProps) => {
  let hasError = false;
  let stories: HackerNewsStory[] = [];

  try {
    stories = await fetchHackerNewsStories(10);
  } catch (error) {
    hasError = true;
  }

  return (
    <Tile className={cn("h-full min-h-0", className)} {...rest}>
      <div className="flex flex-col h-full gap-16 px-16 py-24 overflow-y-auto scrollbar-hidden">
        {hasError || !stories || stories.length === 0 ? (
          <div className="flex items-center justify-center h-full copy-body-1 ">Failed to load stories</div>
        ) : (
          stories.map((story) => (
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
