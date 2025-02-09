import React, { useState, useCallback, useMemo } from "react"
import { DndContext, rectIntersection, DragOverlay, TouchSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { Column, Task } from "./types"
import DroppableColumn from "./DroppableColumn"
import { initialColumns } from "./initialColumns"

const MainBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [dragging, setDragging] = useState(false)
  const [overId, setOverId] = useState<string | null>(null)

  const handleDragStart = useCallback(
    (event: any) => {
      const { active } = event
      const activeId = String(active.id)

      const sourceColumn = columns.find((col) => col.tasks.some((task) => task.id === activeId))
      const task = sourceColumn?.tasks.find((task) => task.id === activeId)

      if (task) {
        setActiveTask(task)
        setDragging(true)
      }
    },
    [columns]
  )

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event
    setActiveTask(null)
    setDragging(false)
    setOverId(null)

    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find((col) => col.tasks.some((task) => task.id === activeId))
      const destinationColumn = prevColumns.find((col) => col.id === overId || col.tasks.some((task) => task.id === overId))

      if (!sourceColumn || !destinationColumn) return prevColumns

      if (sourceColumn.id === destinationColumn.id) {
        const columnIndex = prevColumns.findIndex((col) => col.id === sourceColumn.id)
        const oldIndex = sourceColumn.tasks.findIndex((t) => t.id === activeId)
        const newIndex = sourceColumn.tasks.findIndex((t) => t.id === overId)

        if (newIndex === -1) return prevColumns

        const newTasks = arrayMove(sourceColumn.tasks, oldIndex, newIndex)
        const updatedColumns = [...prevColumns]
        updatedColumns[columnIndex] = {
          ...sourceColumn,
          tasks: newTasks,
        }
        return updatedColumns
      }

      const sourceColumnIndex = prevColumns.findIndex((col) => col.id === sourceColumn.id)
      const destinationColumnIndex = prevColumns.findIndex((col) => col.id === destinationColumn.id)

      const sourceTasks = [...sourceColumn.tasks]
      const destinationTasks = [...destinationColumn.tasks]

      const movedTaskIndex = sourceTasks.findIndex((task) => task.id === activeId)
      const [movedTask] = sourceTasks.splice(movedTaskIndex, 1)

      let overIndex = destinationTasks.findIndex((task) => task.id === overId)
      if (overIndex === -1) {
        overIndex = destinationTasks.length
      }

      destinationTasks.splice(overIndex, 0, movedTask)

      const updatedColumns = [...prevColumns]
      updatedColumns[sourceColumnIndex] = { ...sourceColumn, tasks: sourceTasks }
      updatedColumns[destinationColumnIndex] = { ...destinationColumn, tasks: destinationTasks }

      return updatedColumns
    })
  }, [])

  const handleDragOver = useCallback((event: any) => {
    const { over } = event
    setOverId(over ? String(over.id) : null)
  }, [])

  const handleAddTask = useCallback((columnId: string, taskText: string) => {
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
  }, [])

  const handleModifyTask = useCallback((taskId: string, newText: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) => (task.id === taskId ? { ...task, text: newText } : task)),
      }))
    )
  }, [])

  const handleDeleteTask = useCallback((taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      }))
    )
  }, [])

  const memoizedColumns = useMemo(() => {
    return columns.map((column) => (
      <DroppableColumn
        key={column.id}
        column={column}
        onAddTask={handleAddTask}
        onModifyTask={handleModifyTask}
        onDeleteTask={handleDeleteTask}
        overId={overId}
      />
    ))
  }, [columns, handleAddTask, handleModifyTask, handleDeleteTask, overId])

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  )
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="bg-gray-200 w-full px-5 pt-8 text-start ">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Kanban Board</h1>
        <p className="mb-4">
          This application allows you to manage tasks using a Kanban board. You can drag and drop tasks between columns, add new tasks, edit existing
          tasks, and organize your workflow efficiently.
        </p>
        <p className="mb-4">- To add a new task, type the task description in the input field and press Enter or click outside the input field.</p>
        <p className="mb-4">
          - To edit a task, click the edit icon next to the task, make your changes, and press Enter or click outside the input field to save.
        </p>
        <p className="mb-4">- To move a task, simply drag and drop it to the desired column.</p>
        <p>Enjoy managing your tasks!</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center lg:items-start bg-gray-200 p-6  lg:min-h-screen w-full">
        {memoizedColumns}
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
