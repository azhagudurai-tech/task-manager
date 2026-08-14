import { useContext } from "react";
import TaskContext from "../context/TaskProvider";

function SortBar() {

    const {
        sortBy,
        setSortBy,
    } = useContext(TaskContext);

    return (
        <section className="sort-bar">
            <select
                value={sortBy}
                onChange={(e) =>
                    setSortBy(e.target.value)
                }
            >
                <option value="newest">
                    Newest First
                </option>

                <option value="oldest">
                    Oldest First
                </option>

                <option value="az">
                    A → Z
                </option>

                <option value="priority">
                    Priority
                </option>
            </select>
        </section>
    );
}

export default SortBar;