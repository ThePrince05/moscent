import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Auth() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // On mount, check for redirect message from previous page (like ChangeEmail)
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      // Clear it so message doesn't show again on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      if (isLoginView) {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('Login successful! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setIsLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Account created successfully! Please log in.');
        setIsLoginView(true);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      console.error("Authentication error:", err);
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
      }
    } finally {
      setIsLoading(false);
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
      setMessage('Password reset email sent! Check your inbox or spam folder.');
      setEmail('');
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
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary-background min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-lg border border-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-text mb-4">
            {isLoginView ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setError('');
                setMessage('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
              }}
              className="font-medium text-accent-red hover:text-darker-red transition-colors duration-200 focus:outline-none focus:underline"
            >
              {isLoginView ? 'create an account' : 'sign in'}
            </button>
          </p>
        </div>

        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
            role="alert"
          >
            {error}
          </div>
        )}
        {message && (
          <div
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm"
            role="alert"
          >
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleAuthAction}>
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-primary-text
                         focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent sm:text-sm"
            />
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              autoComplete={isLoginView ? 'current-password' : 'new-password'}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-primary-text
                         focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent sm:text-sm pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500"
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            >
              {passwordVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {!isLoginView && (
            <div className="relative">
              <input
                id="confirm-password"
                name="confirm-password"
                type={passwordVisible ? 'text' : 'password'}
                autoComplete="new-password"
                required
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-primary-text
                           focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent sm:text-sm pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500"
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                {passwordVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          )}

          {isLoginView && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-sm font-medium text-accent-red hover:text-darker-red focus:outline-none focus:underline"
                disabled={isLoading}
              >
                Forgot your password?
              </button>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-8 border border-transparent text-lg font-semibold rounded-md text-primary-background bg-accent-red hover:bg-darker-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-red transition-colors duration-200 shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                isLoginView ? 'Sign In' : 'Sign Up'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
