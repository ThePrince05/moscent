// src/components/BrandSlider.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import brands from '../data/brands'; // Import your brand data

export default function BrandSlider() {
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-6 bg-[#F2F4F3] overflow-hidden">
      <div className="container mx-auto">
        <div className="relative w-full flex overflow-hidden">
          <div className="flex animate-scroll-brands whitespace-nowrap">
            {duplicatedBrands.map((brand, index) => (
              <div key={`${brand.id}-${index}`} className="flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 p-2">
                {/* Wrap the image with a Link component */}
                <Link to={`/catalog?brand=${encodeURIComponent(brand.name)}`}>
                  <img
                    src={brand.logo}
                    alt={brand.name + ' logo'}
                    // Added cursor-pointer to indicate it's clickable
                    className="max-w-full h-auto mx-auto filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}