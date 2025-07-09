// src/AuthContext.jsx (or src/context/AuthContext.jsx)
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig'; // Assuming firebase.js is in the same directory or adjust path

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase's onAuthStateChanged listener
    // This listener is crucial as it fires whenever the auth state changes
    // (e.g., user logs in, logs out, or the app initializes and a user is already logged in)
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false); // Set loading to false once the auth state is determined
    });

    // Cleanup the listener when the component unmounts
    return unsubscribe;
  }, []);

  // Function to handle user logout
  const logout = () => {
    return auth.signOut();
  };

  // The value that will be provided to consumers of this context
  const value = {
    currentUser,
    logout,
    // You can add other auth-related functions here if needed,
    // e.g., login, signup, resetPassword, etc., and call Firebase methods from them.
    // However, for now, your Auth.jsx handles login/signup directly.
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when the authentication state has been loaded */}
      {!loading && children}
    </AuthContext.Provider>
  );
};