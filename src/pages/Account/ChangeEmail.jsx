import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiEye, FiEyeOff, FiSave, FiArrowLeft } from 'react-icons/fi';

export default function ChangeEmail() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    if (!currentUser) {
      setError("You're not logged in. Please log in first.");
      setLoading(false);
      return;
    }

    if (newEmail !== confirmNewEmail) {
      setError("Your confirmation email doesn't match.");
      setLoading(false);
      return;
    }

    if (newEmail === currentUser.email) {
      setError("This is already your current email.");
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);

      await updateEmail(currentUser, newEmail);
      await sendEmailVerification(currentUser);

      setCurrentPassword('');
      setNewEmail('');
      setConfirmNewEmail('');
      setSuccessMessage(`Email updated to ${newEmail}. You will now be logged out...`);
      setLoading(false);

      // Delay logout to let user see the success message
      setTimeout(async () => {
        await auth.signOut();
        navigate('/auth');
      }, 2000);
    } catch (err) {
      const errorMap = {
        'auth/wrong-password': 'Incorrect current password.',
        'auth/user-mismatch': 'Authentication error. Please log in again.',
        'auth/requires-recent-login': 'Please log out and log back in to update your email.',
        'auth/invalid-email': 'Invalid new email address.',
        'auth/email-already-in-use': 'Email is already in use.',
        'auth/operation-not-allowed': 'Email update is not allowed. Contact support.',
        'auth/network-request-failed': 'Network error. Check your connection.',
      };
      setError(errorMap[err.code] || `Error: ${err.message}`);
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-[#F2F4F3] text-[#0A0908]">
        <p className="text-xl">You're not logged in. Please log in to change your email.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F2F4F3] min-h-[calc(100vh-128px)] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold text-[#0A0908] mb-10 text-center">
          Change Email
        </h1>

        <p className="text-sm text-center text-gray-600 mb-4">
          After changing your email, you'll be logged out and redirected to the login screen.
        </p>

        {error && (
          <p className="text-center text-lg text-red-600 mb-4">{error}</p>
        )}

        {successMessage && (
          <p className="text-center text-lg text-green-600 mb-4">{successMessage}</p>
        )}

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sm:p-8 mb-6">
          <form onSubmit={handleChangeEmail}>
            <div className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => {
                      setError(null);
                      setSuccessMessage(null);
                      setCurrentPassword(e.target.value);
                    }}
                    disabled={loading}
                    required
                    autoComplete="current-password"
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 sm:text-sm shadow-sm focus:ring-[#D6001A] focus:border-[#D6001A]"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    aria-label={passwordVisible ? "Hide password" : "Show password"}
                  >
                    {passwordVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">
                  New Email Address
                </label>
                <input
                  type="email"
                  id="newEmail"
                  value={newEmail}
                  onChange={(e) => {
                    setError(null);
                    setSuccessMessage(null);
                    setNewEmail(e.target.value);
                  }}
                  disabled={loading}
                  required
                  autoComplete="email"
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 sm:text-sm shadow-sm focus:ring-[#D6001A] focus:border-[#D6001A]"
                />
              </div>

              <div>
                <label htmlFor="confirmNewEmail" className="block text-sm font-medium text-gray-700">
                  Confirm New Email
                </label>
                <input
                  type="email"
                  id="confirmNewEmail"
                  value={confirmNewEmail}
                  onChange={(e) => {
                    setError(null);
                    setSuccessMessage(null);
                    setConfirmNewEmail(e.target.value);
                  }}
                  disabled={loading}
                  required
                  autoComplete="email"
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 sm:text-sm shadow-sm focus:ring-[#D6001A] focus:border-[#D6001A]"
                />
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4 mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-8 py-3 rounded-md font-semibold flex items-center justify-center
                  bg-transparent border-2 border-[#D6001A] text-[#D6001A]
                  hover:bg-[#D6001A] hover:text-[#F2F4F3] transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D6001A] group
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Updating...' : (
                  <>
                    <FiSave size={20} className="mr-2 group-hover:text-[#F2F4F3]" />
                    Update Email
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/my-account')}
                disabled={loading}
                className="w-full px-10 py-3 rounded-lg font-semibold flex items-center justify-center
                  bg-gray-100 text-[#0A0908] border border-gray-300
                  hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                <FiArrowLeft size={20} className="mr-2" />
                Back to Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
