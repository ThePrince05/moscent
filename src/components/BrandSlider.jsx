// src/components/BrandSlider.jsx
import React from 'react';
import brands from '../data/brands'; // Import your brand data

export default function BrandSlider() {
  // We'll duplicate the brands to create a continuous scroll effect
  // This helps prevent a noticeable "jump" when the animation restarts
  const duplicatedBrands = [...brands, ...brands];

  return (
    // Reduced vertical padding (py-6) and changed background to match primary
    <section className="py-6 bg-[#F2F4F3] overflow-hidden">
      {/* Removed px-4 from this container to allow brands to get closer to edges if desired */}
      <div className="container mx-auto">
        <div className="relative w-full flex overflow-hidden">
          <div className="flex animate-scroll-brands whitespace-nowrap">
            {duplicatedBrands.map((brand, index) => (
              // Reduced padding (p-2) around each brand logo for tighter packing
              <div key={`${brand.id}-${index}`} className="flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 p-2"> {/* Adjust width as needed */}
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
