import Header from "./components/TaskForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";


function App() {
  return (
    <div>
      <h1>Task Manager</h1>
      <Header />
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;