const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

/**
 * Get a random image from Unsplash
 * @param query - The query to search for
 * @returns The image data
 */
export const getRandomUnsplashImage = async (query: string) => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&orientation=landscape`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch image from Unsplash");
    }

    const { id, urls } = await response.json();

    return {
      id,
      imageUrl: urls.raw,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
