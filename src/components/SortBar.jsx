import useTaskUIContext from "../hooks/useTaskUIContext";


function SortBar() {

    const { sortBy, setSortBy, } = useTaskUIContext();

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