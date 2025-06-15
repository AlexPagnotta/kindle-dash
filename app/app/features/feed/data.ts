import Parser from "rss-parser";

import { RSS_FEEDS, type RssFeedItem } from "./constants";

export type RSSFeedItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
};

/**
 * Fetches RSS feed data from a single feed
 */
const fetchSingleFeed = async (feedConfig: RssFeedItem): Promise<RSSFeedItem[]> => {
  const parser = new Parser();

  try {
    const feed = await parser.parseURL(feedConfig.url);

    if (feed.items.length === 0) {
      console.warn(`No items found in RSS feed: ${feedConfig.name}`);
      return [];
    }

    const feedItems = feed.items
      .map((item) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate || item.isoDate,
        source: feedConfig.name,
      }))
      .filter((item): item is RSSFeedItem => !!item.title && !!item.link && !!item.pubDate);

    return feedItems;
  } catch (error) {
    console.error(`Error fetching RSS feed ${feedConfig.name}:`, error);
    return [];
  }
};

/**
 * Fetches RSS feed data from all configured feeds
 */
export const fetchRSSFeed = async (limit: number = 10): Promise<RSSFeedItem[]> => {
  try {
    // Fetch all feeds
    const feedPromises = RSS_FEEDS.map((feedConfig) => fetchSingleFeed(feedConfig));
    const feedResults = await Promise.all(feedPromises);

    // Combine all feed items
    const allItems = feedResults.flat();

    if (allItems.length === 0) {
      throw new Error("No items found in any RSS feeds");
    }

    // Sort by publication date (newest first)
    const sortedItems = allItems.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA; // Newest first
    });

    return sortedItems.slice(0, limit);
  } catch (error) {
    console.error("Error fetching RSS feeds:", error);
    throw error;
  }
};
