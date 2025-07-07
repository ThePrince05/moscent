// src/pages/Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Import the auth instance from your Firebase config
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail // Added for future password reset functionality
} from 'firebase/auth';

export default function Auth() {
  const [isLoginView, setIsLoginView] = useState(true); // State to toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For signup
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // For success messages or password reset info
  const [isLoading, setIsLoading] = useState(false); // To manage loading state during Firebase calls

  const navigate = useNavigate();

  // Define your color palette for easy reference
  const primaryBackground = '#F2F4F3';
  const primaryText = '#0A0908';
  const accentRed = '#D6001A';

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setMessage(''); // Clear previous messages
    setIsLoading(true); // Start loading

    try {
      if (isLoginView) {
        // Login Logic
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('Login successful! Redirecting...');
        // Redirect to home or a dashboard after successful login
        navigate('/');
      } else {
        // Signup Logic
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setIsLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Account created successfully! Please log in.');
        // Optionally switch to login view after successful signup
        setIsLoginView(true);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      console.error("Authentication error:", err);
      // Firebase error codes for user-friendly messages
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email address format.');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password.');
          break;
        case 'auth/email-already-in-use':
          setError('This email is already in use. Try logging in.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection.');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
          break;
      }
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      console.error("Password reset error:", err);
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/user-not-found':
          setError('No user found with that email.');
          break;
        default:
          setError('Failed to send password reset email. Please try again.');
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={`bg-[${primaryBackground}] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg border border-gray-200">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold text-[${primaryText}]`}>
            {isLoginView ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setError(''); // Clear errors when toggling view
                setMessage(''); // Clear messages
                setEmail('');
                setPassword('');
                setConfirmPassword('');
              }}
              className={`font-medium text-[${accentRed}] hover:text-red-700`}
            >
              {isLoginView ? 'create an account' : 'sign in'}
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleAuthAction}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[${primaryText}] rounded-t-md focus:outline-none focus:ring-[${accentRed}] focus:border-[${accentRed}] focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLoginView ? "current-password" : "new-password"}
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[${primaryText}] ${isLoginView ? 'rounded-b-md' : ''} focus:outline-none focus:ring-[${accentRed}] focus:border-[${accentRed}] focus:z-10 sm:text-sm mt-[-1px]`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLoginView && (
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[${primaryText}] rounded-b-md focus:outline-none focus:ring-[${accentRed}] focus:border-[${accentRed}] focus:z-10 sm:text-sm mt-[-1px]`}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          {isLoginView && (
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <button
                  type="button" // Use type="button" to prevent form submission
                  onClick={handlePasswordReset}
                  className={`font-medium text-[${accentRed}] hover:text-red-700`}
                  disabled={isLoading}
                >
                  Forgot your password?
                </button>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[${primaryBackground}] bg-[${accentRed}] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${accentRed}] transition-colors duration-200`}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                isLoginView ? 'Sign in' : 'Sign up'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}