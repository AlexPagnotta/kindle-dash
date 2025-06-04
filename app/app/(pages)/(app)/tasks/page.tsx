import { TasksWidget } from "~/features/tasks/widget";

export default function TasksPage() {
  return (
    <main className="w-full flex-1 grid grid-cols-2 gap-16 p-16 min-h-0">
      <TasksWidget type="quick-collect" />
      <TasksWidget type="tasks" />
    </main>
  );
}
