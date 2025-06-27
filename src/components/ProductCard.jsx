// src/components/ProductCard.jsx - REVISED for a clean and professional look
import React from 'react';
// import { Link } from 'react-router-dom'; // Will be used when linking to Product Details Page

export default function ProductCard({ product }) {
  const { id, name, brand, price, image } = product;

  return (
    <div className="
      bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full // Ensure card takes full height for consistent grid
      transition-shadow duration-300 ease-in-out
      hover:shadow-lg // Subtle shadow increase on hover
    ">
      {/* Product Image Container */}
      <div className="w-full h-50 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover" // No hover scale on image for a cleaner look
        />
      </div>

      {/* Product Details & Button Container */}
      <div className="p-4 flex flex-col flex-grow text-center">
        {/* Product Name */}
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">
          {name}
        </h3>
        {/* Brand */}
        <p className="text-sm text-gray-500 mt-1">{brand}</p>
        {/* Price */}
        <p className="text-2xl font-bold text-gray-900 mt-2 mb-4">
          R{price.toFixed(2)} {/* Using a strong gray for price */}
        </p>

        {/* View Details Button - Always visible, pushed to the bottom of the card */}
        <button
          onClick={() => console.log(`Navigating to details for ${name} (ID: ${id})`)}
          className="mt-auto w-full bg-gray-900 text-white py-2 rounded-md font-medium
                     hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                     transition-colors duration-200 ease-in-out"
        >
          View Details
        </button>
      </div>
    </div>
  );
}