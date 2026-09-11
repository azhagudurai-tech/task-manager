import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {

    const { isAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
}