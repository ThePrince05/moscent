// src/pages/MyAccount.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
// Import Feather icons from react-icons - Added FiMail
import { FiPackage, FiHeart, FiLogOut, FiMapPin, FiLock, FiUser, FiCreditCard, FiMail } from 'react-icons/fi';

export default function MyAccount() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // State to store the user's first name from Firestore
  const [userFirstName, setUserFirstName] = useState('');
  const [loadingProfileName, setLoadingProfileName] = useState(true);

  // Define your color palette for easy reference (these are now for reference, not direct string interpolation in Tailwind classes)
  const offWhite = '#F2F4F3';
  const nearBlack = '#0A0908';
  const accentRed = '#D6001A';

  // --- Firestore Data Fetching for User's First Name (useEffect) ---
  useEffect(() => {
    if (!currentUser) {
      setLoadingProfileName(false);
      return; // No user, so no name to fetch
    }

    setLoadingProfileName(true);
    const userDocRef = doc(db, 'users', currentUser.uid);

    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setUserFirstName(userData.firstName || ''); // Set firstName, or empty string if not found
        } else {
          setUserFirstName(''); // User document doesn't exist, so no first name
        }
        setLoadingProfileName(false);
      },
      (err) => {
        console.error("Error fetching user first name for MyAccount:", err);
        setUserFirstName(''); // On error, fallback to empty string
        setLoadingProfileName(false);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [currentUser]); // Re-run effect if currentUser changes

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth'); // Redirect to auth page after logout
    } catch (error) {
      console.error("Failed to log out from MyAccount page:", error);
      // Optionally show a user-friendly error message
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-[#F2F4F3] text-[#0A0908]">
        <p className="text-xl">Please log in to view your account.</p>
      </div>
    );
  }

  // Determine the display name: first name, then email
  const displayName = userFirstName || currentUser.email;

  return (
    <div className={`bg-[#F2F4F3] min-h-[calc(100vh-128px)] py-8 px-4 sm:px-6 lg:px-8 font-sans`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-extrabold text-[#0A0908] mb-10 text-center`}>
          Account Details
        </h1>

        <div className="space-y-6">

          {/* User Information Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8">
            <h2 className={`text-2xl font-semibold text-[#0A0908] mb-4 text-center`}>Your Profile</h2>
            <div className="text-center">
              <p className="text-xl text-gray-700 mb-2">Hello there,</p>
              {loadingProfileName ? (
                <p className={`text-3xl font-bold text-[#0A0908]`}>Loading name...</p>
              ) : (
                <p className={`text-3xl font-bold text-[#0A0908] break-all`}>{displayName}</p>
              )}
            </div>
          </div>

          {/* Account Navigation Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8">
            <h2 className={`text-2xl font-semibold text-[#0A0908] mb-6 text-center`}>My Activity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Link to Orders */}
              <Link
                to="/orders"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Direct hex value for group-hover:text */}
                <FiPackage size={28} className={`mb-2 group-hover:text-[#D6001A] transition-colors`} />
                <span className="leading-tight">My Orders</span>
              </Link>

              {/* Link to Favorites */}
              <Link
                to="/favorites"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Direct hex value for group-hover:text */}
                <FiHeart size={28} className={`mb-2 group-hover:text-[#D6001A] transition-colors`} />
                <span className="leading-tight">My Favorites</span>
              </Link>

              {/* Link to Shipping Addresses */}
              <Link
                to="/account/shipping-addresses"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Direct hex value for group-hover:text */}
                <FiMapPin size={28} className={`mb-2 group-hover:text-[#D6001A] transition-colors`} />
                <span className="leading-tight">Shipping Addresses</span>
              </Link>

              {/* Link to Change Password */}
              <Link
                to="/account/change-password"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Direct hex value for group-hover:text */}
                <FiLock size={28} className={`mb-2 group-hover:text-[#D6001A] transition-colors`} />
                <span className="leading-tight">Change Password</span>
              </Link>

              {/* Link to Personal Details */}
              <Link
                to="/account/personal-details"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Direct hex value for group-hover:text */}
                <FiUser size={28} className={`mb-2 group-hover:text-[#D6001A] transition-colors`} />
                <span className="leading-tight">Personal Details</span>
              </Link>

              {/* NEW: Link to Change Email */}
              <Link
                to="/account/change-email"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Direct hex value for group-hover:text */}
                <FiMail size={28} className={`mb-2 group-hover:text-[#D6001A] transition-colors`} />
                <span className="leading-tight">Change Email</span>
              </Link>

              {/* Link to Payment Methods (to be implemented securely later) */}
              <Link
                to="/account/payment-methods"
                className={`flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center`}
              >
                {/* Corrected: Direct hex value for group-hover:text */}
                <FiCreditCard size={28} className={`mb-2 group-hover:text-[#D6001A] transition-colors`} />
                <span className="leading-tight">Payment Methods</span>
              </Link>

            </div>
          </div>

          {/* Logout Section */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLogout}
              className={`w-full sm:w-auto flex items-center justify-center bg-transparent border-2 border-[#D6001A] text-[#D6001A] px-8 py-3 rounded-md text-lg font-semibold
                          hover:bg-[#D6001A] hover:text-[#F2F4F3] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D6001A] group`}
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