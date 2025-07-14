// src/context/AuthContext.jsx (or src/AuthContext.jsx, depending on your actual path)
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig'; // Import 'db' for Firestore
import { doc, onSnapshot } from 'firebase/firestore'; // Import Firestore functions

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
  const [isAdmin, setIsAdmin] = useState(false); // New state to store admin status

  useEffect(() => {
    // Firebase's onAuthStateChanged listener
    const unsubscribeAuth = auth.onAuthStateChanged(async user => {
      setCurrentUser(user);

      if (user) {
        const userDocRef = doc(db, 'users', user.uid); // Reference to the user's document in Firestore

        // Set up a real-time listener for the user's document
        // This is crucial for updating the admin status if changed in Firestore
        const unsubscribeFirestore = onSnapshot(
          userDocRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              // Assume a 'role' field exists in your user document, e.g., { role: 'admin' }
              setIsAdmin(userData.role === 'admin');
            } else {
              setIsAdmin(false); // User document doesn't exist, so not an admin
            }
            setLoading(false); // Set loading to false once user data (including role) is determined
          },
          (error) => {
            console.error("Error fetching user role from Firestore:", error);
            setIsAdmin(false); // On error, assume not admin
            setLoading(false); // Set loading to false even on error
          }
        );

        // Return a cleanup function for the Firestore listener
        return () => {
          unsubscribeAuth(); // Clean up auth listener
          unsubscribeFirestore(); // Clean up Firestore listener
        };

      } else {
        setIsAdmin(false); // No user logged in, so not an admin
        setLoading(false); // Set loading to false as auth state is determined
      }
    });

    // Initial cleanup for the auth listener (if no user initially or when component unmounts)
    return () => unsubscribeAuth();
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Function to handle user logout
  const logout = () => {
    return auth.signOut();
  };

  // The value that will be provided to consumers of this context
  const value = {
    currentUser,
    logout,
    loading, // Expose loading state
    isAdmin, // Expose isAdmin status
    // You can add other auth-related functions here if needed,
    // e.g., login, signup, resetPassword, etc., and call Firebase methods from them.
    // However, for now, your Auth.jsx handles login/signup directly.
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when the authentication state and user role data has been loaded */}
      {!loading && children}
    </AuthContext.Provider>
  );
};