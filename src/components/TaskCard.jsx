import { useState } from "react";

export default function TaskCard({ task, onToggle, onDelete, onUpdateTime, }) { 
  const [editingTime, setEditingTime] = useState(false);

   function saveTime(event) {
    const minutes = Number(event.target.value);

    if (Number.isInteger(minutes) && minutes > 0) {
      onUpdateTime(task.id, minutes);
    }

    setEditingTime(false);
  }

  return (
    <li className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <label className="task-label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span>{task.title}</span>
        </label>

        <div className="task-details">
          <span>{task.topic}</span>

          {editingTime ? (
            <span>
              <input 
              className="small-time-input"
                type="number"
                min="1"
                defaultValue={task.minutes}
                onBlur={saveTime}
                onKeyDown={(event) => {
                  if (event.key === "Enter") event.currentTarget.blur();
                }}
                autoFocus
              />{" "}
              min
            </span>
          ) : (
            <span>
              {task.minutes} min{" "}
            <button
              type="button"
              className="edit-time-link"
              onClick={() => setEditingTime(true)}
            >
              Edit
            </button>
            </span>
          )}
          <span className={`priority ${(task.priority ?? "Medium").toLowerCase()}`}>
            Priority: {task.priority ?? "Medium"}
          </span>
        </div>
      </div>

      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
}