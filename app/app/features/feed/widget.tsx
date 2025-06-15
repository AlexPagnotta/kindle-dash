import { type ComponentPropsWithoutRef } from "react";

import { type Tile } from "../ui/tile";

import { fetchRSSFeed } from "./data";
import { FeedWidgetClient } from "./widget.client";

export type FeedWidgetProps = Omit<ComponentPropsWithoutRef<typeof Tile>, "title"> & {
  preview?: boolean;
};

export const FeedWidget = async (props: FeedWidgetProps) => {
  let initialData = undefined;
  let hasInitialDataError = false;

  try {
    initialData = await fetchRSSFeed(10);
  } catch {
    hasInitialDataError = true;
  }

  return <FeedWidgetClient initialData={initialData} hasInitialDataError={hasInitialDataError} {...props} />;
};
