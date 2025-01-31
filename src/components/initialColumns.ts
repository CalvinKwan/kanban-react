import { Column } from "./types"

export const initialColumns: Column[] = [
  {
    id: "to-do",
    title: "To-Do",
    tasks: [
      { id: "1", text: "Task 1" },
      { id: "2", text: "Task 2" },
    ],
  },
  { id: "in-progress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
]
