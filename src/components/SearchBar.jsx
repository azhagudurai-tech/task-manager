import useTaskUIContext from "../hooks/useTaskUIContext";


function SearchBar() {
    const { searchTerm, setSearchTerm } = useTaskUIContext();

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