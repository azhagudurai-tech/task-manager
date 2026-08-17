import useTaskContext from "../hooks/useTaskContext";
import useTaskUIContext from "../hooks/useTaskUIContext";
import TaskList from "./TaskList";
import TaskSummary from "./TaskSummary";
import SearchBar from "./SearchBar";
import SortBar from "./SortBar";


function TaskSection() {

    const { handleClearCompleted, handleDeleteAllTasks } = useTaskContext();
    const { filter, setFilter, displayedTask } = useTaskUIContext();


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