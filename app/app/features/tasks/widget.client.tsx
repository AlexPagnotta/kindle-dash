"use client";

import { Check } from "lucide-react";
import useSWR from "swr";

import { cn } from "../style/utils";
import { Tile, TileTitle } from "../ui/tile";

import { getTasks } from "./data";
import { type TasksWidgetProps } from "./widget";

type Props = TasksWidgetProps & {
  initialData?: Awaited<ReturnType<typeof getTasks>>;
  hasInitialDataError: boolean;
};

export const TasksWidgetClient = ({ initialData, hasInitialDataError, className, preview, type, ...rest }: Props) => {
  const { data: tasks, error } = useSWR("tasks-widget", () => getTasks(type), {
    fallbackData: initialData,
    refreshInterval: 2 * 60 * 60 * 1000, // Update data every 2 hours
    revalidateOnFocus: false,
    revalidateOnMount: false,
    shouldRetryOnError: false,
  });

  const hasError = hasInitialDataError || !!error;

  return (
    <Tile className={cn("h-full min-h-0", className)} {...rest}>
      <div className="flex flex-col h-full gap-16 px-16 py-24 overflow-y-auto scrollbar-hidden">
        {hasError || !tasks || tasks.length === 0 ? (
          <div className="flex items-center justify-center h-full copy-body-1">Failed to load tasks</div>
        ) : (
          tasks.map((task) => {
            const isCompleted = ["done", "archived"].includes(task.status);

            if (preview && type === "tasks" && isCompleted) return null;

            return (
              <div key={task.id} className="flex gap-20 items-center">
                <div
                  className={cn(
                    "size-20 rounded-sm border border-gray-800 flex items-center justify-center",
                    isCompleted && "bg-gray-400"
                  )}
                >
                  {isCompleted && <Check className="size-16 shrink-0 text-white" />}
                </div>
                <div className="flex-1 min-w-0 w-full flex flex-col gap-4">
                  {/* {task.project && <div className="copy-body-1 text-gray-400">{task.project}</div>} */}
                  <div className={cn("copy-body-2 line-clamp-2", isCompleted && "line-through text-gray-400")}>
                    {task.title}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {!preview && <TileTitle>{type === "tasks" ? "Tasks" : "Quick Collect"}</TileTitle>}
    </Tile>
  );
};
