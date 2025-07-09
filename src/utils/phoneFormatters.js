// src/utils/phoneFormatters.js

/**
 * Converts a phone number from international format (+27 83 645 1690)
 * to a local display format (083 645 1690) for South Africa.
 * Adds spaces for readability.
 * @param {string} phoneNumber - The phone number in international format.
 * @returns {string} The phone number formatted for local display.
 */
export const formatPhoneNumberForDisplay = (phoneNumber) => {
  if (!phoneNumber) return '';
  // Remove '+27' and any non-digits, then add '0' prefix
  let formatted = phoneNumber.replace(/^\+?27|\D/g, ''); // Removes +27 or 27 if at start, and non-digits
  if (formatted.length === 9) { // Assumes 9 digits after 0 (e.g., 836451690)
    // Add spaces: 0XX XXX XXXX
    return `0${formatted.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')}`;
  }
  return phoneNumber; // Return as is if not matching expected SA format
};

/**
 * Converts a phone number from a local display format (083 645 1690)
 * to an international storage format (+27 83 645 1690) for South Africa.
 * Removes spaces before conversion.
 * @param {string} phoneNumber - The phone number in local display format.
 * @returns {string} The phone number formatted for international storage.
 */
export const formatPhoneNumberForStorage = (phoneNumber) => {
  if (!phoneNumber) return '';
  // Remove all non-digit characters
  let digitsOnly = phoneNumber.replace(/\D/g, '');

  // If it starts with '0' (local SA number), convert to +27 format
  if (digitsOnly.startsWith('0') && digitsOnly.length === 10) {
    return `+27${digitsOnly.substring(1)}`;
  }
  // If it's already in an international format (e.g., 27XXXXXXXXX), ensure it has '+'
  if (digitsOnly.startsWith('27') && digitsOnly.length === 11) {
    return `+${digitsOnly}`;
  }
  // Otherwise, return as is (might be an already valid international number or invalid)
  return phoneNumber;
};