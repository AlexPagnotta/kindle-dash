import { Header } from "~/features/nav/header/header";
import { AppLayoutClient } from "./layout.client";

type AppLayoutProps = {
  children: React.ReactNode;
};

// Avoid caching the page, data is fetched on every request
export const dynamic = "force-dynamic";

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppLayoutClient>
      <div className="size-full border relative flex flex-col">
        <Header />
        {children}
      </div>
    </AppLayoutClient>
  );
}
