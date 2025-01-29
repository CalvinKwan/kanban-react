import React, { useState } from "react"
import { DndContext, rectIntersection, DragOverlay } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { Column, Task } from "./types"
import DroppableColumn from "./DroppableColumn"

const initialColumns: Column[] = [
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

const MainBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [dragging, setDragging] = useState(false)
  const [overId, setOverId] = useState<string | null>(null)
  // const [activeTaskId, setActiveTaskId] = useState<string | null>(null)

  const handleDragStart = (event: any) => {
    const { active } = event
    const activeId = String(active.id)

    const sourceColumn = columns.find((col) => col.tasks.some((task) => task.id === activeId))
    const task = sourceColumn?.tasks.find((task) => task.id === activeId)

    if (task) {
      setActiveTask(task)
      setDragging(true)
      // setActiveTaskId(activeId)
    }
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    setActiveTask(null)
    setDragging(false)
    setOverId(null)
    // setActiveTaskId(null)

    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    const sourceColumn = columns.find((col) => col.tasks.some((task) => task.id === activeId))
    const destinationColumn = columns.find((col) => col.id === overId || col.tasks.some((task) => task.id === overId))

    if (!sourceColumn || !destinationColumn) return

    if (sourceColumn.id === destinationColumn.id) {
      const columnIndex = columns.findIndex((col) => col.id === sourceColumn.id)
      const oldIndex = sourceColumn.tasks.findIndex((t) => t.id === activeId)
      const newIndex = sourceColumn.tasks.findIndex((t) => t.id === overId)

      if (newIndex === -1) return

      const newTasks = arrayMove(sourceColumn.tasks, oldIndex, newIndex)
      const updatedColumns = [...columns]
      updatedColumns[columnIndex] = {
        ...sourceColumn,
        tasks: newTasks,
      }
      setColumns(updatedColumns)
      return
    }

    const sourceColumnIndex = columns.findIndex((col) => col.id === sourceColumn.id)
    const destinationColumnIndex = columns.findIndex((col) => col.id === destinationColumn.id)

    const sourceTasks = [...sourceColumn.tasks]
    const destinationTasks = [...destinationColumn.tasks]

    const movedTaskIndex = sourceTasks.findIndex((task) => task.id === activeId)
    const [movedTask] = sourceTasks.splice(movedTaskIndex, 1)

    let overIndex = destinationTasks.findIndex((task) => task.id === overId)
    if (overIndex === -1) {
      overIndex = destinationTasks.length
    }

    destinationTasks.splice(overIndex, 0, movedTask)

    const updatedColumns = [...columns]
    updatedColumns[sourceColumnIndex] = { ...sourceColumn, tasks: sourceTasks }
    updatedColumns[destinationColumnIndex] = { ...destinationColumn, tasks: destinationTasks }

    setColumns(updatedColumns)
  }

  const handleDragOver = (event: any) => {
    const { over } = event
    setOverId(over ? String(over.id) : null)
  }

  const handleAddTask = (columnId: string, taskText: string) => {
    if (!taskText.trim()) return
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: [...col.tasks, { id: `${columnId}-${Date.now()}`, text: taskText }],
            }
          : col
      )
    )
  }

  return (
    <DndContext collisionDetection={rectIntersection} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center lg:items-start bg-gray-200 p-6 pt-[20vh] min-h-screen w-full">
        {columns.map((column) => (
          <DroppableColumn key={column.id} column={column} onAddTask={handleAddTask} overId={overId} activeTaskId={null} />
        ))}
      </div>

      <DragOverlay>
        {dragging && activeTask ? (
          <div className="p-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-lg mb-2 hover:bg-gray-400 cursor-grabbing transition-transform transform scale-105 duration-300 opacity-45">
            {activeTask.text}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default MainBoard
