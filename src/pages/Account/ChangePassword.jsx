// src/pages/Account/ChangePassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import { FiEye, FiEyeOff, FiSave, FiArrowLeft } from 'react-icons/fi';

export default function ChangePassword() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    if (!currentUser) {
      setError('No user logged in.');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirmation do not match.');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);

      setSuccessMessage('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      const errorMap = {
        'auth/wrong-password': 'Incorrect current password.',
        'auth/user-mismatch': 'Authentication error. Please log in again.',
        'auth/requires-recent-login': 'Please re-login for security reasons.',
        'auth/weak-password': 'Password too weak.',
      };
      setError(errorMap[err.code] || `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-[#F2F4F3] text-[#0A0908]">
        <p className="text-xl">Please log in to change your password.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F2F4F3] min-h-[calc(100vh-128px)] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#0A0908] mb-8">Change Password</h1>

        {error && <p className="text-center text-red-600 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-center text-green-600 text-sm mb-4">{successMessage}</p>}

        <form onSubmit={handlePasswordChange} className="bg-white p-6 sm:p-8 rounded-lg shadow border border-gray-200 space-y-6">
          {[
            ['Current Password', currentPassword, setCurrentPassword, 'currentPassword'],
            ['New Password', newPassword, setNewPassword, 'newPassword'],
            ['Confirm New Password', confirmNewPassword, setConfirmNewPassword, 'confirmNewPassword'],
          ].map(([label, value, setter, id]) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <div className="relative mt-1">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id={id}
                  name={id}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-[#D6001A] focus:border-[#D6001A] outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                >
                  {passwordVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center space-y-4 pt-4">
           <button
            type="submit"
            disabled={loading}
            className={`w-full px-8 py-3 rounded-md font-semibold flex items-center justify-center
                        bg-transparent border-2 border-[#D6001A] text-[#D6001A]
                        hover:bg-[#D6001A] hover:text-[#F2F4F3] transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D6001A] group
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              'Saving...'
            ) : (
              <>
                <FiSave size={20} className="mr-2 group-hover:text-[#F2F4F3]" /> {/* Added group-hover:text */}
                Change Password
              </>
            )}
          </button>

            <button
              type="button"
              onClick={() => navigate('/my-account')}
              className="w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center
                         bg-gray-100 text-[#0A0908] border border-gray-300 hover:bg-gray-200
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              <FiArrowLeft size={20} className="mr-2" />
              Back to Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
