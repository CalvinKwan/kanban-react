import React from "react"

interface TaskProps {
  id: number
  text: string
}

const Task: React.FC<TaskProps> = ({ id, text }) => {
  return <div className="p-3 bg-gray-100 rounded-lg shadow hover:shadow-lg hover:bg-gray-200 transition">{text}</div>
}

export default Task
