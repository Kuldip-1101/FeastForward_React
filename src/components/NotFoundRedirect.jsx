import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const NotFoundRedirect = () => {
  // ------------------ Get authentication state from Redux store ------------------
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});

  //-----------------Conditional Redirect Logic ------------------ 
  //---------------Guest User--------------
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  //------------ Admin users ----------------
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  //-------------Authenticated Customers-------------
  return <Navigate to="/" replace />;
};

export default NotFoundRedirect;