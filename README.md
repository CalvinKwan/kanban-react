Kanban Board - React + TypeScript + Vite

This is a Kanban board application built with React, TypeScript, Vite, and TailwindCSS. It allows users to manage tasks by dragging and dropping them between different columns.

Features

📝 Display tasks in three columns: To-Do, In Progress, and Done.

➕ Add new tasks to the To-Do column.

➖ Remove tasks from any column.

🔄 Drag and drop tasks between columns.

⚡ Optimized with React hooks and memoization for performance.

Installation & Setup

Prerequisites

Ensure you have the following installed:

Node.js (>=16.x recommended)

npm or yarn

1️⃣ Clone the Repository
`git clone --branch main https://github.com/CalvinKwan/kanban-react.git`
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
│ ├── assets/
│ │ ├── react.svg
│ ├── components/
│ │ ├── DroppableColumn.tsx
│ │ ├── initialColumns.ts
│ │ ├── MainBoard.tsx
│ │ ├── SortableTask.tsx
│ │ ├── types.ts
│ ├── App.css
│ ├── App.tsx
│ ├── index.css
│ ├── main.tsx
│ ├── vite-env.d.ts
├── .firebaserc
├── .gitignore
├── eslint.config.js
├── firebase.json
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
