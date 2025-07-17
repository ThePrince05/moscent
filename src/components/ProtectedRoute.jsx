// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F2F4F3]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#D6001A]"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#F2F4F3] p-4 text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#D6001A]">Access Denied</h1>
        <p className="mb-6">You do not have permission to view this page.</p>
        <Navigate to="/" replace />
      </div>
    );
  }

  return children;
}
