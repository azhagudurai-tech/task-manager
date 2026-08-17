import useTaskContext from "../hooks/useTaskContext";
import useTaskUIContext from "../hooks/useTaskUIContext";


function TaskForm({
  taskInput,
  setTaskInput,
}) {

  const { handleAddTask } = useTaskContext();
  const { priority, setPriority, } = useTaskUIContext();

  function handleSubmit(event) {
    event.preventDefault();
    handleAddTask();
  }
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}

      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;