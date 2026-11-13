import { useId, useState } from "react";
import { isValidTask } from "../validation.mjs";

export default function TaskForm({ onAddTask, onClose }) {
  const formId = useId();
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("");
  const [topic, setTopic] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");
 

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isValidTask(title, topic, minutes)) {
      setError("Enter an activity, topic, and time greater than zero.");
      return;
    }

    setError("");

    await onAddTask({
      title: title.trim(),
      minutes: Number(minutes),
      topic: topic.trim(),
      priority,
    });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor={`${formId}-title`}>New task</label>
      <input
        id={`${formId}-title`}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Example: Practice React"
      />

      <label htmlFor={`${formId}-minutes`}>Time in minutes</label>
      <input
        id={`${formId}-minutes`}
        type="number"
        min="1"
        value={minutes}
        onChange={(event) => setMinutes(event.target.value)}
        placeholder="30"
      />

      <label htmlFor={`${formId}-topic`}>Topic</label>
      <input
        id={`${formId}-topic`}
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
        placeholder="Example: Study"
      />

      <label htmlFor={`${formId}-priority`}>Priority</label>
      <select id={`${formId}-priority`} value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <div className="form-actions">
      <button type="submit" className="save-button">
        Save
      </button>
      <button type="button" onClick={onClose}>
       Close
      </button>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}
