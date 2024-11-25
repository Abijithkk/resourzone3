import React from 'react';
import { Navigate } from 'react-router-dom'; 

const ProtectedRoute = ({ component: Component }) => {
  const token = localStorage.getItem('resourceZone_token');


  if (!token) {
    return <Navigate to="/login" />;
  }

 
  return <Component />;
};

export default ProtectedRoute;
