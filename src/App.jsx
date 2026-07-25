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

  function handleDeleteTask(delIndex) {
    setTasks(tasks.filter((task, index) => index !== delIndex));
  }

  return (
    <main>
      <Header />

      <TaskForm
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        handleAddTask={handleAddTask}
      />

      <TaskList tasks={tasks} delTask={handleDeleteTask} />
    </main>
  );
}

export default App;