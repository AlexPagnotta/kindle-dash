import { EventsWidget } from "~/features/events/widget";
import { FeedWidget } from "~/features/feed/widget";
import { GreetingsWidget } from "~/features/greetings/widget";
import { TasksWidget } from "~/features/tasks/widget";
import { PageRevalidator } from "~/features/utils/page-revalidator";
import { WeatherWidget } from "~/features/weather/widget";

export default function Home() {
  return (
    <PageRevalidator>
      <main className="w-full flex-1 grid grid-cols-2 gap-16 p-16 min-h-0">
        <div className="flex flex-col gap-16 min-h-0">
          <GreetingsWidget />
          <WeatherWidget className="flex-1" />
          <EventsWidget className="flex-1" preview />
        </div>
        <div className="flex flex-col gap-16 min-h-0">
          <TasksWidget className="flex-1" type="tasks" preview />
          <FeedWidget className="flex-1" preview />
        </div>
      </main>
    </PageRevalidator>
  );
}
