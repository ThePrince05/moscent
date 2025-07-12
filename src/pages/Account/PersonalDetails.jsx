// src/pages/Account/PersonalDetails.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { FiSave, FiXCircle, FiArrowLeft } from 'react-icons/fi'; // Import FiArrowLeft
import { formatPhoneNumberForDisplay, formatPhoneNumberForStorage } from '../../utils/phoneFormatters';
import { toTitleCase } from '../../utils/stringFormatters';

export default function PersonalDetails() {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const [initialLoadedData, setInitialLoadedData] = useState({});

  const offWhite = '#F2F4F3';
  const nearBlack = '#0A0908';
  const accentRed = '#D6001A';

  // --- Firestore Data Fetching (useEffect) ---
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      setError("Please log in to view your personal details.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const userDocRef = doc(db, 'users', currentUser.uid);

    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnapshot) => {
        let userData = {};
        if (docSnapshot.exists()) {
          userData = docSnapshot.data();
          console.log("Fetched user data:", userData);
        } else {
          console.log("No personal details found for this user. Initializing with empty fields.");
        }

        const loadedPhoneNumber = formatPhoneNumberForDisplay(userData.phoneNumber || '');
        const loadedData = {
          // Apply toTitleCase when loading data from Firestore for display
          firstName: toTitleCase(userData.firstName || ''),
          lastName: toTitleCase(userData.lastName || ''),
          phoneNumber: loadedPhoneNumber,
        };

        setFormData(loadedData);
        setInitialLoadedData(loadedData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching personal details:", err);
        setError("Failed to load personal details. Please try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // --- Input Change Handler ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Apply title case only to firstName and lastName
    if (name === 'firstName' || name === 'lastName') {
      newValue = toTitleCase(value);
    }

    setFormData({ ...formData, [name]: newValue });
    setError(null);
    setSuccessMessage(null);
  };

  // --- Form Submission Handler ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError("You must be logged in to update personal details.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    let formattedPhoneNumberForStorage;
    try {
      formattedPhoneNumberForStorage = formatPhoneNumberForStorage(formData.phoneNumber, 'ZA');
    } catch (phoneError) {
      setError(`Phone Number Error: ${phoneError.message}`);
      setLoading(false);
      return;
    }

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);

      // Prepare data to send to Firestore - ensure firstName and lastName are title-cased before saving
      const dataToUpdate = {
        firstName: toTitleCase(formData.firstName), // Ensure final save is title cased
        lastName: toTitleCase(formData.lastName),    // Ensure final save is title cased
        phoneNumber: formattedPhoneNumberForStorage,
        email: currentUser.email,
        lastUpdated: new Date(),
      };

      await setDoc(userDocRef, dataToUpdate, { merge: true });

      setSuccessMessage("Personal details updated successfully!");
      setIsEditing(false);
      setInitialLoadedData(formData);
      console.log("Personal details updated/created in Firestore:", dataToUpdate);
    } catch (err) {
      console.error("Error updating personal details:", err);
      setError(`Failed to update personal details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Handle Cancel Edit ---
  const handleCancelEdit = () => {
    setFormData(initialLoadedData);
    setIsEditing(false);
    setError(null);
    setSuccessMessage(null);
  };

  // --- Render Logic ---
  if (!currentUser) {
    return (
      <div className={`min-h-[calc(100vh-128px)] flex items-center justify-center bg-[${offWhite}] text-[${nearBlack}]`}>
        <p className="text-xl">Please log in to view your personal details.</p>
      </div>
    );
  }

  return (
    <div className={`bg-[${offWhite}] min-h-[calc(100vh-128px)] py-8 px-4 sm:px-6 lg:px-8 font-sans`}>
      <div className="max-w-xl mx-auto">
        <h1 className={`text-4xl font-extrabold text-[${nearBlack}] mb-10 text-center`}>
          Personal Details
        </h1>

        {loading && (
          <p className="text-center text-lg text-gray-700 mb-4">Loading personal details...</p>
        )}

        {error && (
          <p className="text-center text-lg text-red-600 mb-4">{error}</p>
        )}

        {successMessage && (
          <p className="text-center text-lg text-green-600 mb-4">{successMessage}</p>
        )}

        {!loading && (
          <div className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8 mb-6`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-semibold text-[${nearBlack}]`}>
                {isEditing ? 'Edit Your Details' : 'Your Information'}
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className={`px-4 py-2 rounded-md font-semibold text-[${accentRed}] border border-[${accentRed}]
                               hover:bg-[${accentRed}] hover:text-[${offWhite}] transition-colors duration-200`}
                  aria-label="Edit personal details"
                >
                  Edit
                </button>
              )}
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="space-y-4">
                {/* Email (Read-only as it's from Firebase Auth) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={currentUser.email || ''}
                    readOnly
                    disabled
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-600 cursor-not-allowed sm:text-sm`}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    To change your email, please use the "Change Email" section. {/* This line should be updated in a later step */}
                  </p>
                </div>

                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    disabled={!isEditing}
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm
                                 ${isEditing ? `focus:outline-none focus:ring-[${accentRed}] focus:border-[${accentRed}]` : 'bg-gray-100 text-gray-600 cursor-not-allowed'}`}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    disabled={!isEditing}
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm
                                 ${isEditing ? `focus:outline-none focus:ring-[${accentRed}] focus:border-[${accentRed}]` : 'bg-gray-100 text-gray-600 cursor-not-allowed'}`}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number (e.g., 083 123 4567)</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm
                                 ${isEditing ? `focus:outline-none focus:ring-[${accentRed}] focus:border-[${accentRed}]` : 'bg-gray-100 text-gray-600 cursor-not-allowed'}`}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className={`flex items-center bg-gray-300 text-[${nearBlack}] px-6 py-2 rounded-md font-semibold
                                 hover:bg-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                    aria-label="Cancel changes"
                  >
                    <FiXCircle className="mr-2" /> Cancel
                  </button>
                  <button
                    type="submit"
                    className={`flex items-center bg-[${accentRed}] text-[${offWhite}] px-6 py-2 rounded-md font-semibold
                                 hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${accentRed}]`}
                    aria-label="Save changes"
                  >
                    <FiSave className="mr-2" /> Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Back to Account Button - Added here */}
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => navigate('/my-account')} // Ensure this navigates to /my-account
            className={`w-full sm:w-auto px-10 py-3 rounded-lg font-semibold flex items-center justify-center
                        bg-white text-[${nearBlack}] border border-gray-300
                        hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400`}
            aria-label="Back to account details"
          >
            <FiArrowLeft size={20} className="mr-2 flex-shrink-0" /> Back to Account
          </button>
        </div>

      </div>
    </div>
  );
}