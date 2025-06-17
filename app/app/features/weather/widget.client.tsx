"use client";

import useSWR from "swr";

import { cn } from "../style/utils";
import { Tile } from "../ui/tile";

import { getCurrentWeatherData } from "./data";
import { getWeatherIcon } from "./utils";
import { type WeatherWidgetProps } from "./widget";

type Props = WeatherWidgetProps & {
  initialData?: Awaited<ReturnType<typeof getCurrentWeatherData>>;
  hasInitialDataError: boolean;
  location: string;
};

export const WeatherWidgetClient = ({ initialData, hasInitialDataError, location, className, ...rest }: Props) => {
  const { data: weatherData, error } = useSWR("weather-widget", () => getCurrentWeatherData(location), {
    fallbackData: initialData,
    refreshInterval: 1 * 60 * 60 * 1000, // Update data every hour
    revalidateOnFocus: false,
    revalidateOnMount: false,
    shouldRetryOnError: false,
  });

  const hasError = hasInitialDataError || !!error;
  const WeatherIcon = weatherData ? getWeatherIcon(weatherData.weatherCode) : null;

  return (
    <Tile className={cn("flex items-center justify-center gap-40", className)} {...rest}>
      {hasError || !weatherData || !WeatherIcon ? (
        <div className="flex items-center justify-center h-full copy-body-1">Failed to load weather data</div>
      ) : (
        <>
          <WeatherIcon className="size-[80px]" />
          <div className="flex flex-col text-center">
            <div className="copy-title-2">Rome</div>
            <div className="copy-title-1-strong">{`${weatherData.temperature}°C`}</div>
          </div>
        </>
      )}
    </Tile>
  );
};
