import { useContext } from "react";
import TaskContext from "../context/TaskProvider";


function Header() {
  const {tasks} = useContext(TaskContext);
  return (
    <header>
      <h2>Task Manganer ({tasks.length})</h2>
      <p>Organize your daily task</p>
    </header>
  );
}

export default Header;