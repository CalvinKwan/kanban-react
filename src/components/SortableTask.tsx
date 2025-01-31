import React, { useMemo, useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Task } from "./types"
import editicon from "/images/edit-text.webp"

const SortableTask: React.FC<{
  task: Task
  onModifyTask: (taskId: string, newText: string) => void
}> = ({ task, onModifyTask }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id: task.id })
  const [isEditing, setIsEditing] = useState(false)
  const [newText, setNewText] = useState(task.text)

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition: "transform 200ms ease, background-color 300ms ease",
    }),
    [transform]
  )

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (newText.trim() && newText !== task.text) {
      onModifyTask(task.id, newText.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur()
    }
  }

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        {...attributes}
        {...(!isEditing && listeners)}
        style={style}
        className={`p-3 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition duration-300 ${isEditing ? "" : "cursor-pointer"}`}
      >
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full p-2 z-50"
            autoFocus
          />
        ) : (
          <span>{task.text}</span>
        )}
      </div>
      {!isEditing && (
        <img src={editicon} alt="Edit" onClick={handleEditClick} className="absolute top-4 right-2 w-4 h-4 cursor-pointer z-50 opacity-70 me-1" />
      )}
    </div>
  )
}

export default SortableTask
