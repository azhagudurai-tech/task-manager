import TaskItem from "./TaskItem";

function TaskList() {
  return (
    <section className="tak-list">
      <h2>Tasks</h2>
      <ul>
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </ul>
    </section>
  );
}

export default TaskList;