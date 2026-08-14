import { useContext, useRef, useEffect, memo } from "react";
import TaskContext from "../context/TaskProvider";

const TaskItem = memo(function TaskItem({ index, task }) {

  const editInputRef = useRef(null);
  const { handleDeleteTask, handleToggleTask, editPriority, setEditPriority, editingTaskId, editInput, setEditInput, handleEditTask, handleSaveEdit, displayedTask, } = useContext(TaskContext);

  function getPriorityBadge(priority) {
    if (priority === "high") {
      return "🔴 High";
    }

    if (priority === "medium") {
      return "🟡 Medium";
    }

    return "🟢 Low";
  }

  useEffect(() => {
    if (editingTaskId === task.id) {
      editInputRef.current?.focus();
    }
  }, [editingTaskId, task.id]);

  return (
    <li className="task-item">
      <span onClick={() => handleToggleTask(task.id)}>
        {task.completed ? "✓" : "○"}
      </span>

      {editingTaskId === task.id ? (
        <>
          <input
            ref={editInputRef}
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { handleSaveEdit() }
            }}
          />

          <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button onClick={handleSaveEdit}>
            Save
          </button>
        </>
      ) : (
        <>

          <div className="task-details">
            <span>{task.title}</span>

            <small>
              {getPriorityBadge(task.priority)}
            </small>
          </div>

          <button onClick={() => handleEditTask(task)}>
            Edit
          </button>
        </>
      )}

      <button onClick={() => handleDeleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
});

export default TaskItem;