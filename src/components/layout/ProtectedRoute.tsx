import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProtectedRoute: React.FC = () => {
  const { user, token } = useAuth();
  
  if (token && !user) {
    return <LoadingSpinner />;
  }
  
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;