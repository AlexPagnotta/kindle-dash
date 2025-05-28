/**
 * Returns the greeting based on the current time
 * @returns The greeting based on the current time
 */
export const getGreeting = (): string => {
  const now = new Date();
  const hour = now.getHours();

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
