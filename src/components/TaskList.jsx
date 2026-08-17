import TaskItem from "./TaskItem";

function TaskList({ tasks }) {

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
                key={task.id}
                index={index}
                task={task}
              />
            ))}
          </ul>
        )
      }
    </section>
  );
}

export default TaskList;