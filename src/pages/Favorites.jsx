// src/pages/Favorites.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import useFragrances from '../hooks/useFragrances'; // 👈 Custom hook for Firebase fetch

export default function Favorites({ addToCart, toggleFavourite, favoriteProductIds }) {
  const navigate = useNavigate();

  const { fragrances, loading, error } = useFragrances(); // 👈 Now pulling from Firebase
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const primaryBackground = '#F2F4F3';
  const primaryText = '#0A0908';
  const accentRed = '#D6001A';

  useEffect(() => {
    if (!loading && fragrances.length) {
      const filteredProducts = fragrances.filter(product =>
        favoriteProductIds.has(product.id)
      );
      setFavoriteProducts(filteredProducts);
    }
  }, [fragrances, favoriteProductIds, loading]);

  return (
    <div className={`bg-[${primaryBackground}] min-h-screen flex flex-col`}>
      <main className="container mx-auto px-8 md:px-16 lg:px-24 py-8 flex-grow">
        <h1 className={`text-4xl font-bold text-[${primaryText}] mb-8 text-center`}>
          Your Favorites
        </h1>

        {loading && <p className="text-center text-gray-500 text-xl py-10">Loading your favorite fragrances...</p>}
        {error && <p className="text-center text-red-500 text-xl py-10">Error fetching fragrances. Please try again later.</p>}

        {!loading && !error && favoriteProducts.length === 0 ? (
          <p className={`text-xl text-gray-600 text-center py-10`}>
            You haven't added any fragrances to your favorites yet. Browse our{' '}
            <Link to="/catalog" className={`text-[${accentRed}] hover:underline`}>
              catalog
            </Link>
            !
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                toggleFavourite={toggleFavourite}
                isFavouritedInitial={true}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
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
