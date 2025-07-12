// src/pages/Favorites.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import fragrances from '../data/fragrances'; // Your mock data for products
import ProductCard from '../components/ProductCard'; // Assuming this component exists
import Footer from '../components/Footer'; // Keep Footer if it's used elsewhere in your app structure
import { FiArrowLeft } from 'react-icons/fi'; // Import the back arrow icon

// MODIFIED: Accept addToCart, toggleFavourite, and favoriteProductIds as props
export default function Favorites({ addToCart, toggleFavourite, favoriteProductIds }) {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Define color palette based on your project details
  const primaryBackground = '#F2F4F3';
  const primaryText = '#0A0908';
  const accentRed = '#D6001A'; // Added for potential use in button styles, though not directly used in the provided button snippet

  useEffect(() => {
    // MODIFIED: Use the favoriteProductIds prop directly to filter products
    const filteredProducts = fragrances.filter(product => favoriteProductIds.has(product.id));
    setFavoriteProducts(filteredProducts);
  }, [favoriteProductIds]); // MODIFIED: Dependency array now includes favoriteProductIds

  return (
    <div className={`bg-[${primaryBackground}] min-h-screen flex flex-col`}>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className={`text-4xl font-bold text-[${primaryText}] mb-8 text-center`}>Your Favorites</h1>

        {favoriteProducts.length === 0 ? (
          <p className={`text-xl text-gray-600 text-center py-10`}>
            You haven't added any fragrances to your favorites yet. Start browsing our <Link to="/catalog" className={`text-[${accentRed}] hover:underline`}>catalog</Link>! {/* Changed link color for consistency */}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart} // MODIFIED: Pass the actual addToCart prop
                toggleFavourite={toggleFavourite} // MODIFIED: Pass the actual toggleFavourite prop
                isFavouritedInitial={true} // Since it's on the favorites page, it's initially favorited (and will be removed if unfavorited)
              />
            ))}
          </div>
        )}

        {/* Back to Account Button - Added here, typically at the bottom of the main content */}
        <div className="flex justify-center mt-8"> {/* Added margin top for spacing */}
          <button
            type="button"
            onClick={() => navigate('/my-account')}
            className={`w-full sm:w-auto px-10 py-3 rounded-lg font-semibold flex items-center justify-center
                        bg-white text-[${primaryText}] border border-gray-300
                        hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400`}
            aria-label="Back to account details"
          >
            <FiArrowLeft size={20} className="mr-2 flex-shrink-0" /> Back to Account
          </button>
        </div>

      </main>
    </div>
  );
}