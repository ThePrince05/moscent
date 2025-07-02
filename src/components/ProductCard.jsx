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
  const { id, name, brand, price, image, rating = 0, reviews = 0 } = product;

  return (
    <div className="bg-[#F2F4F3] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"> {/* Card background: Primary Background */}
      {/* Increased image container height again */}
      <Link to={`/product/${id}`} className="block relative h-64 sm:h-72 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-[#0A0908] line-clamp-2"> {/* Product Name: Primary Text */}
          {name}
        </h3>
        <p className="text-sm text-[#0A0908]"> {/* Brand Name: Primary Text */}
          {brand}
        </p>

        {/* Star Rating Display */}
        {rating > 0 && (
          <div className="mt-2 mb-2">
            <StarRating rating={rating} numReviews={reviews} />
          </div>
        )}

        <div className="mt-auto">
          <p className="text-xl font-bold text-[#0A0908] mb-3">R{price.toFixed(2)}</p> {/* Price: Primary Text */}
          <button className="w-full bg-[#0A0908] text-[#F2F4F3] py-2 px-4 rounded-md hover:bg-[#D6001A] transition duration-300 text-base font-medium"> {/* Button: Primary Text background, Primary Background text, Accent Red hover */}
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}