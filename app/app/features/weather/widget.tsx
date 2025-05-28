import { ComponentPropsWithoutRef } from "react";
import { cn } from "../style/utils";
import { Tile } from "../ui/tile";
import { getWeatherIcon } from "./utils";
import { getCurrentWeatherData } from "./data";

// Revalidate this component every 5 minutes (300 seconds)
export const revalidate = 300;

type WeatherWidgetProps = ComponentPropsWithoutRef<typeof Tile>;

export const WeatherWidget = async ({ className, ...rest }: WeatherWidgetProps) => {
  const location = process.env.WEATHER_LOCATION;
  const { temperature, weatherCode } = await getCurrentWeatherData(location);

  const WeatherIcon = getWeatherIcon(weatherCode);

  return (
    <Tile className={cn("flex items-center justify-center", className)} {...rest}>
      <div className="flex items-center gap-40">
        <WeatherIcon className="size-[80px]" />
        <div className="flex flex-col text-center">
          <div className="copy-title-2">{location}</div>
          <div className="copy-title-1-strong">{temperature != null ? `${temperature}°C` : "N/A"}</div>
        </div>
      </div>
    </Tile>
  );
};
