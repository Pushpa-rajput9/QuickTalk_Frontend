import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Token in ProtectedRoutes:", token);
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <div>Loading...</div>; // or show a loader
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>; // Return protected children if authenticated
}

export default ProtectedRoutes;
