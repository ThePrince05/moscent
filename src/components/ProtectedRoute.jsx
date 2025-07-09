// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if AuthContext.jsx is elsewhere

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth(); // Get currentUser and loading state from your Auth Context

  // If the authentication status is still loading, you might want to show a loading spinner
  // or a blank page to prevent flickering before redirection.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F2F4F3]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#D6001A]"></div>
      </div>
    );
  }

  // If there's no current user (not logged in), redirect to the /auth page
  if (!currentUser) {
    return <Navigate to="/auth" replace />; // 'replace' prevents going back to the protected route via browser history
  }

  // If there is a current user (logged in), render the children components (the protected page)
  return children;
}