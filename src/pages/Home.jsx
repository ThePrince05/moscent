// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import ProductCard from '../components/ProductCard'; // Import your ProductCard
import fragrances from '../data/fragrances'; // Import your fragrance mock data

export default function Home() {
  // Get a selection of featured products (e.g., the first 6)
  const featuredProducts = fragrances.slice(0, 6); // You can adjust this logic later

  return (
    <div className="bg-white min-h-screen">
      {/* Category Header */}
      <nav className="flex justify-center gap-8 py-5 border-b text-xl font-semibold text-gray-800 bg-[#F3F4F4]">
        {/* Changed <a> to <Link> */}
        <Link
          to="/catalog?category=men" // Example: link to catalog with a 'men' category filter
          className="relative px-2 pb-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                     after:bg-gray-900 after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                     hover:after:scale-x-100"
        >
          Men
        </Link>
        <Link
          to="/catalog?category=women" // Example: link to catalog with a 'women' category filter
          className="relative px-2 pb-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                     after:bg-gray-900 after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                     hover:after:scale-x-100"
        >
          Women
        </Link>
        <Link
          to="/catalog?category=brand" // Example: link to catalog with a 'brand' category filter (you might refine this)
          className="relative px-2 pb-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                     after:bg-gray-900 after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                     hover:after:scale-x-100"
        >
          Brand
        </Link>
      </nav>

      {/* Hero Banner */}
      <section className="bg-white py-8 px-4 text-center border-t border-b border-gray-200">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-2">
          FREE SHIPPING NATIONWIDE
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xl mx-auto">
          Buy 20 or more fragrances and we'll cover your shipping.
        </p>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Featured Fragrances
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/catalog"
            className="inline-block bg-gray-900 text-white py-3 px-8 rounded-md text-lg font-medium hover:bg-gray-700 transition duration-300"
          >
            View All Fragrances
          </Link>
        </div>
      </section>

      {/* You can add more sections here, e.g., "About Us", "Latest Blog" etc. */}
    </div>
  );
}