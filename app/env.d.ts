declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_USER_NAME: string;
    }
  }
}

export {};
