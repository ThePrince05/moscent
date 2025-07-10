// src/utils/stringFormatters.js

/**
 * Converts a string to Title Case.
 * Capitalizes the first letter of each word and converts the rest to lowercase.
 *
 * @param {string} str The input string.
 * @returns {string} The title-cased string.
 */
export const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
};