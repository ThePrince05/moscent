// src/pages/Product.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fragrances from '../data/fragrances'; // Your mock data
import Footer from '../components/Footer';
import { FaShoppingCart } from 'react-icons/fa'; // Import FaShoppingCart for the icon
import { FiHeart } from 'react-icons/fi'; // Import FiHeart for the heart icon

// Helper component for displaying stars - copied directly from ProductCard for consistency
const StarRating = ({ rating, numReviews, totalStars = 5 }) => {
  const filledStars = Math.round(rating); // Round to nearest whole star for display

  const stars = [];
  // Define your color palette for consistency in the helper component
  const accentRed = '#D6001A';

  for (let i = 0; i < totalStars; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-5 h-5 ${i < filledStars ? `text-[${accentRed}]` : 'text-gray-300'}`} // Filled stars: Accent Red, Empty: Gray
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.838 5.676a1 1 0 00.95.691h5.962c.969 0 1.371 1.24.588 1.81l-4.82 3.504a1 1 0 00-.364 1.118l1.838 5.676c.3.921-.755 1.688-1.538 1.118L10 18.234l-4.82 3.504c-.783.57-1.838-.197-1.538-1.118l1.838-5.676a1 1 0 00-.364-1.118L2.059 11.104c-.783-.57-.381-1.81.588-1.81h5.962a1 1 0 00.95-.691l1.838-5.676z"></path>
      </svg>
    );
  }

  return (
    <div className="flex items-center">
      <div className="flex mr-2">{stars}</div>
      <span className="text-lg text-[#D6001A]">({numReviews} reviews)</span>
    </div>
  );
};


// Receive addToCart, toggleFavourite, and favoriteProductIds props
export default function Product({ addToCart, toggleFavourite, favoriteProductIds }) { // MODIFIED: Added toggleFavourite and favoriteProductIds
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  // Removed local isFavourited state, it's now derived from favoriteProductIds
  // const [isFavourited, setIsFavourited] = useState(false); // REMOVED

  const primaryBackground = '#F2F4F3';
  const primaryText = '#0A0908';
  const accentRed = '#D6001A';

  // Removed getFavourites and saveFavourites as they are now handled in App.jsx

  useEffect(() => {
    const foundProduct = fragrances.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.availableSizes && foundProduct.availableSizes.length > 0) {
        setSelectedSize(foundProduct.availableSizes[0]);
      } else {
        setSelectedSize(null); // Ensure selectedSize is null if no sizes are available
      }
      // isFavourited is now derived directly from favoriteProductIds prop
    } else {
      console.warn(`Product with ID ${id} not found.`);
      navigate('/catalog');
    }
  }, [id, navigate, favoriteProductIds]); // MODIFIED: Added favoriteProductIds to dependency array

  // Determine isFavourited status from the prop
  const isFavourited = product ? favoriteProductIds.has(product.id) : false;

  const handleToggleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) { // Ensure product is loaded before toggling
      toggleFavourite(product.id); // MODIFIED: Call the prop function
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity('');
    }
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity === '' ? 1 : prevQuantity + 1));
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Modified handleAddToCart to use the prop
  const handleAddToCart = () => {
    if (product && quantity >= 1 && (product.availableSizes ? selectedSize : true)) {
      // Pass the product, selected quantity, and selected size
      addToCart(product, quantity, selectedSize);
      alert(`${quantity} x "${product.name}"${selectedSize ? ` (${selectedSize}ml)` : ''} added to cart!`);
    } else {
      alert("Please select a valid quantity and size (if applicable).");
    }
  };

  if (!product) {
    return (
      <div className={`bg-[${primaryBackground}] min-h-screen flex items-center justify-center`}>
        <p className={`text-xl text-[${primaryText}]`}>Loading product details...</p>
      </div>
    );
  }

  const isGenderCategory = ['men', 'women', 'unisex'].includes(product.category.toLowerCase());

  return (
    <div className={`bg-[${primaryBackground}] min-h-screen flex flex-col`}>
      {/* Header is rendered by App.jsx, not directly within pages in your current setup */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:flex">
          <div className="md:w-1/2 p-6 flex items-center justify-center bg-white rounded-l-xl relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-sm md:max-w-md h-auto rounded-lg object-contain transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/400x400/${primaryBackground.substring(1)}/${primaryText.substring(1)}?text=Image+Not+Found`;
              }}
            />

            {isGenderCategory && (
              <div className="absolute top-2 left-2 z-10 mt-1">
                <span className={`bg-[${primaryText}] text-[${primaryBackground}] px-4 py-2 rounded-full text-sm font-medium capitalize shadow`}>
                  {product.category}
                </span>
              </div>
            )}
          </div>

          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className={`text-4xl sm:text-5xl font-extrabold text-[${primaryText}] mb-2 leading-tight`}>
              {product.name}
            </h1>
            <p className="text-xl text-gray-600 mb-2 font-semibold">{product.brand}</p>

            {product.rating > 0 && (
              <div className="mb-4">
                <StarRating rating={product.rating} numReviews={product.reviews} />
              </div>
            )}

            <div className="mb-6 flex items-baseline">
              {product.discountedPrice ? (
                <>
                  <span className={`text-4xl font-bold text-[${accentRed}] mr-3`}>
                    R{product.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl text-gray-500 line-through">
                    R{product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className={`text-4xl font-bold text-[${primaryText}]`}>
                  R{product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {product.longDescription || product.shortDescription || "No detailed description available."}
            </p>

            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="mb-6">
                <label htmlFor="size" className="block text-gray-700 text-base font-medium mb-2">
                  Select Size:
                </label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className={`block w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[${accentRed}] text-[${primaryText}] bg-white`}
                >
                  {product.availableSizes.map(size => (
                    <option key={size} value={size}>{size}ml</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-8">
              <label htmlFor="quantity" className="block text-gray-700 text-base font-medium mb-2">
                Quantity:
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={decrementQuantity}
                  className={`bg-gray-200 text-[${primaryText}] w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400`}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className={`w-16 text-center border border-gray-300 rounded-md py-2 pl-3 text-lg font-semibold text-[${primaryText}] focus:outline-none focus:ring-2 focus:ring-[${accentRed}]`}
                />
                <button
                  onClick={incrementQuantity}
                  className={`bg-gray-200 text-[${primaryText}] w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400`}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
                <button
                    onClick={handleAddToCart}
                    className={`flex-grow bg-[${accentRed}] text-[${primaryBackground}] px-6 py-4 rounded-full text-xl font-bold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[${accentRed}]/50
                        ${(product.availableSizes && !selectedSize) || quantity < 1 ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={(product.availableSizes && !selectedSize) || quantity < 1} // Disable if no size selected or quantity is invalid
                >
                    <FaShoppingCart className="inline-block mr-2 text-2xl" /> Add to Cart ({quantity})
                </button>

                <button
                    onClick={handleToggleFavourite}
                    className="flex-shrink-0 p-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 shadow-md"
                    aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
                >
                    {/* Replaced inline SVG with FiHeart icon for consistency */}
                    <FiHeart
                      className={`w-8 h-8 ${isFavourited ? `text-[${accentRed}] fill-current` : `text-[${primaryText}] hover:text-gray-700`}`}
                    />
                </button>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}