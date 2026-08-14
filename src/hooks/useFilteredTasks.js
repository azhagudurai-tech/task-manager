import { useMemo } from "react";

export default function useFilteredTasks(
    tasks,
    filter,
    searchTerm,
    sortBy
) {
    return useMemo(() => {
        const filteredTasks = tasks.filter((task) => {
            const matchesFilter =
                filter === "completed"
                    ? task.completed
                    : filter === "active"
                        ? !task.completed
                        : true;

            const matchesSearch = task.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            return matchesFilter && matchesSearch;
        });

        const sortedTasks = [...filteredTasks];

        if (sortBy === "oldest") {
            sortedTasks.sort((a, b) => a.id - b.id);
        }

        if (sortBy === "newest") {
            sortedTasks.sort((a, b) => b.id - a.id);
        }

        if (sortBy === "az") {
            sortedTasks.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        }

        if (sortBy === "priority") {
            const priorityOrder = {
                high: 3,
                medium: 2,
                low: 1,
            };

            sortedTasks.sort(
                (a, b) =>
                    priorityOrder[b.priority] -
                    priorityOrder[a.priority]
            );
        }

        return sortedTasks;

    }, [tasks, filter, searchTerm, sortBy]);
}