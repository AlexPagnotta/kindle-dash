const HACKER_NEWS_API_BASE_URL = "https://hacker-news.firebaseio.com/v0";

export type HackerNewsStory = {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants?: number;
  type: string;
};

const fetchStoryDetails = async (id: number): Promise<HackerNewsStory | null> => {
  try {
    const response = await fetch(`${HACKER_NEWS_API_BASE_URL}/item/${id}.json`);
    if (!response.ok) throw new Error(`Failed to fetch hacker news story details for id: ${id}`);

    const data: HackerNewsStory = await response.json();

    if (!data) throw new Error(`Failed to fetch hacker news story details for id: ${id}`);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Fetches the top stories from Hacker News API
 */
export const fetchHackerNewsStories = async (limit: number = 10) => {
  try {
    // Fetch top story IDs
    const response = await fetch(`${HACKER_NEWS_API_BASE_URL}/topstories.json`);

    if (!response.ok) throw new Error("Failed to fetch hacker news top stories ids");

    const storyIds: number[] = await response.json();

    if (!storyIds || storyIds.length === 0) throw new Error("Failed to fetch hacker news top stories ids");

    // Fetch details for the stories, get twice as many as needed to filter out not needed results
    const storyPromises = storyIds.slice(0, limit * 2).map((id) => fetchStoryDetails(id));
    const stories = await Promise.all(storyPromises);

    // Filter out null and not valid results
    const validStories = stories
      .filter((story): story is HackerNewsStory => story !== null && story.type === "story" && !!story.title)
      .slice(0, limit);

    return validStories;
  } catch (error) {
    console.error("Error fetching Hacker News stories:", error);
    throw error;
  }
};
