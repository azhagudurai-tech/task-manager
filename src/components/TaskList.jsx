import { useContext } from "react";
import TaskItem from "./TaskItem";
import TaskContext from "../context/TaskProvider";

function TaskList({ tasks, editTask, editTaskId, editInput, setEditInput, handleSaveEdit }) {

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