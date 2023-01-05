import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Router>        
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<App />} />
      </Routes>
    </Router> */}
    <App />
  </React.StrictMode>
);
