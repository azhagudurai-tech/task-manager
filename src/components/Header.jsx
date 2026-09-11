
import { NavLink } from "react-router-dom";
import useTaskContext from "../hooks/useTaskContext";
import useAuthContext from "../hooks/useAuthContext";


function Header() {
  const { tasks } = useTaskContext();
  const { logout } = useAuthContext();
  return (
    <header>
      <h2>Task Manganer ({tasks.length})</h2>
      <p>Organize your daily task</p>
      <div id="HeaderDiv">
        <NavLink to={"/"}>Go to Home</NavLink>
        <NavLink to={"/tasks"}>See My Tasks</NavLink>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </header>
  );
}

export default Header;