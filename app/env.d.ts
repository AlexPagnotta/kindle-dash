declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv {
      // Public
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_USER_NAME: string;
      NEXT_PUBLIC_TIMEZONE: string;

      // Private
      SESSION_SECRET: string;
      APP_PIN: string;
      WEATHER_LOCATION: string;
      NOTION_API_KEY: string;
      NOTION_TASKS_DATABASE_ID: string;
      NOTION_QUICK_COLLECT_DATABASE_ID: string;
      SCREENSAVER_QUERY: string;
      UNSPLASH_API_KEY: string;
    }
  }
}

export {};
