function TaskForm({
  taskInput,
  setTaskInput,
  handleAddTask,
}) {
  return (
    <section className="task-form">
      <input
        type="text"
        placeholder="Enter a task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { handleAddTask() }
        }}
      />

      <button onClick={handleAddTask}>
        Add Task
      </button>
    </section>
  );
}

export default TaskForm;