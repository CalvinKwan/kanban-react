import React, { useState, useRef, useEffect } from "react"
import Task from "./Task"

interface Task {
  id: number
  text: string
}

interface ColumnProps {
  title: string
  tasks: Task[]
  onAddTask: (task: string) => void
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onAddTask }) => {
  const [inputVisible, setInputVisible] = useState(false)
  const [newTask, setNewTask] = useState("")
  const columnRef = useRef<HTMLDivElement>(null)

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask.trim())
      setNewTask("")
      setInputVisible(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (columnRef.current && !columnRef.current.contains(event.target as Node)) {
        setInputVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-col w-72 bg-white rounded-lg shadow-md p-4 space-y-4 min-h-[10vh] max-h-[50vh] lg:max-h-fit" ref={columnRef}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`rounded-full w-3 h-3 ${title === "To-Do" ? "bg-gray-500" : title === "In Progress" ? "bg-blue-500" : "bg-green-500"}`} />
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <span className="text-gray-500 text-sm">{tasks.length}</span>
      </div>

      <div className="flex flex-col space-y-2 overflow-y-auto">
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} text={task.text} />
        ))}
      </div>

      {inputVisible ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task"
            className="flex-grow p-2 border rounded"
          />
          <button onClick={handleAddTask} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add
          </button>
        </div>
      ) : (
        <button className="p-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300" onClick={() => setInputVisible(true)}>
          + New Task
        </button>
      )}
    </div>
  )
}

export default Column
