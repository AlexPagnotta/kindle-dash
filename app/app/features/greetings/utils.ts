/**
 * Returns the greeting based on the current time
 * @returns The greeting based on the current time
 */
export const getGreeting = (): string => {
  // Get timezone from environment variable
  const timezone = process.env.NEXT_PUBLIC_TIMEZONE;

  // Create a formatter for the specified timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: timezone,
  });

  // Get the hour in the specified timezone
  const hour = parseInt(formatter.format(new Date()), 10);

  if (hour >= 6 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good Afternoon";
  } else if (hour >= 18 && hour < 24) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};
