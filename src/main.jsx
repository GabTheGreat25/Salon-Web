import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RESOURCE } from "@/constants";

ReactDOM.createRoot(document.getElementById(RESOURCE.ROOT)).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
