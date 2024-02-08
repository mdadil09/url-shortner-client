import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UrlProvider from "./context/UrlProvider.jsx";
import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UrlProvider>
        <App />
      </UrlProvider>
    </BrowserRouter>
  </React.StrictMode>
);
