import { ComponentPropsWithoutRef } from "react";
import { cn } from "../style/utils";
import { Tile, TileTitle } from "../ui/tile";

type FeedWidgetProps = Omit<ComponentPropsWithoutRef<typeof Tile>, "title"> & {
  preview?: boolean;
};

export const FeedWidget = ({ preview, className, ...rest }: FeedWidgetProps) => {
  //TODO: Fetch data

  return (
    <Tile className={cn("h-full min-h-0", className)} {...rest}>
      <div className="flex flex-col h-full gap-16 px-16 py-24 overflow-y-auto scrollbar-hidden">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="copy-body-1">Site - 12:31</div>
            <h2 className="copy-body-2 line-clamp-2 ">Post title example 1, this is a pretty long title</h2>
          </div>
        ))}
      </div>
      {!preview && <TileTitle>Feed</TileTitle>}
    </Tile>
  );
};
