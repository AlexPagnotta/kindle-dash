import { type ComponentPropsWithoutRef } from "react";

import { type Tile } from "../ui/tile";

import { getCurrentWeatherData } from "./data";
import { WeatherWidgetClient } from "./widget.client";

export type WeatherWidgetProps = ComponentPropsWithoutRef<typeof Tile>;

export const WeatherWidget = async (props: WeatherWidgetProps) => {
  const location = process.env.WEATHER_LOCATION;

  let initialData = undefined;
  let hasInitialDataError = false;

  try {
    initialData = await getCurrentWeatherData(location);
  } catch {
    hasInitialDataError = true;
  }

  return (
    <WeatherWidgetClient
      initialData={initialData}
      hasInitialDataError={hasInitialDataError}
      location={location}
      {...props}
    />
  );
};
