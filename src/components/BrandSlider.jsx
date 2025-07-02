// src/components/BrandSlider.jsx
import React from 'react';
import brands from '../data/brands'; // Import your brand data

export default function BrandSlider() {
  // We'll duplicate the brands to create a continuous scroll effect
  // This helps prevent a noticeable "jump" when the animation restarts
  const duplicatedBrands = [...brands, ...brands]; 

  return (
    <section className="py-8 bg-gray-50 overflow-hidden"> {/* Use a slightly different background if desired, e.g., bg-[#F2F4F3] */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0A0908] mb-8 font-sans">
          Our Valued Brands
        </h2>
        <div className="relative w-full flex overflow-hidden">
          <div className="flex animate-scroll-brands whitespace-nowrap">
            {duplicatedBrands.map((brand, index) => (
              <div key={`${brand.id}-${index}`} className="flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 p-4"> {/* Adjust width as needed */}
                <img 
                  src={brand.logo} 
                  alt={brand.name + ' logo'} 
                  className="max-w-full h-auto mx-auto filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}