import { useContext } from "react";
import TaskContext from "../context/TaskProvider";


function TaskItem({ index, task, ditTask, editTaskId, editInput, setEditInput, handleSaveEdit }) {

  const { handleDeleteTask, handleToggleTask } = useContext(TaskContext);


  return (
    <li className="task-item">
      <span onClick={() => handleToggleTask(task.id)}>
        {task.completed ? "✓" : "○"}
      </span>

      {editTaskId === task.id ? (
        <>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { handleSaveEdit() }
            }}
          />

          <button onClick={handleSaveEdit}>
            Save
          </button>
        </>
      ) : (
        <>
          <span>{task.title}</span>

          <button onClick={() => editTask(task)}>
            Edit
          </button>
        </>
      )}

      <button onClick={() => handleDeleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;