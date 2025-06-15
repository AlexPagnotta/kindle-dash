import { type ComponentPropsWithoutRef } from "react";

import { type Tile } from "../ui/tile";

import { getTasks, type TaskType } from "./data";
import { TasksWidgetClient } from "./widget.client";

export type TasksWidgetProps = Omit<ComponentPropsWithoutRef<typeof Tile>, "title"> & {
  type: TaskType;
  preview?: boolean;
};

export const TasksWidget = async (props: TasksWidgetProps) => {
  let initialData = undefined;
  let hasInitialDataError = false;

  try {
    initialData = await getTasks(props.type);
  } catch {
    hasInitialDataError = true;
  }

  return <TasksWidgetClient initialData={initialData} hasInitialDataError={hasInitialDataError} {...props} />;
};
