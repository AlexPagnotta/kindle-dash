import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Cloudy, type LucideIcon } from "lucide-react";

/**
 * Maps OpenMeteo weather codes to appropriate Lucide icons
 * Based on WMO Weather interpretation codes
 * @param weatherCode - The weather code from OpenMeteo API
 * @returns The appropriate Lucide icon component
 */
export const getWeatherIcon = (weatherCode: number): LucideIcon => {
  // Clear sky
  if (weatherCode === 0) return Sun;

  // Mainly clear, partly cloudy, and overcast
  if (weatherCode >= 1 && weatherCode <= 3) return weatherCode === 1 ? Sun : weatherCode === 2 ? Cloudy : Cloud;

  // Fog and depositing rime fog
  if (weatherCode >= 45 && weatherCode <= 48) return Cloud;

  // Drizzle: Light, moderate, and dense intensity
  if (weatherCode >= 51 && weatherCode <= 57) return CloudDrizzle;

  // Rain: Slight, moderate and heavy intensity
  if (weatherCode >= 61 && weatherCode <= 67) return CloudRain;

  // Snow fall: Slight, moderate, and heavy intensity
  if (weatherCode >= 71 && weatherCode <= 77) return CloudSnow;

  // Rain showers: Slight, moderate, and violent
  if (weatherCode >= 80 && weatherCode <= 82) return CloudRain;

  // Snow showers slight and heavy
  if (weatherCode >= 85 && weatherCode <= 86) return CloudSnow;

  // Thunderstorm: Slight or moderate, with slight and heavy hail
  if (weatherCode >= 95 && weatherCode <= 99) return CloudLightning;

  // Default fallback
  return Cloud;
};
