import { useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

const starterDays = [
  {
    id: crypto.randomUUID(),
    title: "Day 1",
    tasks: [
      {
        id: crypto.randomUUID(),
        title: "Read the Module 2 lesson",
        description: "Review components and props",
        minutes: 30,
        topic: "Study",
        completed: false,
      },
    ],
  },
];

export default function App() {
  const [days, setDays] = useState(starterDays);
  const [openFormDayId, setOpenFormDayId] = useState(null);

  function addDay() {
  setDays((currentDays) => {
    const nextNumber = [1, 2, 3, 4, 5, 6, 7].find(
      (number) =>
        !currentDays.some((day) => day.title === `Day ${number}`),
    );

    if (!nextNumber) return currentDays;

    return [
      ...currentDays,
      { id: crypto.randomUUID(), title: `Day ${nextNumber}`, tasks: [],},
    ];
  });
}

  function addTask(dayId, taskDetails) {
    setDays((currentDays) =>
      currentDays.map((day) =>
        day.id === dayId ? {
              ...day,
              tasks: [
                ...day.tasks,
                { id: crypto.randomUUID(), ...taskDetails,  completed: false, },
              ],
            }: day,
      ),
    );
  }

  function toggleTask(dayId, taskId) {
    setDays((currentDays) =>
      currentDays.map((day) =>
        day.id === dayId ? {
              ...day,
              tasks: day.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }: task,
              ),
            }: day,
      ),
    );
  }

  function updateTaskTime(dayId, taskId, minutes) {
  setDays((currentDays) =>
    currentDays.map((day) =>
      day.id === dayId ? {
            ...day,
            tasks: day.tasks.map((task) =>
              task.id === taskId ? { ...task, minutes } : task,
            ),
          }: day,
    ),
  );
}

  function deleteTask(dayId, taskId) {
    setDays((currentDays) =>
      currentDays.map((day) =>
        day.id === dayId ? {
              ...day,
              tasks: day.tasks.filter((task) => task.id !== taskId),
            } : day,
      ),
    );
  }

  function deleteDay(dayId) {
    setDays((currentDays) =>
      currentDays.filter((day) => day.id !== dayId),
    );

    if (openFormDayId === dayId) {
    setOpenFormDayId(null);
    }
  }

  return (
    <main className="app-shell">
      <section className="app-card" aria-labelledby="page-title">
        <header className="app-header">
          <p className="eyebrow">INEW-2434 | Module 2</p>
          <h1 id="page-title">Daily Task Tracker</h1>
          <p>Plan tasks and track progress for each day.</p>
        </header>

        <button type="button" onClick={addDay} disabled={days.length >= 7}>
          + Add day
        </button>

        {days.length === 0 && (
         <p className="empty-state">
           No tasks yet. Add a day, then add your first task.
         </p>
        )}

        {days.map((day) => {
          const completedCount = day.tasks.filter(
            (task) => task.completed,
          ).length;
          const activeCount = day.tasks.length - completedCount;
          const progress = day.tasks.length
            ? Math.round((completedCount / day.tasks.length) * 100)
            : 0;

          return (
            <section className="day-section" key={day.id}>

              <div className="task-card day-header">
               <h2>{day.title}</h2>
               <button className="delete-button" type="button" 
                  onClick={() => deleteDay(day.id)}
                  aria-label={`Delete ${day.title}`}>
                  Delete
               </button>
              </div>

              <button type="button" onClick={() => setOpenFormDayId(day.id)}>
               + Add task
              </button>

              {openFormDayId === day.id && (
                <div className="task-form-container">
                 <h3>Add task to {day.title}</h3>

                 <TaskForm
                   onAddTask={(taskDetails) => {
                    addTask(day.id, taskDetails);
                    setOpenFormDayId(null);
                  }} 
                 onClose={() => setOpenFormDayId(null)}
                 />
                </div>
              )}

              <section className="summary" aria-label={`${day.title} summary`}>
                <span>{activeCount} active</span>
                <span>{completedCount} completed</span>
                <span>{day.tasks.length} total</span>
              </section>

              <label>
                Progress: {progress}%
                <progress value={progress} max="100" />
              </label>

              <TaskList
                tasks={day.tasks}
                onToggleTask={(taskId) => toggleTask(day.id, taskId)}
                onDeleteTask={(taskId) => deleteTask(day.id, taskId)}
                onUpdateTime={(taskId, minutes) => updateTaskTime(day.id, taskId, minutes)}
              />

            </section>
          );
        })}
      </section>
    </main>
  );
}