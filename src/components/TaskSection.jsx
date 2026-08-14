import { useContext } from "react";
import TaskList from "./TaskList";
import TaskSummary from "./TaskSummary";
import TaskContext from "../context/TaskProvider";
import SearchBar from "./SearchBar";
import SortBar from "./SortBar";


function TaskSection() {

    const { filter, setFilter, handleClearCompleted, handleDeleteAllTasks, displayedTask, } = useContext(TaskContext);


    return (
        <section>

            <div className="filters">
                <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")} > All </button>
                <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}> Active </button>
                <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")} > Completed </button>
            </div>

            <SearchBar />

            <SortBar />

            <TaskList
                tasks={displayedTask}
            />

            <TaskSummary
                handleClearCompleted={handleClearCompleted}
                handleDeleteAllTasks={handleDeleteAllTasks}
            />
        </section>
    );
}

export default TaskSection;