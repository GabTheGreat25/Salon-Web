import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./state/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { RESOURCE } from "@/constants";
import { Loader } from "@/components";

function Root() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <React.StrictMode>
      {loading ? (
        <Loader />
      ) : (
        <React.StrictMode>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <ToastContainer />
              <App />
            </PersistGate>
          </Provider>
        </React.StrictMode>
      )}
    </React.StrictMode>
  );
  // return (
  //   <React.StrictMode>
  //     <Provider store={store}>
  //       <PersistGate persistor={persistor}>
  //         <ToastContainer />
  //         <App />
  //       </PersistGate>
  //     </Provider>
  //   </React.StrictMode>
  // );
}

ReactDOM.createRoot(document.getElementById(RESOURCE.ROOT)).render(<Root />);
