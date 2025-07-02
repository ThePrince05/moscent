// src/pages/Home.jsx
import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import ProductCard from '../components/ProductCard'; // Import your ProductCard
import fragrances from '../data/fragrances'; // Import your fragrance mock data

export default function Home() {
  // Get a selection of featured products (e.g., the first 8-10 to enable scrolling)
  const featuredProducts = fragrances.slice(0, 10); // Increased count to make scrolling more apparent
  const scrollContainerRef = useRef(null);

  // Function to handle scrolling left or right
  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      // scrollBy provides smooth scrolling by default (if scroll-smooth is applied)
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    // Main container uses primary background, but body already sets it.
    // Keeping bg-[#F2F4F3] here for explicit clarity, though it might be redundant if body style applies.
    <div className="bg-[#F2F4F3] min-h-screen">
      {/* Category Header */}
      <nav className="flex justify-center gap-8 py-5 border-b text-xl font-semibold text-[#0A0908] bg-[#F2F4F3]">
        <Link
          to="/catalog?category=men" // Example: link to catalog with a 'men' category filter
          className="relative px-2 pb-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                     after:bg-[#49111C] after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                     hover:after:scale-x-100"
        >
          Men
        </Link>
        <Link
          to="/catalog?category=women" // Example: link to catalog with a 'women' category filter
          className="relative px-2 pb-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                     after:bg-[#49111C] after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                     hover:after:scale-x-100"
        >
          Women
        </Link>
        <Link
          to="/catalog?category=unisex" // CORRECTED: Link to unisex category
          className="relative px-2 pb-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                     after:bg-[#49111C] after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                     hover:after:scale-x-100"
        >
          Unisex
        </Link>
      </nav>

      {/* Hero Banner */}
      <section className="bg-[#F2F4F3] py-8 px-4 text-center border-t border-b border-gray-200">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A0908] tracking-tight mb-2">
          FREE SHIPPING NATIONWIDE
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[#0A0908] max-w-xl mx-auto">
          Buy 20 or more fragrances and we'll cover your shipping.
        </p>
      </section>

      {/* Featured Products Section - With Navigation Arrows */}
      <section className="py-12 px-0 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl font-bold text-center text-[#0A0908] mb-8 px-4">
          Featured Fragrances
        </h2>

        {/* Wrapper for scroll container and arrows */}
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll(-300)} // Scroll left by 300px
            className="
              absolute left-0 top-1/2 -translate-y-1/2 transform
              bg-[#F2F4F3] bg-opacity-75 p-2 rounded-full shadow-md z-10 cursor-pointer
              hidden sm:flex items-center justify-center
              hover:bg-opacity-100 transition-all duration-200 ease-in-out
              ml-2 lg:ml-8
            "
            aria-label="Scroll left"
          >
            {/* Left Arrow SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A0908]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll(300)} // Scroll right by 300px
            className="
              absolute right-0 top-1/2 -translate-y-1/2 transform
              bg-[#F2F4F3] bg-opacity-75 p-2 rounded-full shadow-md z-10 cursor-pointer
              hidden sm:flex items-center justify-center
              hover:bg-opacity-100 transition-all duration-200 ease-in-out
              mr-2 lg:mr-8
            "
            aria-label="Scroll right"
          >
            {/* Right Arrow SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A0908]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef} // Attach the ref here
            className="
              flex space-x-6 px-4 pb-4 overflow-x-scroll no-scrollbar
              snap-x snap-mandatory scroll-smooth
            "
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="
                  flex-shrink-0
                  w-[calc(100vw-8rem)] sm:w-80 md:w-72
                  snap-center
                "
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div> {/* End of new div for scroll area and arrows */}

        <div className="text-center mt-10 px-4">
          <Link
            to="/catalog"
            className="inline-block bg-[#0A0908] text-[#F2F4F3] py-3 px-8 rounded-md text-lg font-medium hover:bg-[#49111C] transition duration-300"
          >
            View All Fragrances
          </Link>
        </div>
      </section>

      {/* You can add more sections here, e.g., "About Us", "Latest Blog" etc. */}
    </div>
  );
}