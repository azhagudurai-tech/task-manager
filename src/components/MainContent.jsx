import TaskForm from "./TaskForm";
import TaskSection from "./TaskSection";


function MainContent({ taskInput, setTaskInput, handleAddTask, setFilter, displayedTask,
    handleDeleteTask, handleToggleTask, handleEditTask, editingTaskId, editInput, setEditInput, handleSaveEdit, handleClearCompleted, handleDeleteAllTasks }) {
    return (
        <main>
            <TaskForm
                taskInput={taskInput}
                setTaskInput={setTaskInput}
                handleAddTask={handleAddTask}
            />

            <TaskSection
                setFilter={setFilter}
                displayedTask={displayedTask}
                handleDeleteTask={handleDeleteTask}
                handleToggleTask={handleToggleTask}
                handleEditTask={handleEditTask}
                editingTaskId={editingTaskId}
                editInput={editInput}
                setEditInput={setEditInput}
                handleSaveEdit={handleSaveEdit}
                handleClearCompleted={handleClearCompleted}
                handleDeleteAllTasks={handleDeleteAllTasks}
            />

        </main>
    );
}

export default MainContent;