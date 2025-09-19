import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <p>Loading user session...</p>
        </div>
    );
  }

  if (!currentUser) {
    toast.error("You need to log in to access this page.");
    return <Navigate to="/signup" replace />;
  }

  return children; 
};

export default ProtectedRoute;