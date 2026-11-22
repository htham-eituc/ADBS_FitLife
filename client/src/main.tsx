import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Always use the default light theme, including after hot reload.
document.documentElement.classList.remove("dark");
document.documentElement.setAttribute("data-color-scheme", "light");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
