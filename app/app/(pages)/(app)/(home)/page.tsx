import { EventsWidget } from "~/features/events/widget";
import { FeedWidget } from "~/features/feed/widget";
import { WeatherWidget } from "~/features/weather/widget";

export default function Home() {
  return (
    <main className="w-full flex-1 grid grid-cols-2 gap-16 p-16 min-h-0">
      <div className="flex flex-col gap-16">
        <h1 className="pl-24 copy-title-2 py-24">Hi {process.env.NEXT_PUBLIC_USER_NAME}, Good Morning!</h1>
        <WeatherWidget className="flex-1" />
        <EventsWidget className="flex-1" preview />
      </div>
      <FeedWidget preview />
    </main>
  );
}
