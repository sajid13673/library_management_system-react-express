import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

export const ProtectedRoute = ({roles}) => {
  const { user, loading } = useAuth();
  const role = user && user.role;
  console.log(user, role);
  
  roles && console.log(roles.includes(role));

  useEffect(() => {
    console.log(loading, user);
    
  }, loading, user)
  if (loading) {
        return <div>Loading...</div>;
    }
  // Check if the user is authenticated
  if (!user) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }
  if (roles && !roles.includes(role)) {
    return <Navigate to="/" />;
  }


  // If authenticated, render the child routes
  return <Outlet />;
};