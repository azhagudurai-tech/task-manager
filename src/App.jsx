import MainContent from "./components/MainContent"
import { Routes, Route } from "react-router-dom";
import CompletedTasks from "./pages/CompletedTasks";
import TasksLayout from "./pages/TasksLayout";
import TaskDetails from "./pages/TaskDetails";
import OldTasks from "./pages/OldTasks";
import NotFound from "./pages/NotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<AppLayout />}>

          <Route path="*" element={<NotFound />} />

          <Route path="/tasks" element={<ProtectedRoute><TasksLayout /></ProtectedRoute>}>

            <Route index element={<MainContent />} />

            <Route path="completed" element={<CompletedTasks />} />

            <Route path=":taskId" element={<TaskDetails />} />

            <Route path="old" element={<OldTasks />} />

          </Route>

        </Route>
      </Routes>

    </>

  );
}

export default App;