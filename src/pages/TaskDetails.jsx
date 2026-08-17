import { useLocation, useNavigate, useParams } from "react-router-dom";
import useTaskContext from "../hooks/useTaskContext";


export default function TaskDetails() {
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const { taskId } = useParams();
    const { tasks } = useTaskContext();

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
