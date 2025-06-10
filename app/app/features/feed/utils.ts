/**
 * Formats the publication date of an RSS feed item to show time in the configured timezone
 * @param pubDate - The publication date string from RSS feed (assumed to be in UTC)
 * @returns The formatted time (HH:MM) in the configured timezone
 */
export const formatFeedTime = (pubDate: string): string => {
  try {
    const date = new Date(pubDate);

    if (isNaN(date.getTime())) return "N/A";

    // Get timezone from environment variable
    const timezone = process.env.NEXT_PUBLIC_TIMEZONE;

    // Format as HH:MM in the specified timezone
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone,
    });
  } catch (error) {
    console.error("Error formatting feed time:", error);
    return "N/A";
  }
};
