import TaskItem from "./TaskItem";

function TaskList({ tasks }) {
  return (
    <section className="task-list">
      <h2>Tasks</h2>

      <ul>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
          />
        ))}
      </ul>
    </section>
  );
}

export default TaskList;