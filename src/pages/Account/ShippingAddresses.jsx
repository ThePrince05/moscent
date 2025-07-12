// src/pages/Account/ShippingAddresses.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FiPlus, FiEdit, FiTrash2, FiSave, FiXCircle, FiCheckCircle, FiArrowLeft } from 'react-icons/fi'; // Added FiCheckCircle, FiArrowLeft
import { collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore'; // Added writeBatch
import { db } from '../../firebaseConfig';
import { useAuth } from '../../context/AuthContext';

import { formatPhoneNumberForDisplay, formatPhoneNumberForStorage } from '../../utils/phoneFormatters';
import { toTitleCase } from '../../utils/stringFormatters';

export default function ShippingAddresses() {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Added success message state
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    id: '', // This will hold the Firestore doc ID when editing
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'South Africa',
    phoneNumber: '',
  });

  const offWhite = '#F2F4F3';
  const nearBlack = '#0A0908';
  const accentRed = '#D6001A';

  // --- Firestore Data Fetching (useEffect) ---
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      setError("Please log in to view your addresses.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear messages on fetch

    const addressesCollectionRef = collection(db, 'users', currentUser.uid, 'addresses');

    const unsubscribe = onSnapshot(
      addressesCollectionRef,
      (snapshot) => {
        const fetchedAddresses = snapshot.docs.map(doc => {
          console.log(`DEBUG: Firestore doc ID directly: '${doc.id}'`);
          const addressData = { ...doc.data(), id: doc.id };

          // Apply toTitleCase when fetching for display
          return {
            ...addressData,
            fullName: toTitleCase(addressData.fullName || ''),
            addressLine1: toTitleCase(addressData.addressLine1 || ''),
            addressLine2: toTitleCase(addressData.addressLine2 || ''),
            city: toTitleCase(addressData.city || ''),
            province: toTitleCase(addressData.province || ''),
            country: toTitleCase(addressData.country || 'South Africa'),
            // Ensure isDefault is a boolean, default to false if not present
            isDefault: !!addressData.isDefault // Converts to boolean
          };
        });
        setAddresses(fetchedAddresses);
        setLoading(false);
        console.log("LOG 1: Fetched addresses:", fetchedAddresses);
      },
      (err) => {
        console.error("Error fetching addresses:", err);
        setError("Failed to load addresses. Please try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // --- Form Data Population for Editing (useEffect) ---
  useEffect(() => {
    console.log("LOG 2: editingAddress state updated to:", editingAddress);
    if (editingAddress) {
      setFormData({
        id: editingAddress.id || '',
        fullName: toTitleCase(editingAddress.fullName || ''),
        addressLine1: toTitleCase(editingAddress.addressLine1 || ''),
        addressLine2: toTitleCase(editingAddress.addressLine2 || ''),
        city: toTitleCase(editingAddress.city || ''),
        province: toTitleCase(editingAddress.province || ''),
        postalCode: editingAddress.postalCode || '',
        country: toTitleCase(editingAddress.country || 'South Africa'),
        phoneNumber: formatPhoneNumberForDisplay(editingAddress.phoneNumber || ''),
      });
      console.log("LOG 3: formData set for editing:", {
        ...editingAddress,
        fullName: toTitleCase(editingAddress.fullName || ''),
        addressLine1: toTitleCase(editingAddress.addressLine1 || ''),
        addressLine2: toTitleCase(editingAddress.addressLine2 || ''),
        city: toTitleCase(editingAddress.city || ''),
        province: toTitleCase(editingAddress.province || ''),
        country: toTitleCase(editingAddress.country || 'South Africa'),
        phoneNumber: formatPhoneNumberForDisplay(editingAddress.phoneNumber || '')
      });
    } else {
      setFormData({
        id: '', fullName: '', addressLine1: '', addressLine2: '', city: '',
        province: '', postalCode: '', country: 'South Africa', phoneNumber: '',
      });
      console.log("LOG 4: formData reset for new address.");
    }
    setError(null); // Clear form-related errors when opening/resetting form
    setSuccessMessage(null); // Clear success message when opening/resetting form
  }, [editingAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (['fullName', 'addressLine1', 'addressLine2', 'city', 'province', 'country'].includes(name)) {
      newValue = toTitleCase(value);
    }
    if (name === "phoneNumber") {
      setError(null);
    }
    setFormData({ ...formData, [name]: newValue });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError("You must be logged in to save addresses.");
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
      // Create a temporary object to send to Firestore, excluding the 'id'
      const dataToSave = {
        fullName: toTitleCase(formData.fullName),
        addressLine1: toTitleCase(formData.addressLine1),
        addressLine2: toTitleCase(formData.addressLine2),
        city: toTitleCase(formData.city),
        province: toTitleCase(formData.province),
        postalCode: formData.postalCode,
        country: toTitleCase(formData.country),
        phoneNumber: formattedPhoneNumberForStorage,
      };

      if (editingAddress) {
        console.log("LOG 5: In handleFormSubmit (editing mode). Current formData.id:", formData.id);
        if (!formData.id) {
          throw new Error("Address ID is missing for update operation in form data.");
        }
        const addressDocRef = doc(db, 'users', currentUser.uid, 'addresses', formData.id);
        await updateDoc(addressDocRef, dataToSave);
        setSuccessMessage("Address updated successfully!");
        console.log("LOG 6: Address updated successfully with ID:", formData.id);
      } else {
        const addressesCollectionRef = collection(db, 'users', currentUser.uid, 'addresses');

        // Determine if this is the first address being added
        const isFirstAddress = addresses.length === 0;
        if (isFirstAddress) {
          dataToSave.isDefault = true; // Set as default if it's the first address
        } else {
          dataToSave.isDefault = false; // New addresses are not default unless first
        }

        const newDocRef = await addDoc(addressesCollectionRef, dataToSave);
        setSuccessMessage("New address added successfully!");
        console.log("LOG 6: New address added with ID:", newDocRef.id);
      }
      setShowForm(false);
      setEditingAddress(null);
    } catch (err) {
      console.error("Error saving address:", err);
      setError(`Failed to save address: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- New Function: handleSetDefault ---
  const handleSetDefault = async (addressToSetDefault) => {
    if (!currentUser) {
      setError("You must be logged in to set a default address.");
      return;
    }
    if (addressToSetDefault.isDefault) {
      setSuccessMessage("This address is already your default.");
      return; // Already default, no action needed
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const batch = writeBatch(db);
    const addressesCollectionRef = collection(db, 'users', currentUser.uid, 'addresses');

    try {
      // 1. Find the current default address and set its isDefault to false
      const currentDefaultAddress = addresses.find(addr => addr.isDefault);
      if (currentDefaultAddress && currentDefaultAddress.id !== addressToSetDefault.id) {
        const currentDefaultDocRef = doc(addressesCollectionRef, currentDefaultAddress.id);
        batch.update(currentDefaultDocRef, { isDefault: false });
        console.log(`Setting old default address (${currentDefaultAddress.id}) to not default.`);
      }

      // 2. Set the new address's isDefault to true
      const newDefaultDocRef = doc(addressesCollectionRef, addressToSetDefault.id);
      batch.update(newDefaultDocRef, { isDefault: true });
      console.log(`Setting new default address (${addressToSetDefault.id}) to default.`);

      // Commit the batch
      await batch.commit();
      setSuccessMessage("Default address updated successfully!");
      console.log("Batch update for default address committed.");
    } catch (err) {
      console.error("Error setting default address:", err);
      setError(`Failed to set default address: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  const handleEditClick = (address) => {
    console.log("LOG 7: handleEditClick called with address:", address);
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    if (!currentUser) {
      setError("You must be logged in to delete addresses.");
      return;
    }
    if (!id) {
      setError("Error: Address ID is missing for deletion.");
      return;
    }

    // IMPORTANT: Replace window.confirm with a custom modal for better UX and consistency
    if (window.confirm("Are you sure you want to delete this address?")) {
      setLoading(true);
      setError(null);
      setSuccessMessage(null); // Clear success message on delete attempt
      try {
        const addressDocRef = doc(db, 'users', currentUser.uid, 'addresses', id);
        await deleteDoc(addressDocRef);
        setSuccessMessage("Address deleted successfully!");
        console.log("LOG 8: Address deleted successfully with ID:", id);
        if (editingAddress && editingAddress.id === id) {
          setEditingAddress(null);
          setShowForm(false);
        }
      } catch (err) {
        console.error("Error deleting address:", err);
        setError(`Failed to delete address: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddAddressClick = () => {
    setEditingAddress(null);
    setShowForm(true);
    console.log("LOG 9: Add New Address button clicked.");
  };

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-[#F2F4F3] text-[#0A0908]">
        <p className="text-xl">Please log in to manage your addresses.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F2F4F3] min-h-[calc(100vh-128px)] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#0A0908] mb-10 text-center">
          Shipping Addresses
        </h1>

        {loading && (
          <p className="text-center text-lg text-gray-700 mb-4">Loading addresses...</p>
        )}

        {error && (
          <p className="text-center text-lg text-red-600 mb-4">{error}</p>
        )}

        {successMessage && (
          <p className="text-center text-lg text-green-600 mb-4">{successMessage}</p>
        )}

        {!loading && !error && !showForm && (
          <div className="flex justify-end mb-6">
           <button
            onClick={handleAddAddressClick}
            className={`w-full sm:w-auto flex items-center justify-center bg-transparent border-2 border-[#D6001A] text-[#D6001A] px-8 py-3 rounded-md text-lg font-semibold
                        hover:bg-[#D6001A] hover:text-[#F2F4F3] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D6001A] group`}
          >
            <FiPlus size={20} className="mr-2 group-hover:text-[#F2F4F3]" /> Add New Address
          </button>
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#0A0908]">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditingAddress(null); setError(null); setSuccessMessage(null); }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close form"
              >
                <FiXCircle size={24} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D6001A] focus:border-[#D6001A] sm:text-sm" />
              </div>
              <div>
                <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
                <input type="text" id="addressLine1" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D6001A] focus:border-[#D6001A] sm:text-sm" />
              </div>
              <div>
                <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address Line 2 (Optional)</label>
                <input type="text" id="addressLine2" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D6001A] focus:border-[#D6001A] sm:text-sm" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D6001A] focus:border-[#D6001A] sm:text-sm" />
              </div>
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
                <input type="text" id="province" name="province" value={formData.province} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D6001A] focus:border-[#D6001A] sm:text-sm" />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D6001A] focus:border-[#D6001A] sm:text-sm" />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D6001A] focus:border-[#D6001A] sm:text-sm" />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number (e.g., 083 123 4567)</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D6001A] focus:border-[#D6001A] sm:text-sm"
                />
              </div>
              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  className={`flex items-center bg-[${accentRed}] text-[${offWhite}] px-6 py-2 rounded-md font-semibold
                               hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${accentRed}]`}
                >
                  <FiSave className="mr-2" /> {editingAddress ? 'Save Changes' : 'Add Address'}
                </button>
              </div>
            </form>
          </div>
        )}

        {addresses.length === 0 && !loading && !error && !showForm ? (
          <p className="text-center text-xl text-[#0A0908]">You have no saved addresses yet. Click "Add New Address" to get started.</p>
        ) : (
          <div className="space-y-6">
            {!loading && addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-[#0A0908]">{address.fullName}</h2>
                    {address.isDefault && (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1`}>
                        <FiCheckCircle className="mr-1" /> Default Address
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-3 mt-3 sm:mt-0">
                    {!address.isDefault && ( // Only show "Set as Default" if it's not already the default
                      <button
                        onClick={() => handleSetDefault(address)}
                        className={`text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center`}
                        aria-label="Set as default address"
                      >
                        <FiCheckCircle size={18} className="mr-1" /> Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleEditClick(address)}
                      className={`text-gray-600 hover:text-[${accentRed}] transition-colors duration-200 flex items-center`}
                      aria-label="Edit address"
                    >
                      <FiEdit size={18} className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(address.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 flex items-center"
                      aria-label="Delete address"
                    >
                      <FiTrash2 size={18} className="mr-1" /> Delete
                    </button>
                  </div>
                </div>

                <div className="text-gray-700 text-base leading-relaxed">
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p>{address.city}, {address.province} {address.postalCode}</p>
                  <p>{address.country}</p>
                  {address.phoneNumber && <p>Phone: {formatPhoneNumberForDisplay(address.phoneNumber)}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Account Button - Added here */}
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => navigate('/my-account')}
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