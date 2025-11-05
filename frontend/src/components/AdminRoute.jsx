import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth"; // adjust the path if needed

const AdminRoute = ({ children }) => {
  const { isloggedin, user, isLoading } = useAuth();

  // 🚫 If there's no token at all, redirect immediately (no loading state)
  if (!isloggedin) {
    return <Navigate to="/" replace />;
  }

  // ✅ If token is present but user is still loading, wait
  if (isLoading) {
    return null; // or a spinner if you really want
  }

  // 🔒 If user is logged in but not admin, block
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
