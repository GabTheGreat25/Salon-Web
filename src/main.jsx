import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Loader } from "@/components";
import "./index.css";
import { RESOURCE } from "@/constants";

function Root() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return <React.StrictMode>{loading ? <Loader /> : <App />}</React.StrictMode>;
}

ReactDOM.createRoot(document.getElementById(RESOURCE.ROOT)).render(<Root />);
