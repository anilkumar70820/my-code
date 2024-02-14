import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./FirebaseData";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/"); // Redirect to sign-in page if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
