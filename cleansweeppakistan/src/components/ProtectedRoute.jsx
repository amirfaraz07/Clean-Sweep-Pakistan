import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth(); // Add isLoading

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth status
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
