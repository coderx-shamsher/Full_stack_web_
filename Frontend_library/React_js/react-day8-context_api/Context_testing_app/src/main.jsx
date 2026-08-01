import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Theme_Context from "./Context/Theme_Context.jsx";

createRoot(document.getElementById("root")).render(
  <Theme_Context>
    <App />
  </Theme_Context>,
);
