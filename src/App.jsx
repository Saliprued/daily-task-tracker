import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { request } from "./api.js";

export default function App() {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFormDayId, setOpenFormDayId] = useState(null);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
  request("/days")
    .then(setDays)
    .catch(() => setLoadError("Could not load the planner. Please try again."))
    .finally(() => setLoading(false));
}, []);

  async function saveChange(path, method, data) {
    setError("");

    try {
      setDays(await request(path, method, data));
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  }

  async function addDay() {
    await saveChange("/days", "POST");
  }

  async function toggleTask(dayId, taskId) {
    const day = days.find((day) => day.id === dayId);
    const task = day.tasks.find((task) => task.id === taskId);

    await saveChange(
      `/days/${dayId}/tasks/${taskId}`,
      "PATCH",
      { completed: !task.completed },
    );
  }

  async function updateTaskTime(dayId, taskId, minutes) {
   await saveChange(
      `/days/${dayId}/tasks/${taskId}`,
      "PATCH",
      { minutes },
  );
  }

  async function deleteTask(dayId, taskId) {
   await saveChange(
      `/days/${dayId}/tasks/${taskId}`,
      "DELETE",
    );
  }

  async function deleteDay(dayId) {
    const saved = await saveChange(`/days/${dayId}`, "DELETE");

    if (saved && openFormDayId === dayId) {
      setOpenFormDayId(null);
    }
  }

  async function retryLoad() {
    setLoading(true);
    setLoadError("");

    try {
      setDays(await request("/days"));
    } catch {
      setLoadError("Could not load the planner. Please try again.");
    } finally {
      setLoading(false);
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

        {loading && <p>Loading...</p>}

        {error && <p className="form-error" role="alert">{error}</p>}

        {loadError && (
          <div role="alert">
            <p>{loadError}</p>
            <button type="button" onClick={retryLoad}>
             Retry
            </button>
          </div>
        )}

        {!loading && !loadError && days.length === 0 && (
          <p className="empty-state">No tasks yet. Add the first one.</p>
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
                   <Trash2 size={18} />
               </button>
              </div>

              <button type="button" onClick={() => setOpenFormDayId(day.id)}>
               + Add task
              </button>

              {openFormDayId === day.id && (
                <div className="task-form-container">
                 <h3>Add task to {day.title}</h3>

                 <TaskForm
                   onClose={() => setOpenFormDayId(null)}
                   onAddTask={async (taskDetails) => {
                     const saved = await saveChange(
                       `/days/${day.id}/tasks`,
                       "POST",
                       taskDetails,
                   );

                    if (saved) setOpenFormDayId(null);
                    return saved;
                   }}
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