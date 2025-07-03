// src/pages/Home.jsx
import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import ProductCard from '../components/ProductCard'; // Import your ProductCard
import fragrances from '../data/fragrances'; // Import your fragrance mock data
import BrandSlider from '../components/BrandSlider'; // Import the BrandSlider component

export default function Home() {
  // Get a selection of featured products (e.g., the first 8-10 to enable scrolling)
  const featuredProducts = fragrances.slice(0, 10); // Increased count to make scrolling more apparent

  // Get a selection of trending products (e.g., the next 5 products)
  // In a real app, this would come from a backend based on popularity/sales
  const trendingProducts = fragrances.slice(10, 15); // Example: Using different slice for trending

  // Create separate refs for each slider
  const featuredScrollContainerRef = useRef(null);
  const trendingScrollContainerRef = useRef(null);

  // Function to handle scrolling left or right for a specific ref
  const scroll = (scrollContainerRef, scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F2F4F3] min-h-screen">
      {/* Category Header */}
      <nav className="flex justify-center gap-8 py-5 border-b text-xl font-semibold text-[#0A0908] bg-[#F2F4F3]">
        <Link
          to="/catalog?category=men" // Example: link to catalog with a 'men' category filter
          className="relative px-3 pt-3 pb-3 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                     after:bg-[#D6001A] after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                     hover:after:scale-x-100"
        >
          Men
        </Link>
        <Link
          to="/catalog?category=women" // Example: link to catalog with a 'women' category filter
          className="relative px-3 pt-3 pb-3 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                     after:bg-[#D6001A] after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                     hover:after:scale-x-100"
        >
          Women
        </Link>
        <Link
          to="/catalog?category=unisex" // CORRECTED: Link to unisex category
          className="relative px-3 pt-3 pb-3 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                     after:bg-[#D6001A] after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                     hover:after:scale-x-100"
        >
          Unisex
        </Link>
      </nav>

    {/* --- Hero Banner --- */}
      {/* Significantly reduced py- values for a more compact hero */}
      <section className="relative py-8 sm:py-12 lg:py-16 bg-[#F2F4F3] text-center flex items-center justify-center">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                        font-extrabold text-[#0A0908] tracking-tight mb-6 font-sans leading-tight">
            Experience More.<br/>
            Experience Mo'Scent.
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl
                        text-[#0A0908] max-w-xl mx-auto font-serif mb-10">
            Discover a world of captivating fragrances designed to define you.
          </p>
          {/* Call-to-Action Button */}
          <Link
            to="/catalog"
            className="inline-block bg-[#D6001A] text-[#F2F4F3] py-4 px-10 rounded-full text-xl font-semibold hover:bg-[#A30013] transition duration-300 shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>
      {/* --- Trending Fragrances Section --- */}
      <section className="py-12 px-0 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl font-bold text-center text-[#0A0908] mb-8 px-4">
          Trending Fragrances
        </h2>

        <div className="relative">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll(trendingScrollContainerRef, -300)} // Scroll left for trending
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
            onClick={() => scroll(trendingScrollContainerRef, 300)} // Scroll right for trending
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

          {/* Horizontal Scroll Container for Trending */}
          <div
            ref={trendingScrollContainerRef} // Attach the trending ref here
            className="
              flex space-x-6 px-4 pb-4 overflow-x-scroll no-scrollbar
              snap-x snap-mandatory scroll-smooth
            "
          >
            {trendingProducts.map((product) => (
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
        </div>
      </section>

      {/* --- Featured Products Section --- */}
      <section className="py-12 px-0 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl font-bold text-center text-[#0A0908] mb-8 px-4">
          Featured Fragrances
        </h2>

        {/* Wrapper for scroll container and arrows */}
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll(featuredScrollContainerRef, -300)} // Scroll left for featured
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
            onClick={() => scroll(featuredScrollContainerRef, 300)} // Scroll right for featured
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

          {/* Horizontal Scroll Container for Featured */}
          <div
            ref={featuredScrollContainerRef} // Attach the featured ref here
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
            className="inline-block bg-[#0A0908] text-[#F2F4F3] py-3 px-8 rounded-md text-lg font-medium hover:bg-[#D6001A] transition duration-300"
          >
            View All Fragrances
          </Link>
        </div>
      </section>

     {/* --- Brand Slider Section --- */}
      {/* Added top and bottom margin for separation */}
      <div className="mt-20 mb-20">
        <h2 className="text-3xl font-bold text-center text-[#0A0908] mb-8 px-4">
          Our Valued Brands
        </h2>
        <BrandSlider />
      </div>

      {/* You can add more sections here, e.g., "About Us", "Latest Blog" etc. */}
    </div>
  );
}