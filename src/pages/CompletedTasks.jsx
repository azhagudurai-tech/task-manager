import TaskList from "../components/TaskList";
import useTaskContext from "../hooks/useTaskContext"


export default function CompletedTasks() {
    const { tasks } = useTaskContext();

    const completedTasks = tasks.filter((task) => task.completed);
    return <>
        <h4>Completed Tasks</h4>
        <TaskList tasks={completedTasks} />
    </>
}