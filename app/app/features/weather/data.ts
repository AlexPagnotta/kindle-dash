const GEOCODING_API_BASE_URL = "https://geocoding-api.open-meteo.com/v1";
const WEATHER_API_BASE_URL = "https://api.open-meteo.com/v1";

export type GeocodingResponse = {
  results?: {
    latitude: number;
    longitude: number;
  }[];
};

/**
 * Fetches coordinates for a given location using OpenMeteo Geocoding API
 * @param location - The location to fetch coordinates for
 * @returns The coordinates for the given location
 */
export const getCoordinatesFromLocation = async (location: string) => {
  try {
    const response = await fetch(`${GEOCODING_API_BASE_URL}/search?name=${location}&count=1&language=en&format=json`);

    if (!response.ok) throw new Error(`Failed to fetch coordinates for location: ${location}`);

    const data: GeocodingResponse = await response.json();

    if (!data.results || !data.results[0]) throw new Error(`Location "${location}" not found`);

    const { latitude, longitude } = data.results[0];

    return { latitude, longitude };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export type WeatherResponse = {
  current?: {
    temperature_2m: number;
    weather_code: number;
  };
};

/**
 * Fetches current weather data for a given location using OpenMeteo API
 * @param location - The location to fetch weather data for
 * @returns The current weather data for the given location
 */
export const getCurrentWeatherData = async (location: string) => {
  try {
    const { latitude, longitude } = await getCoordinatesFromLocation(location);

    const response = await fetch(
      `${WEATHER_API_BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
    );

    if (!response.ok) throw new Error(`Failed to fetch weather data for location: ${location}`);

    const { current: data }: WeatherResponse = await response.json();

    if (!data) throw new Error(`Failed to fetch weather data for location: ${location}`);

    return {
      temperature: Math.round(data.temperature_2m),
      weatherCode: data.weather_code,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
