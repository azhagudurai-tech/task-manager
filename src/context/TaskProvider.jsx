import { createContext, useState } from "react";


const TaskContext = createContext();

export default TaskContext;

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editInput, setEditInput] = useState("");
    const [filter, setFilter] = useState("all");



    function handleAddTask() {
        if (taskInput.trim() === "") return;

        setTasks([
            ...tasks,
            {
                id: Date.now(),
                title: taskInput,
                completed: false,
            },
        ]);

        setTaskInput("");
    }

    function handleDeleteTask(delId) {
        setTasks(tasks.filter((task) => task.id !== delId));
    }

    function handleToggleTask(taskId) {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }

            return task;
        });

        setTasks(updatedTasks);
    }

    function handleEditTask(task) {
        setEditingTaskId(task.id);
        setEditInput(task.title);
    }

    function handleSaveEdit() {
        if (editInput.trim() === "") return;

        const editedTasks = tasks.map((task) => {
            if (task.id === editingTaskId) {
                return {
                    ...task,
                    title: editInput,
                };
            }

            return task;
        });

        setTasks(editedTasks);
        setEditingTaskId(null);
        setEditInput("");
    }

    function handleClearCompleted() {
        const activeTasks = tasks.filter((task) => !task.completed);
        setTasks(activeTasks);
    }

    function handleDeleteAllTasks() {
        const delAll = window.confirm(
            "Are you sure you want to delete all tasks?"
        );

        if (delAll) {
            setTasks([]);
        }
    }


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
        }}>
            {children}
        </TaskContext.Provider>
    );
}