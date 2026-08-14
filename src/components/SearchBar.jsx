import { useContext } from "react";
import TaskContext from "../context/TaskProvider";

function SearchBar() {
    const { searchTerm, setSearchTerm } = useContext(TaskContext);

    return (
        <section className="search-bar">

            <input
                type="text"
                placeholder="search a task"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

        </section>
    );
}

export default SearchBar;