import { ComponentPropsWithoutRef } from "react";
import { cn } from "../style/utils";
import { Tile } from "../ui/tile";
import { getWeatherIcon } from "./utils";
import { getCurrentWeatherData, WeatherResponse } from "./data";

// Revalidate this component every 5 minutes (300 seconds)
export const revalidate = 300;

type WeatherWidgetProps = ComponentPropsWithoutRef<typeof Tile>;

export const WeatherWidget = async ({ className, ...rest }: WeatherWidgetProps) => {
  const location = process.env.WEATHER_LOCATION;
  let weatherData: Awaited<ReturnType<typeof getCurrentWeatherData>> | null = null;
  let hasError = false;

  try {
    weatherData = await getCurrentWeatherData(location);
  } catch (error) {
    hasError = true;
  }

  const WeatherIcon = weatherData ? getWeatherIcon(weatherData.weatherCode) : null;

  return (
    <Tile className={cn("flex items-center justify-center", className)} {...rest}>
      {hasError || !weatherData || !WeatherIcon ? (
        <div className="flex items-center justify-center h-full copy-body-1 ">Failed to load weather data</div>
      ) : (
        <>
          <WeatherIcon className="size-[80px]" />
          <div className="flex flex-col text-center">
            <div className="copy-title-2">{location}</div>
            <div className="copy-title-1-strong">
              {weatherData.temperature != null ? `${weatherData.temperature}°C` : "N/A"}
            </div>
          </div>
        </>
      )}
    </Tile>
  );
};
