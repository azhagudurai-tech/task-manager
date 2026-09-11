import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import useFilteredTasks from "../hooks/useFilteredTasks";
import AuthContext from "./AuthProvider";


const TaskContext = createContext();
export default TaskContext;

export const TaskUIContext = createContext();


export function taskReducer(state, action) {
    switch (action.type) {
        case "SET_TASK":
            return action.payload

        case "ADD_TASK":
            return [...state, action.payload];

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


export function TaskProvider({ children }) {
    const { token } = useContext(AuthContext);
    const [tasks, dispatch] = useReducer(taskReducer, []);

    const [taskInput, setTaskInput] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editInput, setEditInput] = useState("");
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [priority, setPriority] = useState("medium");
    const [editPriority, setEditPriority] = useState("medium");

    useEffect(() => {

        if (!token) return;

        async function loadTask() {
            const response = await fetch("http://localhost:3000/tasks", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();

            const transformed = data.map((item) => ({
                id: item.task_id,
                title: item.task_name,
                completed: item.task_status === 1,
                priority: item.task_priority
            }));

            dispatch({ type: "SET_TASK", payload: transformed });

        }
        loadTask();

    }, [token]);


    const handleAddTask = useCallback(async () => {
        if (taskInput.trim() === "") return;

        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title: taskInput, priority: priority }),
        });

        const newTask = await response.json();

        dispatch({
            type: "ADD_TASK",
            payload: newTask,
        });

        setTaskInput("");
        setPriority("medium");
    }, [taskInput, priority, token]);


    const handleDeleteTask = useCallback(async (delId) => {

        const response = await fetch(`http://localhost:3000/tasks/${delId}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        const result = await response.json();

        dispatch({
            type: "DELETE_TASK",
            payload: delId,
        });
    }, [token]);

    const handleToggleTask = useCallback(async (taskId) => {

        const response = await fetch(`http://localhost:3000/tasks/${taskId}/toggle`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        dispatch({
            type: "TOGGLE_TASK",
            payload: taskId,
        });
    }, [token]);

    const handleEditTask = useCallback((task) => {
        setEditingTaskId(task.id);
        setEditInput(task.title);
        setEditPriority(task.priority);
    }, []);

    const handleSaveEdit = useCallback(async () => {
        if (editInput.trim() === "") return;

        const response = await fetch(`http://localhost:3000/tasks/${editingTaskId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ taskname: editInput, priority: editPriority })
            }
        );



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
    }, [editInput, editingTaskId, editPriority, token]);

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