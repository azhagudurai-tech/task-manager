import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { TaskProvider } from "./context/TaskProvider";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <TaskProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </TaskProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);