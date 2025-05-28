/**
 * Formats the time of a story in hours or days ago
 * @param time - The time of the story in seconds
 * @returns The time of the story in hours or days ago
 */
export const formatStoryTime = (time: number) => {
  const now = new Date();
  const storyDate = new Date(time * 1000);
  const diffTime = Math.abs(now.getTime() - storyDate.getTime());
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `${diffDays}d`;
  } else if (diffHours > 0) {
    return `${diffHours}h`;
  } else {
    return "now";
  }
};
