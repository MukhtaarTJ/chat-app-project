// App.js

import "./style.scss";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const navigate = useNavigate();
  const state = useAuthContext();

  useEffect(() => {
    if (state.state.user) {
      navigate("/home");
    }
  }, [state]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/register" replace={true} />}
          exact
        />
        <Route
          path="/home"
          element={
            <ProtectedRoutes user={state.state.user} children={<Home />} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
