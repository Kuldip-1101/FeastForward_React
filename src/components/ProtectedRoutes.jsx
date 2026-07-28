import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

//----------- Wrapper for standard customer routes -----------------
export const CustomerRoute = () => {
  const { user } = useSelector((state) => state.auth);

  //--------- If logged in as admin, block access to customer routes and push to admin dashboard--------
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

//----------- Wrapper for admin routes -----------------
export const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);

  //--------- If not logged in, redirect to home (or login) ---------
  if (!user) {
    return <Navigate to="/" replace />;
  }

  //--------- If logged in as customer, block access to admin routes ----------
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};