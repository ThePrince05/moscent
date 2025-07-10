// src/utils/phoneFormatters.js

/**
 * Formats a phone number for display with spaces, suitable for South African numbers (0XX XXX XXXX).
 * Can handle numbers with or without a leading country code (+27).
 *
 * @param {string} phoneNumber The phone number string, possibly from storage.
 * @returns {string} The formatted phone number for local display, or original if not a recognized SA pattern.
 */
export const formatPhoneNumberForDisplay = (phoneNumber) => {
    if (!phoneNumber) return '';

    // Remove all non-digit characters for consistent processing
    // Handles +27, 27, or no prefix and leaves only digits
    const digitsOnly = phoneNumber.replace(/^\+?27|^\+?0|\D/g, ''); // Remove +27, 0, or any non-digit

    // Re-add the leading '0' for SA local display if it's 9 digits (after removing prefix)
    if (digitsOnly.length === 9) { // Assumes 9 digits after 0 (e.g., 836451690)
        // Add spaces: 0XX XXX XXXX
        return `0${digitsOnly.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')}`;
    }

    // If it doesn't match the expected 9-digit SA pattern after cleaning,
    // return the original number. This could be for international numbers
    // that aren't +27, or numbers that don't fit the expected SA length.
    return phoneNumber;
};

/**
 * Validates and formats a phone number for consistent international storage (e.g., '+27831234567').
 * Throws an error if the number is invalid based on specified country rules.
 *
 * @param {string} rawPhoneNumber The raw phone number string from the input.
 * @param {string} countryCode The country code (e.g., 'ZA' for South Africa). Default to 'ZA'.
 * @returns {string} The validated and formatted phone number for storage.
 * @throws {Error} If the phone number is invalid according to the rules.
 */
export const formatPhoneNumberForStorage = (rawPhoneNumber, countryCode = 'ZA') => {
    if (!rawPhoneNumber || rawPhoneNumber.trim() === '') {
        throw new Error("Phone number cannot be empty.");
    }

    // Remove all non-digit characters (including any leading '+')
    let digitsOnly = rawPhoneNumber.replace(/\D/g, '');

    // --- South Africa Specific Validation ('ZA') ---
    if (countryCode === 'ZA') {
        // Handle common SA prefixes (+27, 27, 0)
        let processedDigits = digitsOnly;

        if (processedDigits.startsWith('0')) {
            // Remove leading '0' to prepare for +27 prefix
            processedDigits = processedDigits.substring(1);
        } else if (processedDigits.startsWith('27') && processedDigits.length > 2) {
            // Remove leading '27' if it's part of the number, to prepare for consistent +27 prefix
            // Ensure it's more than just '27' to avoid removing actual digits
            processedDigits = processedDigits.substring(2);
        }

        // Now, processedDigits should be the 9-digit number (e.g., "831234567")

        // 1. Check for 9 digits after processing prefixes
        if (processedDigits.length !== 9) {
            throw new Error("South African mobile/landline numbers must be 10 digits long (including the leading '0').");
        }

        // 2. Ensure it consists only of digits after initial processing
        if (!/^\d{9}$/.test(processedDigits)) {
            throw new Error("South African phone numbers must contain only digits.");
        }

        // All checks passed, format to '+27' prefix for storage
        return `+27${processedDigits}`;

    } else {
        // --- Regional/International Fallback (Future Expansion) ---
        // This is where you would add more `if (countryCode === 'US')` or similar blocks.
        // For truly robust international validation, consider a dedicated library like `libphonenumber-js`.

        // Basic generic international validation if no specific countryCode matches
        if (digitsOnly.length < 7 || digitsOnly.length > 15) {
            throw new Error("Invalid phone number length for general international format.");
        }
        // If it already starts with a '+' or a recognized country code, keep it.
        // Otherwise, assume it needs a '+' and return
        // (This is a simplified assumption without full country code mapping)
        if (rawPhoneNumber.startsWith('+')) {
            return rawPhoneNumber; // Assume valid if already has a '+'
        }
        return `+${digitsOnly}`; // Prepend '+' for storage if it's just digits
    }
};