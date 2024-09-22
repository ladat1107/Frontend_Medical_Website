import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/nunito';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <BrowserRouter>
    <App />
  </BrowserRouter>


  // </React.StrictMode>
);
