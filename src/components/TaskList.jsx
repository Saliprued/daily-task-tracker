import TaskCard from "./TaskCard.jsx";

export default function TaskList({ tasks, onToggleTask, onDeleteTask, onUpdateTime }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add your first task above.</p>;
  }
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const sortedTasks = [...tasks].sort(
  (a, b) =>
    priorityOrder[a.priority ?? "Medium"] -
    priorityOrder[b.priority ?? "Medium"],
  );

  return (
    <ul className="task-list">
      {sortedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onUpdateTime={onUpdateTime}
        />
      ))}
    </ul>
  );
}
