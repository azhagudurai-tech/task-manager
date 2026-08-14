import { useContext } from "react";
import TaskForm from "./TaskForm";
import TaskSection from "./TaskSection";
import TaskContext from "../context/TaskProvider";


function MainContent() {

    const {  taskInput, setTaskInput } = useContext(TaskContext);

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