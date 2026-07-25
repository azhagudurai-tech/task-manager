function TaskItem({ index, task, delTask }) {
  return (
    <li className="task-item">
      <span>○</span>
      <span>{task}</span>
      <button onClick={() => delTask(pos)}>Delete Task</button>
    </li>
  );
}

export default TaskItem;