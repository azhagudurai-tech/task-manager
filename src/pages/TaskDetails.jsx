import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskContext from "../context/TaskProvider";


export default function TaskDetails() {
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const { taskId } = useParams();
    const { tasks } = useContext(TaskContext);

    const task = tasks.find(task => task.id === Number(taskId));

    function goToTasks() {
        navigate('/tasks');
    }

    return (
        <>
            <h4>Task Detail</h4>
            {!task ? "No Task Found" :
                <p>Your Task {task.title} is in {task.priority} priority </p>
            }
            <p>Current Path :  {currentLocation.pathname}</p>
            <button onClick={goToTasks}>My Tasks</button>
        </>
    );
}
