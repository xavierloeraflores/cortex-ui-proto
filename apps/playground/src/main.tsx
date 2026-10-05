import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemePreview } from "@cortex/ui/theme-preview";
import { App } from "./app";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ThemePreview />
  </StrictMode>,
);
