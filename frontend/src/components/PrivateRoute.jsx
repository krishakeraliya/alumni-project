// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth"; // adjust the path if needed

const PrivateRoute = ({ children }) => {
  const { isloggedin, isLoading } = useAuth();

  if (!isloggedin) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return null; // or loader/spinner
  }

  return children;
};

export default PrivateRoute;
