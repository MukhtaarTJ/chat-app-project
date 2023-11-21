import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user, children }) => {
  console.log(user);
  if (!user) {
    return <Navigate to="/register" replace />;
  }
  return children;
};

export default ProtectedRoutes;
