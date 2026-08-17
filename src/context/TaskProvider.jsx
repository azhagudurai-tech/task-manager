import { createContext, useCallback, useMemo, useReducer, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useFilteredTasks from "../hooks/useFilteredTasks";

const STORAGE_KEY = "tasks";

const TaskContext = createContext();
export default TaskContext;

export const TaskUIContext = createContext();


export function taskReducer(state, action) {
    switch (action.type) {
        case "ADD_TASK":
            return [
                ...state,
                {
                    id: crypto.randomUUID(),
                    createdAt: Date.now(),
                    title: action.payload.title,
                    completed: false,
                    priority: action.payload.priority,
                },
            ];

        case "DELETE_TASK":
            return state.filter(task => task.id !== action.payload);

        case "TOGGLE_TASK":
            return state.map((task) => {
                if (task.id === action.payload) {
                    return {
                        ...task,
                        completed: !task.completed,
                    };
                }

                return task;
            });

        case "SAVE_EDIT":
            return state.map((task) => {
                if (task.id === action.payload.id) {
                    return {
                        ...task,
                        title: action.payload.title,
                        priority: action.payload.priority,
                    };
                }

                return task;
            });

        case "CLEAR_COMPLETED":
            return state.filter((task) => !task.completed);

        case "DELETE_ALL":
            return [];


        default:
            return state;
    }
}


function getInitialTasks() {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (storedTasks) {
        try {
            return JSON.parse(storedTasks)
        } catch {
            return [];
        }
    }

    return [];

}

export function TaskProvider({ children }) {

    const [tasks, dispatch] = useReducer(taskReducer, [], getInitialTasks);

    const [taskInput, setTaskInput] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editInput, setEditInput] = useState("");
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [priority, setPriority] = useState("medium");
    const [editPriority, setEditPriority] = useState("medium");


    useLocalStorage(STORAGE_KEY, tasks);

    const handleAddTask = useCallback(() => {
        if (taskInput.trim() === "") return;

        dispatch({
            type: "ADD_TASK",
            payload: {
                title: taskInput,
                priority: priority,
            }
        });

        setTaskInput("");
        setPriority("medium");
    }, [taskInput, priority]);


    const handleDeleteTask = useCallback((delId) => {
        dispatch({
            type: "DELETE_TASK",
            payload: delId,
        });
    }, []);

    const handleToggleTask = useCallback((taskId) => {
        dispatch({
            type: "TOGGLE_TASK",
            payload: taskId,
        });
    }, []);

    const handleEditTask = useCallback((task) => {
        setEditingTaskId(task.id);
        setEditInput(task.title);
        setEditPriority(task.priority);
    }, []);

    const handleSaveEdit = useCallback(() => {
        if (editInput.trim() === "") return;

        dispatch({
            type: "SAVE_EDIT",
            payload: {
                id: editingTaskId,
                title: editInput,
                priority: editPriority,
            },
        });
        setEditingTaskId(null);
        setEditInput("");
        setEditPriority("medium");
    }, [editInput, editingTaskId, editPriority]);

    const handleClearCompleted = useCallback(() => {
        dispatch({
            type: "CLEAR_COMPLETED",
        });
    }, []);

    const handleDeleteAllTasks = useCallback(() => {
        const delAll = window.confirm(
            "Are you sure you want to delete all tasks?"
        );

        if (delAll) {
            dispatch({
                type: "DELETE_ALL",
            });
        }
    }, []);

    const displayedTask = useFilteredTasks(tasks, filter, searchTerm, sortBy);

    const contextValue = useMemo(() => ({
        tasks, handleAddTask, handleDeleteTask, handleToggleTask, handleEditTask,
        handleSaveEdit, handleClearCompleted, handleDeleteAllTasks,
        editingTaskId, editInput, setEditInput, editPriority, setEditPriority,
    }), [
        tasks, handleAddTask, handleDeleteTask, handleToggleTask, handleEditTask,
        handleSaveEdit, handleClearCompleted, handleDeleteAllTasks,
        editingTaskId, editInput, editPriority,
    ]);

    const contextUIValue = useMemo(() => ({
        taskInput, setTaskInput, filter, setFilter, searchTerm, setSearchTerm,
        sortBy, setSortBy, priority, setPriority, displayedTask,
    }), [
        taskInput, filter, searchTerm, sortBy, priority, displayedTask,
    ]);

    return (
        <TaskContext.Provider value={contextValue}>
            <TaskUIContext.Provider value={contextUIValue}>
                {children}
            </TaskUIContext.Provider>
        </TaskContext.Provider>
    );
}