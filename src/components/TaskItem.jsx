import { useRef, useEffect, memo } from "react";
import PropTypes from "prop-types";
import useTaskContext from "../hooks/useTaskContext";

const TaskItem = memo(function TaskItem({ task }) {

  const editInputRef = useRef(null);
  const { handleDeleteTask, handleToggleTask, editPriority, setEditPriority,
    editingTaskId, editInput, setEditInput, handleEditTask, handleSaveEdit,
  } = useTaskContext();

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

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.oneOf(["low", "medium", "high"]).isRequired,
    createdAt: PropTypes.number,
  }).isRequired,
};

export default TaskItem;