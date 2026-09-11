import useTaskContext from "../hooks/useTaskContext";


function TaskSummary({ handleClearCompleted, handleDeleteAllTasks }) {
    const { tasks } = useTaskContext();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const activeTasks = tasks.filter(task => !task.completed).length;
    return (
        <div>
            <p>Total Task : {totalTasks} || Completed Task : {completedTasks}</p>
            <p>Active Task : {activeTasks} || Remaining Task : {activeTasks}</p>

        </div>
    )
}

//  <button onClick={handleClearCompleted}>Clear Completed</button>
//         <button onClick={handleDeleteAllTasks}>Delete All Tasks</button>

export default TaskSummary;