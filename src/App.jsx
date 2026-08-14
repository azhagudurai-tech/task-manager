import MainContent from "./components/MainContent"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CompletedTasks from "./pages/CompletedTasks";
import TasksLayout from "./pages/TasksLayout";
import TaskDetails from "./pages/TaskDetails";
import OldTasks from "./pages/OldTasks";
import NotFound from "./pages/NotFound";
import AppLayout from "./pages/AppLayout";

function App() {

  return (
    <>

      <Routes>

        <Route element={<AppLayout />}>

          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<Home />} />

          <Route path="/tasks" element={<TasksLayout />}>

            <Route index element={
              <MainContent />
            }
            />

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