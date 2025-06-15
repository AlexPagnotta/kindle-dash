import { Client } from "@notionhq/client";

/**
 * Type of tasks
 * - tasks: Proper tasks already planned
 * - quick-collect: Tasks on quick collect, need to be planned
 */
export type TaskType = "tasks" | "quick-collect";

export type TaskStatus = "archived" | "done" | "in-progress" | "not-started" | "backlog";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_TASKS_DATABASE_ID;

export const getTasks = async (type: TaskType): Promise<Task[]> => {
  try {
    if (!DATABASE_ID) throw new Error("Database ID environment variable is not set");

    // Get today's date as YYYY-MM-DD, for filtering
    const today = new Date().toISOString().split("T")[0]!;

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: "Stato",
          direction: "ascending",
        },
        {
          property: "Priorità",
          direction: "descending",
        },
      ],
      filter:
        type === "tasks"
          ? {
              or: [
                // Date is today
                {
                  property: "Date",
                  date: {
                    equals: today,
                  },
                },
                // Or date is today or in the past if task is not completed
                {
                  and: [
                    {
                      property: "Stato",
                      status: {
                        does_not_equal: "done",
                      },
                    },
                    {
                      property: "Stato",
                      status: {
                        does_not_equal: "archived",
                      },
                    },
                    {
                      property: "Date",
                      date: {
                        on_or_before: today,
                      },
                    },
                  ],
                },
              ],
            }
          : {
              // Quick collect tasks that are not done or archived
              and: [
                {
                  property: "Quick Collect",
                  checkbox: {
                    equals: true,
                  },
                },
                {
                  property: "Stato",
                  status: {
                    does_not_equal: "done",
                  },
                },
                {
                  property: "Stato",
                  status: {
                    does_not_equal: "archived",
                  },
                },
              ],
            },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tasks = response.results.map((item: any) => {
      const name = (item.properties.Nome?.title?.[0]?.plain_text || "Untitled Task") as string;

      const status = (item.properties.Stato?.status.id || "not-started") as TaskStatus;

      return {
        id: item.id,
        title: name,
        status,
      } as Task;
    });

    return tasks;
  } catch (error) {
    console.error("Failed to fetch tasks from Notion:", error);
    throw error;
  }
};
