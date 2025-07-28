// src/pages/Home.jsx
import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import ProductCard from '../components/ProductCard'; // Import your ProductCard
import useFragrances from '../hooks/useFragrances';
import BrandSlider from '../components/BrandSlider'; // Import the BrandSlider component

// MODIFIED: Accept addToCart, toggleFavourite, and favoriteProductIds as props
export default function Home({ addToCart, toggleFavourite, favoriteProductIds }) {
  

  const trendingScrollContainerRef = useRef(null);
  const saleScrollContainerRef = useRef(null);
  const { fragrances, loading, error } = useFragrances();

  if (loading) return <div className="text-center py-20">Loading fragrances…</div>;
  if (error) return <div className="text-center py-20 text-red-600">Failed to load fragrances.</div>;

  const trendingProducts = fragrances.slice(10, 15);

  const scroll = (scrollContainerRef, scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const onSaleProducts = fragrances.filter(product =>
       product.discountedPrice && product.discountedPrice < product.price
    );

  return (
    <div className="bg-[#F2F4F3] min-h-screen">
      {/* Category Header */}
      <nav className="flex justify-center gap-8 py-5 border-b text-xl font-semibold text-[#0A0908] bg-[#F2F4F3]">
        <Link
          to="/catalog?category=men"
          className="relative px-3 pt-3 pb-3 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                     after:bg-[#D6001A] after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                     hover:after:scale-x-100"
        >
          Men
        </Link>
        <Link
          to="/catalog?category=women"
          className="relative px-3 pt-3 pb-3 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                     after:bg-[#D6001A] after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                     hover:after:scale-x-100"
        >
          Women
        </Link>
        <Link
          to="/catalog?category=unisex"
          className="relative px-3 pt-3 pb-3 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                     after:bg-[#D6001A] after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                     hover:after:scale-x-100"
        >
          Unisex
        </Link>
      </nav>

      {/* --- Hero Banner --- */}
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl font-bold text-center text-[#0A0908] mb-8 px-4">
          Trending Fragrances
        </h2>

        <div className="relative">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll(trendingScrollContainerRef, -300)}
            className="
              absolute left-0 top-1/2 -translate-y-1/2 transform
              bg-[#F2F4F3] bg-opacity-75 p-2 rounded-full shadow-md z-10 cursor-pointer
              hidden sm:flex items-center justify-center
              hover:bg-opacity-100 transition-all duration-200 ease-in-out
              ml-4 md:ml-8 lg:ml-12
            "
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A0908]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll(trendingScrollContainerRef, 300)}
            className="
              absolute right-0 top-1/2 -translate-y-1/2 transform
              bg-[#F2F4F3] bg-opacity-75 p-2 rounded-full shadow-md z-10 cursor-pointer
              hidden sm:flex items-center justify-center
              hover:bg-opacity-100 transition-all duration-200 ease-in-out
              mr-4 md:mr-8 lg:mr-12
            "
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A0908]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Horizontal Scroll Container for Trending */}
          <div
            ref={trendingScrollContainerRef}
            className="
              flex space-x-6 pb-4 overflow-x-scroll no-scrollbar
              snap-x snap-mandatory scroll-smooth
              px-4 sm:px-6 md:px-8 lg:px-12
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
                <ProductCard
                  product={product}
                  addToCart={addToCart} // MODIFIED: Pass addToCart prop
                  toggleFavourite={toggleFavourite} // MODIFIED: Pass toggleFavourite prop
                  isFavouritedInitial={favoriteProductIds.has(product.id)} // MODIFIED: Pass initial favorite status
                />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-10 px-4">
          <Link
            to="/catalog"
            className="inline-block bg-[#0A0908] text-[#F2F4F3] py-3 px-8 rounded-md text-lg font-medium hover:bg-[#D6001A] transition duration-300"
          >
            View All Fragrances
          </Link>
        </div>
      </section>

      {/* --- Fragrances on Sale Section --- */}
      {onSaleProducts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative bg-[#F2F4F3] mb-12">
          <h2 className="text-3xl font-bold text-center text-[#D6001A] mb-8 px-4">
            Fragrances on Sale!
          </h2>

          <div className="relative">
            {/* Left Arrow Button for Sale */}
            <button
              onClick={() => scroll(saleScrollContainerRef, -300)}
              className="
                absolute left-0 top-1/2 -translate-y-1/2 transform
                bg-white bg-opacity-75 p-2 rounded-full shadow-md z-10 cursor-pointer
                hidden sm:flex items-center justify-center
                hover:bg-opacity-100 transition-all duration-200 ease-in-out
                ml-4 md:ml-8 lg:ml-12
              "
              aria-label="Scroll left for sale"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A0908]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow Button for Sale */}
            <button
              onClick={() => scroll(saleScrollContainerRef, 300)}
              className="
                absolute right-0 top-1/2 -translate-y-1/2 transform
                bg-white bg-opacity-75 p-2 rounded-full shadow-md z-10 cursor-pointer
                hidden sm:flex items-center justify-center
                hover:bg-opacity-100 transition-all duration-200 ease-in-out
                mr-4 md:mr-8 lg:mr-12
              "
              aria-label="Scroll right for sale"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A0908]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Horizontal Scroll Container for Sale Products */}
            <div
              ref={saleScrollContainerRef}
              className="
                flex space-x-6 pb-4 overflow-x-scroll no-scrollbar
                snap-x snap-mandatory scroll-smooth
                px-4 sm:px-6 md:px-8 lg:px-12
              "
            >
              {onSaleProducts.map((product) => (
                <div
                  key={product.id}
                  className="
                    flex-shrink-0
                    w-[calc(100vw-8rem)] sm:w-80 md:w-72
                    snap-center
                  "
                >
                  <ProductCard
                    product={product}
                    addToCart={addToCart} // MODIFIED: Pass addToCart prop
                    toggleFavourite={toggleFavourite} // MODIFIED: Pass toggleFavourite prop
                    isFavouritedInitial={favoriteProductIds.has(product.id)} // MODIFIED: Pass initial favorite status
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 px-4">
            <Link
              to="/catalog?sale=true"
              className="inline-block bg-[#D6001A] text-[#F2F4F3] py-3 px-8 rounded-md text-lg font-medium hover:bg-[#0A0908] transition duration-300"
            >
              View All Sale Items
            </Link>
          </div>
        </section>
      )}

      {/* --- Brand Slider Section --- */}
      <div className="mb-0">
        <h2 className="text-3xl font-bold text-center text-[#0A0908] mb-8 px-4">
          Our Valued Brands
        </h2>
        <BrandSlider />
      </div>
    </div>
  );
}