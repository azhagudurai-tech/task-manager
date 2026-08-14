import { useContext } from "react";
import TaskContext from "../context/TaskProvider";

function TaskForm({
  taskInput,
  setTaskInput,
}) {

  const { handleAddTask, priority, setPriority, } = useContext(TaskContext);

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
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button onClick={handleAddTask}>
        Add Task
      </button>
    </section>
  );
}

export default TaskForm;