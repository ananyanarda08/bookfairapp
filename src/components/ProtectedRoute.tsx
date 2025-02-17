import React from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../utils/types";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  requiredRole,
}) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isLoggedIn = user && user.name; 
  const hasCorrectRole = isLoggedIn && user.type === requiredRole;

  if (!isLoggedIn || !hasCorrectRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
