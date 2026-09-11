import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export default function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Error Context");
    }

    return context;
}