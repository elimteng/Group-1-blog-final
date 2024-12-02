import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Use your context to get the user

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();  // Get user from context

  if (!user) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (protected page)
  return children;
};

export default ProtectedRoute;
