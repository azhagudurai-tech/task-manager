import TaskItem from "./TaskItem";

function TaskList({ tasks, delTask }) {
  return (
    <section className="task-list">
      <h2>Tasks</h2>

      {
        tasks.length === 0 ? (
          <p>No Task Available</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <TaskItem
                key={index}
                index={index}
                task={task}
                delTask={delTask}
              />
            ))}
          </ul>
        )
      }
    </section>
  );
}

export default TaskList;