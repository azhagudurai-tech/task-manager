import { useContext } from "react";
import TaskContext from "../context/TaskProvider";
import { NavLink } from "react-router-dom";


function Header() {
  const { tasks } = useContext(TaskContext);
  return (
    <header>
      <h2>Task Manganer ({tasks.length})</h2>
      <p>Organize your daily task</p>
      <div id="HeaderDiv">
        <NavLink to={"/"}>Go to Home</NavLink>
        <NavLink to={"/tasks"}>See My Tasks</NavLink>
      </div>
    </header>
  );
}

export default Header;