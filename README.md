# Daily Task Tracker 

A weekly planner built with React, Vite, and FastAPI. You can plan up to seven days, add tasks with a topic and priority, edit their estimated time, mark them as complete, and delete them. Each day shows its own progress.

## What this project demonstrates

- Add tasks with a title, topic, time, and priority
- Reject empty or whitespace-only task titles
- Sort tasks by High, Medium, and Low priority
- Mark tasks complete or incomplete
- Edit task time
- Delete tasks and days
- Display active and completed counts and daily progress
- Display a message when there are no tasks


## Prerequisites

Install:

- Python 3.10 or later (the backend was developed using Python 3.14).
- Node.js 20.19 or later with npm, as required by Vite version.
- A browser and two separate terminals. VS Code (Optional code editor)
- Postman for manual API testing

### 1. Download the project
1. Open this repository on GitHub.
2. Click **Code → Download ZIP**.
3. Extract the ZIP file.
4. In VS Code, select **File → Open Folder** and open the extracted folder.

### 2. Start the FastAPI backend

In VS Code, select **Terminal → New Terminal**. From the project folder, run:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install fastapi uvicorn
.\.venv\Scripts\python.exe -m uvicorn main:app --reload --port 8001
```

Keep this terminal open. API documentation: http://127.0.0.1:8001/docs

### 3. Start the React frontend

Open a second terminal in VS Code. Make sure it is in the project folder, where `package.json` is located. Then run:

Install dependencies:

```bash
npm.cmd install
```

Start the development server:

```bash
npm.cmd run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.Keep both terminals running while you use the planner.


## GET, POST, PATCH and DELETE

- **GET `/days`** returns all days and their planned tasks.
- **POST `/days`** adds the next available day, up to seven days. it is not needs request body.
- **DELETE`/days/{day_id}`**  Deletes the selected day and all its tasks. 
- **POST `/days/{day_id}/tasks`**  Adds a task to the selected day. Json sends `title`, `minutes`, `topic`, and `priority`. 
- **PATCH `/days/{day_id}/tasks{task_id}`** Updates only a filed to change such as a task's minutes or completion status. 
- **DELETE `/days/{day_id}/tasks{task_id}`** Deletes the selected task from its day.

The backend stores data in memory. Refreshing the browser keeps your changes while FastAPI is running. Restarting FastAPI resets the planner.

## Backend tests

From the `backend` folder, use the same virtual environment you created during setup:

```powershell
.\.venv\Scripts\python.exe -m pip install pytest httpx
.\.venv\Scripts\python.exe -m pytest -v
```
## Frontend tests and production build
Open a separate PowerShell terminal in the frontend folder, where `package.json` is located.

Run the frontend validation tests:

```powershell
node --test src/validation.test.mjs
```

The tests check that the task form accepts valid input and rejects blank titles, blank topics, and invalid minutes.

Build the frontend for production:

```powershell
npm.cmd run build
```