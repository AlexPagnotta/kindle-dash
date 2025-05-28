/**
 * Formats the publication date of an RSS feed item to show time
 * @param pubDate - The publication date string from RSS feed
 * @returns The formatted time (HH:MM)
 */
export const formatFeedTime = (pubDate: string): string => {
  try {
    const date = new Date(pubDate);

    if (isNaN(date.getTime())) return "N/A";

    // Format as HH:MM
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch (error) {
    console.error("Error formatting feed time:", error);
    return "N/A";
  }
};
