import { createContext, useCallback, useMemo, useState } from "react";

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {

    // lazy initializer — reads from localStorage only once, on first render
    // (same trick TaskProvider uses with getInitialTasks)
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const login = useCallback(async (email, password) => {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            // let the Login page's try/catch handle showing an error message
            throw new Error("Invalid credentials");
        }

        const data = await response.json();

        setToken(data.token);
        localStorage.setItem("token", data.token);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem("token");
    }, []);

    // !! converts a value to its boolean equivalent:
    // if token is a real string, isAuthenticated becomes true; if token is null, it becomes false
    const isAuthenticated = !!token;

    const contextValue = useMemo(() => ({
        token, login, logout, isAuthenticated,
    }), [token, login, logout, isAuthenticated]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
