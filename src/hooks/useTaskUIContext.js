import { useContext } from "react";
import { TaskUIContext } from "../context/TaskProvider";

export default function useTaskUIContext() {
    const context = useContext(TaskUIContext);

    if (!context) {
        throw new Error("useTaskUIContext must be used within a TaskProvider");
    }

    return context;
}
