import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { Column } from "./types"
import SortableTask from "./SortableTask"

const DroppableColumn: React.FC<{
  column: Column
  onAddTask: (columnId: string, taskText: string) => void
  onModifyTask: (taskId: string, newText: string) => void
  overId: string | null
}> = ({ column, onAddTask, onModifyTask, overId }) => {
  const { setNodeRef } = useDroppable({ id: column.id })
  const [newTask, setNewTask] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleNewTaskSubmit = useCallback(() => {
    if (!newTask.trim()) return
    onAddTask(column.id, newTask.trim())
    setNewTask("")
  }, [newTask, onAddTask, column.id])

  const handleClickOutsideOrEnter = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof MouseEvent) {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
          handleNewTaskSubmit()
        }
      } else if (event instanceof KeyboardEvent && event.key === "Enter") {
        handleNewTaskSubmit()
      }
    },
    [handleNewTaskSubmit]
  )

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideOrEnter)
    document.addEventListener("keydown", handleClickOutsideOrEnter)
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideOrEnter)
      document.removeEventListener("keydown", handleClickOutsideOrEnter)
    }
  }, [handleClickOutsideOrEnter])

  const indicatorClass = useMemo(() => {
    switch (column.title) {
      case "To-Do":
        return "bg-gray-500"
      case "In Progress":
        return "bg-blue-500"
      default:
        return "bg-green-500"
    }
  }, [column.title])

  return (
    <div ref={setNodeRef} className="flex flex-col w-72 bg-white rounded-lg shadow-md p-4 space-y-4 min-h-[10vh] max-h-[50vh] lg:max-h-fit">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`rounded-full w-3 h-3 ${indicatorClass}`} />
          <h2 className="text-lg font-bold">{column.title}</h2>
        </div>
        <span className="text-gray-500 text-sm">{column.tasks.length}</span>
      </div>
      <SortableContext items={column.tasks.map((task) => task.id)}>
        <div className="flex flex-col space-y-3 overflow-y-auto">
          {column.tasks.map((task) => (
            <React.Fragment key={task.id}>
              {overId === task.id && <div className="h-1 bg-blue-500 rounded my-1"></div>}
              <SortableTask task={task} onModifyTask={onModifyTask} />
            </React.Fragment>
          ))}
          {overId === column.id && <div className="h-1 bg-blue-500 rounded my-1"></div>}
          {column.title === "To-Do" && (
            <input
              ref={inputRef}
              type="text"
              placeholder="Add new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="cursor-pointer p-3 bg-gray-200 text-gray-950 rounded-md hover:bg-gray-300 placeholder-gray-600 w-full focus:outline-none focus:bg-grey-200"
            />
          )}
        </div>
      </SortableContext>
    </div>
  )
}

export default DroppableColumn
