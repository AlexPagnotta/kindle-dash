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

    if (type === "tasks") {
      return [
        {
          id: "1",
          title: "Fix the bug in the Matrix",
          status: "in-progress",
        },
        {
          id: "2",
          title: "Convert coffee into code (efficiency: 99.9%)",
          status: "done",
        },
        {
          id: "3",
          title: "Teach AI to understand sarcasm",
          status: "in-progress",
        },
        {
          id: "4",
          title: "Debug the meaning of life (error: 42 not found)",
          status: "not-started",
        },
        {
          id: "5",
          title: "Create a blockchain for cat memes",
          status: "backlog",
        },
        {
          id: "6",
          title: "Implement infinite loop in real life",
          status: "in-progress",
        },
        {
          id: "7",
          title: "Optimize sleep() function to run in O(0) time",
          status: "not-started",
        },
        {
          id: "8",
          title: "Deploy serverless architecture to Mars",
          status: "done",
        },
        {
          id: "9",
          title: "Write documentation for teleportation API",
          status: "in-progress",
        },
        {
          id: "10",
          title: "Create a neural network that generates dad jokes",
          status: "backlog",
        },
      ];
    } else {
      return [
        {
          id: "11",
          title: "Fix the bug in the Matrix",
          status: "not-started",
        },
        {
          id: "12",
          title: "Implement quantum computing in JavaScript",
          status: "in-progress",
        },
        {
          id: "13",
          title: "Create a recursive function that never ends",
          status: "backlog",
        },
        {
          id: "14",
          title: "Debug the universe (segmentation fault in reality)",
          status: "in-progress",
        },
        {
          id: "15",
          title: "Write a compiler for Klingon",
          status: "not-started",
        },
        {
          id: "16",
          title: "Deploy server to the cloud (actual cloud)",
          status: "done",
        },
        {
          id: "17",
          title: "Create a REST API for time travel",
          status: "in-progress",
        },
        {
          id: "18",
          title: "Implement infinite recursion in real life",
          status: "backlog",
        },
        {
          id: "19",
          title: "Write unit tests for the laws of physics",
          status: "not-started",
        },
        {
          id: "20",
          title: "Create a neural network that understands Stack Overflow",
          status: "in-progress",
        },
      ];
    }
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
