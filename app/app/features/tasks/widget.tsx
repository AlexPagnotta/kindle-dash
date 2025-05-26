import { ComponentPropsWithoutRef } from "react";
import { cn } from "../style/utils";
import { Tile, TileTitle } from "../ui/tile";
import { Check } from "lucide-react";

type TasksWidgetProps = Omit<ComponentPropsWithoutRef<typeof Tile>, "title"> & {
  preview?: boolean;
};

export const TasksWidget = ({ preview, className, ...rest }: TasksWidgetProps) => {
  //TODO: Fetch data

  return (
    <Tile className={cn("h-full min-h-0", className)} {...rest}>
      <div className="flex flex-col h-full gap-16 px-16 py-24 overflow-y-auto scrollbar-hidden">
        {[...Array(10)].map((_, index) => {
          const isSelected = index >= 4;

          return (
            <div key={index} className="flex gap-20 items-center">
              <div
                className={cn(
                  "size-20 rounded-sm border border-gray-800 flex items-center justify-center",
                  isSelected && "bg-gray-400"
                )}
              >
                {isSelected && <Check className="size-16 shrink-0 text-white" />}
              </div>
              <div className="flex-1 min-w-0 w-full">
                <div className="copy-body-2 line-clamp-2">Task Name</div>
              </div>
            </div>
          );
        })}
      </div>
      {!preview && <TileTitle>Tasks</TileTitle>}
    </Tile>
  );
};
