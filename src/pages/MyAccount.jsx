// src/pages/MyAccount.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
// Import Feather icons from react-icons
import { FiPackage, FiHeart, FiLogOut, FiMapPin, FiLock, FiUser, FiCreditCard } from 'react-icons/fi'; // Added FiCreditCard

export default function MyAccount() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Define your color palette for easy reference
  const offWhite = '#F2F4F3';
  const nearBlack = '#0A0908';
  const accentRed = '#D6001A';

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

  return (
    <div className="bg-[#F2F4F3] min-h-[calc(100vh-128px)] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#0A0908] mb-10 text-center">
          Account Details
        </h1>

        <div className="space-y-6">

          {/* User Information Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-[#0A0908] mb-4 text-center">Your Profile</h2>
            <div className="text-center">
              <p className="text-xl text-gray-700 mb-2">Hello there,</p>
              <p className="text-3xl font-bold text-[#0A0908] break-all">{currentUser.email}</p>
              {/* You can add more profile details here from currentUser if available (e.g., displayName) */}
            </div>
          </div>

          {/* Account Navigation Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-[#0A0908] mb-6 text-center">My Activity</h2>
            {/* Adjusted grid layout to sm:grid-cols-2 lg:grid-cols-3 to accommodate 6 items nicely */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Link to Orders */}
              <Link
                to="/orders"
                className="flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center"
              >
                <FiPackage size={28} className="mb-2 text-gray-600 group-hover:text-[#D6001A] transition-colors" />
                <span className="leading-tight">My Orders</span>
              </Link>

              {/* Link to Favorites */}
              <Link
                to="/favorites"
                className="flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center"
              >
                <FiHeart size={28} className="mb-2 text-gray-600 group-hover:text-[#D6001A] transition-colors" />
                <span className="leading-tight">My Favorites</span>
              </Link>

              {/* NEW: Link to Shipping Addresses */}
              <Link
                to="/account/shipping-addresses" // You'll need to create this route and component
                className="flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center"
              >
                <FiMapPin size={28} className="mb-2 text-gray-600 group-hover:text-[#D6001A] transition-colors" />
                <span className="leading-tight">Shipping Addresses</span>
              </Link>

              {/* NEW: Link to Change Password */}
              <Link
                to="/account/change-password" // You'll need to create this route and component
                className="flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center"
              >
                <FiLock size={28} className="mb-2 text-gray-600 group-hover:text-[#D6001A] transition-colors" />
                <span className="leading-tight">Change Password</span>
              </Link>

              {/* NEW: Link to Profile Information / Personal Details */}
              <Link
                to="/account/profile-details" // You'll need to create this route and component
                className="flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center"
              >
                <FiUser size={28} className="mb-2 text-gray-600 group-hover:text-[#D6001A] transition-colors" />
                <span className="leading-tight">Personal Details</span>
              </Link>

              {/* NEW: Link to Payment Methods (to be implemented securely later) */}
              <Link
                to="/account/payment-methods" // You'll need to create this route and component
                className="flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-[#0A0908] hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center"
              >
                <FiCreditCard size={28} className="mb-2 text-gray-600 group-hover:text-[#D6001A] transition-colors" />
                <span className="leading-tight">Payment Methods</span>
              </Link>

            </div>
          </div>

          {/* Logout Section */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLogout}
              className={`w-full sm:w-auto flex items-center justify-center bg-transparent border-2 border-[${accentRed}] text-[${accentRed}] px-8 py-3 rounded-md text-lg font-semibold
                         hover:bg-[${accentRed}] hover:text-[#F2F4F3] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${accentRed}] group`}
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