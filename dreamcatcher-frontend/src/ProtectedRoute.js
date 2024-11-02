import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;