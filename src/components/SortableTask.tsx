import React, { useMemo } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Task } from "./types"

const SortableTask: React.FC<{ task: Task }> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id: task.id })

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition: "transform 200ms ease, background-color 300ms ease",
    }),
    [transform]
  )

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-3 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition duration-300 cursor-pointer"
    >
      {task.text}
    </div>
  )
}

export default SortableTask
