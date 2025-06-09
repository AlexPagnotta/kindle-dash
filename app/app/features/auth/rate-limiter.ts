/**
 * Global rate limiter for login attempts
 * Tracks failed login attempts in memory and disables login globally after too many attempts
 */

// Maximum number of failed login attempts per day
const MAX_FAILED_ATTEMPTS = 20;

type RateLimitData = {
  failedAttempts: number;
  firstAttemptDate: string; // ISO string for the day
  isDisabled: boolean;
};

// In-memory storage for rate limiting data
const rateLimitData: RateLimitData = {
  failedAttempts: 0,
  firstAttemptDate: new Date().toISOString().split("T")[0]!, // Today's date in YYYY-MM-DD format
  isDisabled: false,
};

/**
 * Checks if the current attempt is on a new day from the last one
 */
const checkIfNewDayAttempt = () => {
  const currentDate = new Date().toISOString().split("T")[0]!;
  return rateLimitData.firstAttemptDate !== currentDate;
};

/**
 * Resets the rate limit data if it's a new day
 */
const resetRateLimitData = () => {
  rateLimitData.failedAttempts = 0;
  rateLimitData.firstAttemptDate = new Date().toISOString().split("T")[0]!;
  rateLimitData.isDisabled = false;
};

/**
 * Checks if login is currently disabled due to rate limiting
 */
export const isLoginDisabled = (): boolean => {
  if (checkIfNewDayAttempt()) {
    resetRateLimitData();
  }

  return rateLimitData.isDisabled;
};

/**
 * Records a failed login attempt and returns whether login should be disabled
 */
export const recordFailedAttempt = () => {
  if (checkIfNewDayAttempt()) {
    resetRateLimitData();
  }

  rateLimitData.failedAttempts += 1;

  // Disable login if we've reached the maximum number of failed attempts
  if (rateLimitData.failedAttempts >= MAX_FAILED_ATTEMPTS) {
    rateLimitData.isDisabled = true;
  }
};
