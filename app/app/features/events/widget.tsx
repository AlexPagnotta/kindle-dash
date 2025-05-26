import { ComponentPropsWithoutRef } from "react";
import { cn } from "../style/utils";
import { Tile, TileTitle } from "../ui/tile";

type EventsWidgetProps = Omit<ComponentPropsWithoutRef<typeof Tile>, "title"> & {
  preview?: boolean;
};

export const EventsWidget = ({ preview, className, ...rest }: EventsWidgetProps) => {
  //TODO: Fetch data

  const allItems = [...Array(10)];
  const items = preview ? allItems.slice(0, 2) : allItems;

  return (
    <Tile className={cn("h-full min-h-0", className)} {...rest}>
      <div
        className={cn(
          "flex flex-col h-full gap-16 px-16 py-24 ",
          preview ? "justify-center " : "overflow-y-auto scrollbar-hidden"
        )}
      >
        {items.map((_, index) => {
          const isNext = index === 0;

          return (
            <div key={index} className="flex gap-20 w-full">
              <div
                className={cn("w-[10px] h-full rounded-sm shrink-0", isNext ? "bg-gray-400" : "border border-gray-400")}
              />
              <div className="flex flex-col flex-1 min-w-0">
                <h2 className={cn(" truncate", isNext ? "copy-title-1" : "copy-title-2")}>Event Name</h2>
                <div className={isNext ? "copy-body-2" : "copy-body-1"}>
                  <span className="font-semi-bold">In 2h 10m </span>- 10:30 - 15m dur.
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {!preview && <TileTitle>Events</TileTitle>}
    </Tile>
  );
};
