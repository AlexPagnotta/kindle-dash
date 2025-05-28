import { EventsWidget } from "~/features/events/widget";
import { TasksWidget } from "~/features/tasks/widget";
import { PageRevalidator } from "~/features/utils/page-revalidator";

export default function TasksPage() {
  return (
    <PageRevalidator>
      <main className="w-full flex-1 grid grid-cols-2 gap-16 p-16 min-h-0">
        <EventsWidget />
        <TasksWidget />
      </main>
    </PageRevalidator>
  );
}
