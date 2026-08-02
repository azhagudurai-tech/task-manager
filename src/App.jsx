import { useContext } from "react";
import TaskContext from "./context/TaskProvider";
import Header from "./components/Header"
import MainContent from "./components/MainContent"

function App() {

  const {
    tasks,
    taskInput,
    setTaskInput,
    editingTaskId,
    editInput,
    setEditInput,
    filter,
    setFilter,
    handleAddTask,
    handleDeleteTask,
    handleToggleTask,
    handleEditTask,
    handleSaveEdit,
    handleClearCompleted,
    handleDeleteAllTasks,
  } = useContext(TaskContext);

  const displayedTask = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <>

      <Header />

      <MainContent
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        handleAddTask={handleAddTask}
        setFilter={setFilter}
        displayedTask={displayedTask}
        handleEditTask={handleEditTask}
        editingTaskId={editingTaskId}
        editInput={editInput}
        setEditInput={setEditInput}
        handleSaveEdit={handleSaveEdit}
        handleClearCompleted={handleClearCompleted}
        handleDeleteAllTasks={handleDeleteAllTasks}
      />

    </>

  );
}

export default App;