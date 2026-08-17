import useTaskUIContext from "../hooks/useTaskUIContext";
import TaskForm from "./TaskForm";
import TaskSection from "./TaskSection";


function MainContent() {

    const { taskInput, setTaskInput } = useTaskUIContext();

    return (
        <main>
            <TaskForm
                taskInput={taskInput}
                setTaskInput={setTaskInput}
            />

            <TaskSection />

        </main>
    );
}

export default MainContent;