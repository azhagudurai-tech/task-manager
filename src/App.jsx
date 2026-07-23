import { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  function handleAddTask() {
    if (taskInput.trim() === "") return;

    setTasks([...tasks, taskInput]);
    setTaskInput("");
  }

  return (
    <main>
      <Header />

      <TaskForm
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        handleAddTask={handleAddTask}
      />

      <TaskList tasks={tasks} />
    </main>
  );
}

export default App;