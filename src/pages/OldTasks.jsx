import { Navigate } from "react-router-dom";


export default function OldTasks() {
    return <Navigate to={"/tasks"} replace />
}