import React from 'react';
import { Link } from 'react-router-dom';

// Helper component for displaying stars
const StarRating = ({ rating, numReviews, totalStars = 5 }) => {
  const filledStars = Math.round(rating);

  const stars = [];
  for (let i = 0; i < totalStars; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 ${i < filledStars ? 'text-[#E00000]' : 'text-gray-300'}`} // Filled stars: Slightly Darker Red, Empty: Gray
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
      <span className="text-sm text-[#E00000]">({numReviews})</span> {/* Review count: Slightly Darker Red */}
    </div>
  );
};


export default function ProductCard({ product }) {
  // Destructure discountedPrice and shortDescription
  const { id, name, brand, price, image, rating = 0, reviews = 0, discountedPrice, shortDescription, category } = product; // Destructure 'category'

  // Determine if the category is a gender (for special styling)
  const isGenderCategory = ['men', 'women', 'unisex'].includes(category.toLowerCase());

  return (
    // IMPORTANT: Removed 'overflow-hidden' from this main div
    <div className="bg-[#F2F4F3] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"> {/* Card background: Primary Background */}
      {/* Image container: now relative to position the tag */}
      <Link to={`/product/${id}`} className="block relative h-64 sm:h-72 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
        {/* --- Gender Tag Added to Image Corner --- */}
        {isGenderCategory && ( // Only display if it's a gender category
          <div className="absolute top-2 right-2 z-10"> {/* Positioned top-right */}
            <span className="bg-[#0A0908] text-[#F2F4F3] px-3 py-1 rounded-full text-xs font-medium capitalize shadow">
              {category}
            </span>
          </div>
        )}
        {/* --- End Gender Tag --- */}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name with Tooltip */}
        <div className="relative group min-h-[1.5em] mb-1"> {/* min-h to prevent layout shift if name is short */}
          <h3 className="text-lg font-semibold text-[#0A0908] whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </h3>
          {/* Tooltip content - only appears on hover if text overflows via CSS */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-xl
                                   bg-[#0A0908] text-[#F2F4F3] text-sm p-2 rounded-md shadow-lg
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50
                                   pointer-events-none"> {/* pointer-events-none makes it clickable through until visible */}
            {name}
          </div>
        </div>

        {/* Brand Name: Adjusted to mb-2 for slightly more space */}
        <p className="text-sm text-[#0A0908] mb-2">
          {brand}
        </p>

        {/* Short Description with Tooltip */}
        {shortDescription && (
          <div className="relative group min-h-[2.5em]"> {/* Adjusted min-h for 2 lines of text */}
            <p className="text-sm text-gray-600 mb-2 font-serif line-clamp-2">
              {shortDescription}
            </p>
            {/* Tooltip for Short Description - Changed max-w-xl to max-w-md */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-sm
                                   bg-[#0A0908] text-[#F2F4F3] text-sm p-2 rounded-md shadow-lg
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50
                                   pointer-events-none">
              {shortDescription}
            </div>
          </div>
        )}

        {rating > 0 && (
          <div className=" mb-2">
            <StarRating rating={rating} numReviews={reviews} />
          </div>
        )}

        <div className="mt-auto">
          {/* Price Display with Discount */}
          {discountedPrice && discountedPrice < price ? (
            <p className="text-xl font-bold text-[#0A0908] mb-3">
              {/* NEW PRICE FIRST, THEN OLD PRICE */}
              R{discountedPrice.toFixed(2)}{' '} {/* Add a space here */}
              <span className="line-through text-gray-500 text-base font-normal">R{price.toFixed(2)}</span>
            </p>
          ) : (
            <p className="text-xl font-bold text-[#0A0908] mb-3">R{price.toFixed(2)}</p>
          )}
          <button className="w-full bg-[#0A0908] text-[#F2F4F3] py-2 px-4 rounded-md hover:bg-[#D6001A] transition duration-300 text-base font-medium"> {/* Button: Primary Text background, Primary Background text, Accent Red hover */}
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}