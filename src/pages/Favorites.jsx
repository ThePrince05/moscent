// src/pages/Favorites.jsx
import React, { useState, useEffect } from 'react';
import fragrances from '../data/fragrances'; // Your mock data for products
import ProductCard from '../components/ProductCard'; // Assuming this component exists
import Footer from '../components/Footer';

// MODIFIED: Accept addToCart, toggleFavourite, and favoriteProductIds as props
export default function Favorites({ addToCart, toggleFavourite, favoriteProductIds }) {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  // Define color palette based on your project details
  const primaryBackground = '#F2F4F3';
  const primaryText = '#0A0908';
  // const accentRed = '#D6001A'; // Not directly used in this component for styling, but good to remember

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
            You haven't added any fragrances to your favorites yet. Start browsing our <a href="/catalog" className="text-[#D6001A] hover:underline">catalog</a>! {/* Changed link color for consistency */}
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
      </main>
      <Footer />
    </div>
  );
}