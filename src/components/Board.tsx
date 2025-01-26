import React, { useState } from "react"
import Column from "./Column"

interface Task {
  id: number
  text: string
}

interface Columns {
  [key: string]: Task[]
}

const initialData: Columns = {
  "To-Do": [],
  "In Progress": [],
  Done: [],
}

const Board: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(initialData)

  const handleAddTask = (task: string, column: string) => {
    setColumns((prev) => ({
      ...prev,
      [column]: [...prev[column], { id: Date.now(), text: task }],
    }))
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-center items-center lg:items-start bg-gray-200 p-6 pt-[20vh] min-h-screen w-full">
      {Object.keys(columns).map((column) => (
        <Column key={column} title={column} tasks={columns[column]} onAddTask={(task) => handleAddTask(task, column)} />
      ))}
    </div>
  )
}

export default Board
