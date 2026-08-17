
import { NavLink } from "react-router-dom";
import useTaskContext from "../hooks/useTaskContext";


function Header() {
  const { tasks } = useTaskContext();
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