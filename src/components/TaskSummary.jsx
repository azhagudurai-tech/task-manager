import { useContext } from "react";
import TaskContext from "../context/TaskProvider";


function TaskSummary({ handleClearCompleted, handleDeleteAllTasks }) {
    const {tasks} = useContext(TaskContext);
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const activeTasks = tasks.filter(task => !task.completed).length;
    return (
        <div>
            <p>Total Task : {totalTasks} || Completed Task : {completedTasks}</p>
            <p>Active Task : {activeTasks} || Remaining Task : {activeTasks}</p>
            <button onClick={handleClearCompleted}>Clear Completed</button>
            <button onClick={handleDeleteAllTasks}>Delete All Tasks</button>
        </div>
    )
}

export default TaskSummary;