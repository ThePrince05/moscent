// src/pages/Account/ShippingAddresses.jsx
import React, { useState, useEffect } from 'react'; // Added useEffect
import { FiPlus, FiEdit, FiTrash2, FiSave, FiXCircle } from 'react-icons/fi';
import mockAddresses from '../../data/addresses'; // Corrected path
import { formatPhoneNumberForDisplay, formatPhoneNumberForStorage } from '../../utils/phoneFormatters'; // Import formatters

export default function ShippingAddresses() { // Renamed from AccountAddresses to match file name
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'South Africa',
    phoneNumber: '', // This will hold the formatted-for-display value when editing
  });

  // Define your color palette for easy reference
  const offWhite = '#F2F4F3';
  const nearBlack = '#0A0908';
  const accentRed = '#D6001A';

  // useEffect to handle pre-filling form for editing with display format
  useEffect(() => {
    if (editingAddress) {
      setFormData({
        ...editingAddress,
        phoneNumber: formatPhoneNumberForDisplay(editingAddress.phoneNumber) // Format for display
      });
    } else {
      // Reset form for adding new if not editing
      setFormData({
        id: '', fullName: '', addressLine1: '', addressLine2: '', city: '',
        province: '', postalCode: '', country: 'South Africa', phoneNumber: '',
      });
    }
  }, [editingAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Format the phone number for storage BEFORE saving
    const formattedPhoneNumberForStorage = formatPhoneNumberForStorage(formData.phoneNumber);

    if (editingAddress) {
      setAddresses(addresses.map(addr =>
        addr.id === editingAddress.id ? { ...formData, id: addr.id, phoneNumber: formattedPhoneNumberForStorage } : addr
      ));
      setEditingAddress(null);
    } else {
      setAddresses([...addresses, { ...formData, id: `addr${Date.now()}`, phoneNumber: formattedPhoneNumberForStorage }]);
    }
    setShowForm(false);
    // Form will be reset via useEffect when editingAddress is set to null
  };

  const handleEditClick = (address) => {
    setEditingAddress(address); // This will trigger useEffect to pre-fill form
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter(addr => addr.id !== id));
      if (editingAddress && editingAddress.id === id) { // If deleting the one being edited
        setEditingAddress(null);
        setShowForm(false);
      }
    }
  };

  const handleAddAddressClick = () => {
    setEditingAddress(null); // Explicitly clear editing state to trigger form reset via useEffect
    setShowForm(true);
  };

  return (
    <div className="bg-[#F2F4F3] min-h-[calc(100vh-128px)] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#0A0908] mb-10 text-center">
          Shipping Addresses
        </h1>

        {/* Add New Address Button */}
        {!showForm && ( // Only show button if form is not visible
          <div className="flex justify-end mb-6">
            <button
              onClick={handleAddAddressClick}
              className={`flex items-center bg-[${accentRed}] text-[${offWhite}] px-6 py-2 rounded-md font-semibold
                         hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${accentRed}]`}
            >
              <FiPlus className="mr-2" /> Add New Address
            </button>
          </div>
        )}

        {/* Address Form (Conditionally Rendered) */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#0A0908]">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditingAddress(null); }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close form"
              >
                <FiXCircle size={24} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Other form fields remain the same */}
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
              {/* Phone Number Field - Displays formatted, saves international */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number (e.g., 083 123 4567)</label>
                <input
                  type="tel" // Use type="tel" for phone numbers
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber} // This value is what the user types/sees
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

        {/* Display Addresses */}
        {addresses.length === 0 ? (
          <p className="text-center text-xl text-[#0A0908]">You have no saved addresses yet. Click "Add New Address" to get started.</p>
        ) : (
          <div className="space-y-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-[#0A0908]">{address.fullName}</h2>
                    {address.isDefault && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                        Default Address
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-3 mt-3 sm:mt-0">
                    <button
                      onClick={() => handleEditClick(address)}
                      className="text-gray-600 hover:text-[#D6001A] transition-colors duration-200 flex items-center"
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

                {/* Address Details */}
                <div className="text-gray-700 text-base leading-relaxed">
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p>{address.city}, {address.province} {address.postalCode}</p>
                  <p>{address.country}</p>
                  {/* Display the formatted phone number */}
                  {address.phoneNumber && <p>Phone: {formatPhoneNumberForDisplay(address.phoneNumber)}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}