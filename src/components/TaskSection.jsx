import { useContext } from "react";
import TaskList from "./TaskList";
import TaskSummary from "./TaskSummary";
import TaskContext from "../context/TaskProvider";

function TaskSection({
    setFilter,
    displayedTask,
    handleEditTask,
    editingTaskId,
    editInput,
    setEditInput,
    handleSaveEdit,
    handleClearCompleted,
    handleDeleteAllTasks,
}) {

    const { filter } = useContext(TaskContext);

    return (
        <section>

            <div className="filters">
                <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")} > All </button>
                <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}> Active </button>
                <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")} > Completed </button>
            </div>

            <TaskList
                tasks={displayedTask}
                editTask={handleEditTask}
                editTaskId={editingTaskId}
                editInput={editInput}
                setEditInput={setEditInput}
                handleSaveEdit={handleSaveEdit}
            />

            <TaskSummary
                handleClearCompleted={handleClearCompleted}
                handleDeleteAllTasks={handleDeleteAllTasks}
            />
        </section>
    );
}

export default TaskSection;