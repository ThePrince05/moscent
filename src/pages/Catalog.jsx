// src/pages/Catalog.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import fragrances from '../data/fragrances';
import { FiTruck } from 'react-icons/fi';

// Receive addToCart, toggleFavourite, and favoriteProductIds as props from App.jsx
export default function Catalog({ addToCart, toggleFavourite, favoriteProductIds }) { // MODIFIED: Added toggleFavourite and favoriteProductIds
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredFragrances, setFilteredFragrances] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');

  const primaryBackground = '#F2F4F3';
  const primaryText = '#0A0908';
  const accentRed = '#D6001A';

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
      return () => { clearTimeout(handler); };
    }, [value, delay]);
    return debouncedValue;
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const urlSearchTerm = searchParams.get('search') || '';
    setSearchTerm(urlSearchTerm);
  }, [searchParams]);

  useEffect(() => {
    // Get parameters from URL
    const category = searchParams.get('category') || 'all';
    const sale = searchParams.get('sale') === 'true';
    const brandParam = searchParams.get('brand');

    setActiveCategory(category);

    let currentFragrances = [...fragrances];

    // 1. Filter by Category
    if (category !== 'all') {
      currentFragrances = currentFragrances.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // 2. Filter by Sale
    if (sale) {
      currentFragrances = currentFragrances.filter(product =>
        product.discountedPrice && product.discountedPrice < product.price
      );
    }

    // 3. Filter by Brand
    if (brandParam) {
      const lowerCaseBrandParam = brandParam.toLowerCase();
      currentFragrances = currentFragrances.filter(product =>
        product.brand.toLowerCase() === lowerCaseBrandParam
      );
    }

    // 4. Filter by Search Term (using debounced value)
    if (debouncedSearchTerm) {
      const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
      currentFragrances = currentFragrances.filter(product =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.brand.toLowerCase().includes(lowerCaseSearchTerm) ||
        (product.shortDescription && product.shortDescription.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    // 5. Sort
    currentFragrances.sort((a, b) => {
      if (sortOption === 'price-asc') {
        const priceA = a.discountedPrice || a.price;
        const priceB = b.discountedPrice || b.price;
        return priceA - priceB;
      } else if (sortOption === 'price-desc') {
        const priceA = a.discountedPrice || a.price;
        const priceB = b.discountedPrice || b.price;
        return priceB - priceA;
      } else if (sortOption === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

    setFilteredFragrances(currentFragrances);
  }, [searchParams, debouncedSearchTerm, sortOption]);


  const handleFilterChange = (filterType, value) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (filterType === 'category') {
      if (value === 'all') {
        newSearchParams.delete('category');
      } else {
        newSearchParams.set('category', value);
      }
      if (newSearchParams.get('sale')) {
        newSearchParams.delete('sale');
      }
      if (newSearchParams.get('brand')) {
        newSearchParams.delete('brand');
      }
    } else if (filterType === 'sale') {
      if (value === true) {
        newSearchParams.set('sale', 'true');
        if (newSearchParams.get('category') && newSearchParams.get('category') !== 'all') {
          newSearchParams.delete('category');
        }
        if (newSearchParams.get('brand')) {
          newSearchParams.delete('brand');
        }
      } else {
        newSearchParams.delete('sale');
      }
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div className={`bg-[${primaryBackground}] min-h-screen flex flex-col`}>
      <main className="container mx-auto px-8 py-8 flex-grow">
        <h1 className={`text-4xl font-bold text-[${primaryText}] mb-6 text-center`}>
          Our Fragrance Collection
        </h1>

        <div className="flex items-center justify-center mb-8">
            <FiTruck className={`text-[${primaryText}] mr-2 text-xl`} />
            <p className={`text-lg text-[${primaryText}] font-medium`}>
                Enjoy Free Delivery in Klipgat!
            </p>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
            {searchParams.get('brand') && (
                <button
                    onClick={() => {
                        const newSearchParams = new URLSearchParams(searchParams);
                        newSearchParams.delete('brand');
                        newSearchParams.delete('category');
                        newSearchParams.delete('sale');
                        setSearchParams(newSearchParams);
                        setSearchTerm('');
                    }}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                                 bg-gray-200 text-[${primaryText}] hover:bg-gray-300 border border-gray-300`}
                >
                    Clear Brand Filter: {searchParams.get('brand')} &times;
                </button>
            )}

            {['all', 'men', 'women', 'unisex', 'sale'].map(category => (
            <button
              key={category}
              onClick={() => handleFilterChange(category === 'sale' ? 'sale' : 'category', category === 'sale' ? true : category)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category || (category === 'sale' && searchParams.get('sale') === 'true')
                  ? `bg-[${accentRed}] text-[${primaryBackground}] shadow-md`
                  : `bg-white text-[${primaryText}] hover:bg-gray-100 border border-gray-200`}
              `}
            >
              {category === 'sale' ? 'On Sale' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl flex flex-row items-center gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[${accentRed}]`}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="w-full sm:w-auto flex-shrink-0">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={`block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[${accentRed}]`}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {filteredFragrances.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFragrances.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                toggleFavourite={toggleFavourite} // NEW: Pass toggleFavourite prop
                isFavouritedInitial={favoriteProductIds.has(product.id)} // NEW: Pass initial favorite status
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600 py-10 col-span-full">No fragrances found matching your criteria.</p>
        )}
      </main>
    </div>
  );
}