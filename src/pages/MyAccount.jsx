// src/pages/MyAccount.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
// Import Feather icons from react-icons
import { FiPackage, FiHeart, FiLogOut, FiMapPin, FiLock, FiUser, FiCreditCard, FiMail, FiSettings } from 'react-icons/fi';

export default function MyAccount() {
  const { currentUser, logout, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  const [userFirstName, setUserFirstName] = useState('');
  const [loadingProfileName, setLoadingProfileName] = useState(true);

  // Define your color palette for easy reference - these are now for reference, not direct string interpolation in Tailwind classes
  // We no longer need these constant definitions here for direct Tailwind classes,
  // as they are defined in tailwind.config.js for class usage.
  // However, keeping them for any potential JavaScript logic that uses them directly.


  useEffect(() => {
    if (!currentUser) {
      setLoadingProfileName(false);
      return;
    }

    setLoadingProfileName(true);
    const userDocRef = doc(db, 'users', currentUser.uid);

    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setUserFirstName(userData.firstName || '');
        } else {
          setUserFirstName('');
        }
        setLoadingProfileName(false);
      },
      (err) => {
        console.error("Error fetching user first name for MyAccount:", err);
        setUserFirstName('');
        setLoadingProfileName(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error("Failed to log out from MyAccount page:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-offWhite text-nearBlack">
        <p className="text-xl">Loading account details...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-offWhite text-nearBlack">
        <p className="text-xl">Please log in to view your account.</p>
      </div>
    );
  }

  const displayName = userFirstName || currentUser.email;

  return (
    <div className={`bg-offWhite min-h-[calc(100vh-128px)] py-8 px-4 sm:px-6 lg:px-8 font-sans`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-extrabold text-nearBlack mb-10 text-center`}>
          Account Details
        </h1>

        <div className="space-y-6">

          {/* User Information Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8">
            <h2 className={`text-2xl font-semibold text-nearBlack mb-4 text-center`}>Your Profile</h2>
            <div className="text-center">
              <p className="text-xl text-gray-700 mb-2">Hello there,</p>
              {loadingProfileName ? (
                <p className={`text-3xl font-bold text-nearBlack`}>Loading name...</p>
              ) : (
                <p className={`text-3xl font-bold text-nearBlack break-all`}>{displayName}</p>
              )}
            </div>
          </div>

          {/* Account Navigation Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8">
            <h2 className={`text-2xl font-semibold text-nearBlack mb-6 text-center`}>My Activity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Link to Orders */}
              <Link
                to="/orders"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-nearBlack hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Use direct color name 'accentRed' */}
                <FiPackage size={28} className={`mb-2 group-hover:text-accent-red transition-colors`} />
                <span className="leading-tight">My Orders</span>
              </Link>

              {/* Link to Favorites */}
              <Link
                to="/favorites"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-nearBlack hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Use direct color name 'accentRed' */}
                <FiHeart size={28} className={`mb-2 group-hover:text-accent-red transition-colors`} />
                <span className="leading-tight">My Favorites</span>
              </Link>

              {/* Link to Shipping Addresses */}
              <Link
                to="/account/shipping-addresses"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-nearBlack hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Use direct color name 'accentRed' */}
                <FiMapPin size={28} className={`mb-2 group-hover:text-accent-red transition-colors`} />
                <span className="leading-tight">Shipping Addresses</span>
              </Link>

              {/* Link to Change Password */}
              <Link
                to="/account/change-password"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-nearBlack hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Use direct color name 'accentRed' */}
                <FiLock size={28} className={`mb-2 group-hover:text-accent-red transition-colors`} />
                <span className="leading-tight">Change Password</span>
              </Link>

              {/* Link to Personal Details */}
              <Link
                to="/account/personal-details"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-nearBlack hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Use direct color name 'accentRed' */}
                <FiUser size={28} className={`mb-2 group-hover:text-accent-red transition-colors`} />
                <span className="leading-tight">Personal Details</span>
              </Link>

              {/* NEW: Link to Change Email */}
              <Link
                to="/account/change-email"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-nearBlack hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Use direct color name 'accentRed' */}
                <FiMail size={28} className={`mb-2 group-hover:text-accent-red transition-colors`} />
                <span className="leading-tight">Change Email</span>
              </Link>

              {/* Link to Payment Methods (to be implemented securely later) */}
              <Link
                to="/account/payment-methods"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-nearBlack hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Use direct color name 'accentRed' */}
                <FiCreditCard size={28} className={`mb-2 group-hover:text-accent-red transition-colors`} />
                <span className="leading-tight">Payment Methods</span>
              </Link>

            </div>
          </div>

          {/* Admin Tools Section - Conditionally Rendered */}
          {isAdmin && ( // This block only renders if isAdmin is true
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8 mt-6">
              <h2 className={`text-2xl font-semibold text-nearBlack mb-6 text-center`}>
                Admin Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/admin/dashboard"
                  className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                             text-nearBlack hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
                >
                  {/* Corrected: Use direct color name 'accentRed' */}
                  <FiSettings size={28} className={`mb-2 group-hover:text-accent-red transition-colors`} />
                  <span className="leading-tight">Go to Dashboard</span>
                </Link>
              </div>
            </div>
          )}

          {/* Logout Section */}
          <div className="flex justify-center mt-6">
            <button
             onClick={handleLogout}
               className={`w-full sm:w-auto flex items-center justify-center bg-transparent border-2 border-accent-red text-accent-red px-8 py-3 rounded-md text-lg font-semibold
              hover:bg-accent-red hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-red group`}
                >
              <FiLogOut size={20} className="mr-2" />
             Logout
           </button>
          </div>

        </div>
      </div>
    </div>
  );
}