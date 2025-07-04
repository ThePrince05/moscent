// src/components/ProductCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Helper component for displaying stars
const StarRating = ({ rating, numReviews, totalStars = 5 }) => {
  const filledStars = Math.round(rating);

  const stars = [];
  for (let i = 0; i < totalStars; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 ${i < filledStars ? 'text-[#D6001A]' : 'text-gray-300'}`} // Filled stars: Accent Red, Empty: Gray
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.838 5.676a1 1 0 00.95.691h5.962c.969 0 1.371 1.24.588 1.81l-4.82 3.504a1 1 0 00-.364 1.118l1.838 5.676c.3.921-.755 1.688-1.538 1.118L10 18.234l-4.82 3.504c-.783.57-1.838-.197-1.538-1.118l1.838-5.676a1 1 0 00-.364-1.118L2.059 11.104c-.783-.57-.381-1.81.588-1.81h5.962a1 1 0 00.95-.691l1.838-5.676z"></path>
      </svg>
    );
  }

  return (
    <div className="flex items-center">
      <div className="flex mr-1">{stars}</div>
      <span className="text-sm text-[#D6001A]">({numReviews})</span> {/* Review count: Accent Red */}
    </div>
  );
};


export default function ProductCard({ product }) {
  // Destructure product properties
  const { id, name, brand, price, image, rating = 0, reviews = 0, discountedPrice, shortDescription, category } = product;

  // Determine if the category is a gender (for special styling of the tag)
  const isGenderCategory = ['men', 'women', 'unisex'].includes(category.toLowerCase());

  // State to manage the favourite status for this specific product
  const [isFavourited, setIsFavourited] = useState(false);

  // Helper function to safely retrieve favourites from local storage
  const getFavourites = () => {
    try {
      // Parse the JSON string from local storage, or default to an empty array
      const favourites = JSON.parse(localStorage.getItem('moScentFavourites')) || [];
      // Use a Set for faster lookups (checking if an ID exists) and to ensure unique IDs
      return new Set(favourites);
    } catch (error) {
      console.error("Error parsing favourites from local storage:", error);
      return new Set(); // Return an empty set on error to prevent crashing
    }
  };

  // Helper function to safely save favourites to local storage
  const saveFavourites = (favouritesSet) => {
    try {
      // Convert the Set back to an Array for JSON stringification
      localStorage.setItem('moScentFavourites', JSON.stringify(Array.from(favouritesSet)));
    } catch (error) {
      console.error("Error saving favourites to local storage:", error);
    }
  };

  // useEffect hook to check and set favourite status when the component mounts
  // or when the product ID changes
  useEffect(() => {
    const favourites = getFavourites();
    if (favourites.has(id)) {
      setIsFavourited(true); // If product ID is found in favourites, set state to true
    } else {
      setIsFavourited(false); // Otherwise, ensure it's false (important for re-renders)
    }
  }, [id]); // Dependency array: Effect re-runs if 'id' changes

  // Event handler for toggling the favourite status
  const handleToggleFavourite = (e) => {
    e.preventDefault(); // Prevent the default action (e.g., navigating if inside a link)
    e.stopPropagation(); // Stop the event from bubbling up to parent elements (like the product link)

    const favourites = getFavourites(); // Get current favourites
    if (isFavourited) {
      favourites.delete(id); // If already favourited, remove it
    } else {
      favourites.add(id); // If not favourited, add it
    }
    saveFavourites(favourites); // Save the updated list back to local storage
    setIsFavourited(!isFavourited); // Toggle the local state for immediate UI update
  };

  return (
    // Product Card Container
    <div className="bg-[#F2F4F3] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"> {/* Card background: Primary Background */}
      {/* Product Image Link Container (relative for absolutely positioned elements) */}
      <Link to={`/product/${id}`} className="block relative h-64 sm:h-72 lg:h-80 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />

        {/* Favourite Button (positioned top-right) */}
        <button
          onClick={handleToggleFavourite}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors duration-200 shadow"
          aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
        >
          {/* SVG for heart icon - dynamically changes fill/stroke and color */}
          <svg
            className={`w-6 h-6 ${isFavourited ? 'text-[#D6001A]' : 'text-[#0A0908] hover:text-gray-700'}`}
            // Dynamically set fill and stroke based on isFavourited
            fill={isFavourited ? 'currentColor' : 'none'}
            stroke={isFavourited ? 'none' : 'currentColor'}
            strokeWidth={isFavourited ? '0' : '2'} // Ensure strokeWidth is 2 for outline
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* More symmetrical heart path (from Material Design "favorite") */}
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {/* Gender Tag (positioned top-left) */}
        {isGenderCategory && ( // Only display if it's a recognized gender category
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-[#0A0908] text-[#F2F4F3] px-3 py-1 rounded-full text-xs font-medium capitalize shadow">
              {category}
            </span>
          </div>
        )}
      </Link>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name with Tooltip for overflow */}
        <div className="relative group min-h-[1.5em] mb-1">
          <h3 className="text-lg font-semibold text-[#0A0908] whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </h3>
          {/* Tooltip content - appears on hover if text overflows */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-xl
                                   bg-[#0A0908] text-[#F2F4F3] text-sm p-2 rounded-md shadow-lg
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50
                                   pointer-events-none">
            {name}
          </div>
        </div>

        {/* Brand Name */}
        <p className="text-sm text-[#0A0908] mb-2">
          {brand}
        </p>

        {/* Short Description with Tooltip for overflow */}
        {shortDescription && (
          <div className="relative group min-h-[2.5em]">
            <p className="text-sm text-gray-600 mb-2 font-serif line-clamp-2">
              {shortDescription}
            </p>
            {/* Tooltip for Short Description */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-sm
                                   bg-[#0A0908] text-[#F2F4F3] text-sm p-2 rounded-md shadow-lg
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50
                                   pointer-events-none">
              {shortDescription}
            </div>
          </div>
        )}

        {/* Star Rating display */}
        {rating > 0 && (
          <div className=" mb-2">
            <StarRating rating={rating} numReviews={reviews} />
          </div>
        )}

        {/* Price and Add to Cart Button */}
        <div className="mt-auto"> {/* mt-auto pushes this div to the bottom */}
          {/* Price Display with Discount */}
          {discountedPrice && discountedPrice < price ? (
            <p className="text-xl font-bold text-[#0A0908] mb-3">
              R{discountedPrice.toFixed(2)}{' '}
              <span className="line-through text-gray-500 text-base font-normal">R{price.toFixed(2)}</span>
            </p>
          ) : (
            <p className="text-xl font-bold text-[#0A0908] mb-3">R{price.toFixed(2)}</p>
          )}
          {/* Add to Cart Button */}
          <button className="w-full bg-[#0A0908] text-[#F2F4F3] py-2 px-4 rounded-md hover:bg-[#D6001A] transition duration-300 text-base font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}