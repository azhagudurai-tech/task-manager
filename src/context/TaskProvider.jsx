import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useFilteredTasks from "../hooks/useFilteredTasks";

const STORAGE_KEY = "tasks";

const TaskContext = createContext();
export default TaskContext;


function taskReducer(state, action) {
    switch (action.type) {
        case "ADD_TASK":
            return [
                ...state,
                {
                    id: Date.now(),
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

    return storedTasks
        ? JSON.parse(storedTasks)
        : [];
}

export function TaskProvider({ children }) {

    const [tasks, dispatch] = useReducer(
        taskReducer,
        [],
        getInitialTasks
    );

    const [taskInput, setTaskInput] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editInput, setEditInput] = useState("");
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [priority, setPriority] = useState("medium");
    const [editPriority, setEditPriority] = useState("medium");


    useLocalStorage(STORAGE_KEY, tasks);

    function handleAddTask() {
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
    }

    function handleDeleteTask(delId) {

        dispatch({
            type: "DELETE_TASK",
            payload: delId,
        });
    }

    function handleToggleTask(taskId) {
        dispatch({
            type: "TOGGLE_TASK",
            payload: taskId,
        });
    }

    function handleEditTask(task) {
        setEditingTaskId(task.id);
        setEditInput(task.title);
        setEditPriority(task.priority);
    }

    function handleSaveEdit() {
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
    }

    function handleClearCompleted() {
        dispatch({
            type: "CLEAR_COMPLETED",
        });
    }

    function handleDeleteAllTasks() {
        const delAll = window.confirm(
            "Are you sure you want to delete all tasks?"
        );

        if (delAll) {
            dispatch({
                type: "DELETE_ALL",
            });
        }
    }

    const displayedTask = useFilteredTasks(tasks, filter, searchTerm, sortBy);

    return (
        <TaskContext.Provider value={{
            tasks,
            taskInput,
            setTaskInput,
            editingTaskId,
            editInput,
            setEditInput,
            filter,
            setFilter,
            handleAddTask,
            handleDeleteTask,
            handleToggleTask,
            handleEditTask,
            handleSaveEdit,
            handleClearCompleted,
            handleDeleteAllTasks,
            searchTerm,
            setSearchTerm,
            displayedTask,
            sortBy,
            setSortBy,
            priority,
            setPriority,
            editPriority,
            setEditPriority,
        }}>
            {children}
        </TaskContext.Provider>
    );
}