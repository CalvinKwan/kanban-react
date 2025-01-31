Kanban Board - React + TypeScript + Vite

This is a Kanban board application built with React, TypeScript, Vite, and TailwindCSS. It allows users to manage tasks by dragging and dropping them between different columns.

Features

📝 Display tasks in three columns: To-Do, In Progress, and Done.

➕ Add new tasks to the To-Do column.

🔄 Drag and drop tasks between columns.

⚡ Optimized with React hooks and memoization for performance.

Installation & Setup

Prerequisites

Ensure you have the following installed:

Node.js (>=16.x recommended)

npm or yarn

1️⃣ Clone the Repository
`git clone https://github.com/CalvinKwan/kanban-react.git`
`cd kanban-react`

Using npm or yarn:

2️⃣ Install Dependencies
`npm install` or `yarn install`

3️⃣ Run the Application
`npm run dev` or `yarn dev`

The application will start at: http://localhost:5173

4️⃣ Build the Application for Production
`npm run build` or `yarn build`

To preview the production build:
`npm run preview`

Project Structure:
kanban-react/
├── src/
│ ├── components/
│ │ ├── MainBoard.tsx
│ │ ├── DroppableColumn.tsx
│ │ ├── SortableTask.tsx
│ ├── types/
│ │ ├── index.ts
│ ├── App.tsx
│ ├── main.tsx
│ ├── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
