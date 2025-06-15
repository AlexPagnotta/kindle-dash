import { type ComponentPropsWithoutRef } from "react";

import { type Tile } from "../ui/tile";

import { fetchHackerNewsStories } from "./data";
import { HackerNewsWidgetClient } from "./widget.client";

export type HackerNewsWidgetProps = Omit<ComponentPropsWithoutRef<typeof Tile>, "title"> & {
  preview?: boolean;
};

export const HackerNewsWidget = async (props: HackerNewsWidgetProps) => {
  let initialData = undefined;
  let hasInitialDataError = false;

  try {
    initialData = await fetchHackerNewsStories(10);
  } catch {
    hasInitialDataError = true;
  }

  return <HackerNewsWidgetClient initialData={initialData} hasInitialDataError={hasInitialDataError} {...props} />;
};
