function TaskItem({ task }) {
  return (
    <li className="task-item">
      <span>○</span>
      <span>{task}</span>
    </li>
  );
}

export default TaskItem;