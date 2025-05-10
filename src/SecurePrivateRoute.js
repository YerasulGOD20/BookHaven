import React from 'react';
import { Navigate } from 'react-router-dom';

const SecurePrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user ? children : <Navigate to="/" replace />;
};

export default SecurePrivateRoute;
