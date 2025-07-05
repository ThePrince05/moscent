// src/pages/Catalog.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams
import ProductCard from '../components/ProductCard'; // Make sure this path is correct
import fragrances from '../data/fragrances'; // Your mock data
import Footer from '../components/Footer'; // Assuming you have a Footer component


export default function Catalog() {
  // Destructure both searchParams AND setSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredFragrances, setFilteredFragrances] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all'); // State to highlight active category
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [sortOption, setSortOption] = useState('name-asc'); // State for sorting

  // Simple custom hook for debouncing a value
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  // Debounce search term for better performance (optional but good practice)
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const urlSearchTerm = searchParams.get('search') || '';
    setSearchTerm(urlSearchTerm); // Update the state and the input field's value
  }, [searchParams]);

  useEffect(() => {
    // Get parameters from URL
    const category = searchParams.get('category') || 'all';
    const sale = searchParams.get('sale') === 'true';

    const urlSearchTerm = searchParams.get('search');

    setActiveCategory(category); // Update active category for styling

    let currentFragrances = [...fragrances]; // Start with all fragrances

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

    // 3. Filter by Search Term (using debounced value)
    if (debouncedSearchTerm) {
      const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
      currentFragrances = currentFragrances.filter(product =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.brand.toLowerCase().includes(lowerCaseSearchTerm) ||
        (product.shortDescription && product.shortDescription.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    // 4. Sort
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
  }, [searchParams, debouncedSearchTerm, sortOption]); // Re-run effect when these dependencies change


  // --- Function to handle category and sale filter updates ---
  const handleFilterChange = (filterType, value) => {
    const newSearchParams = new URLSearchParams(searchParams); // Start with current params

    if (filterType === 'category') {
      if (value === 'all') {
        newSearchParams.delete('category');
      } else {
        newSearchParams.set('category', value);
      }
      // When changing category, implicitly clear sale filter unless re-applied
      if (newSearchParams.get('sale')) {
        newSearchParams.delete('sale');
      }
    } else if (filterType === 'sale') {
      if (value === true) {
        newSearchParams.set('sale', 'true');
        // When applying sale filter, implicitly clear category filter unless re-applied
        if (newSearchParams.get('category') && newSearchParams.get('category') !== 'all') {
          newSearchParams.delete('category');
        }
      } else {
        newSearchParams.delete('sale');
      }
    }

    setSearchParams(newSearchParams); // This will update the URL and trigger useEffect
  };


  return (
    <div className="bg-[#F2F4F3] min-h-screen flex flex-col">

      {/* Increased horizontal padding from px-4 to px-8 for more margin */}
      <main className="container mx-auto px-8 py-8 flex-grow">
        <h1 className="text-4xl font-bold text-[#0A0908] mb-8 text-center">
          Our Fragrance Collection
        </h1>

        {/* Category Filters - Now in its own centered block */}
        <div className="mb-6 flex flex-wrap justify-center gap-2"> {/* mb-6 for space below */}
            {['all', 'men', 'women', 'unisex', 'sale'].map(category => (
            <button
              key={category}
              onClick={() => handleFilterChange(category === 'sale' ? 'sale' : 'category', category === 'sale' ? true : category)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category || (category === 'sale' && searchParams.get('sale') === 'true')
                  ? 'bg-[#D6001A] text-[#F2F4F3] shadow-md' // Active: Accent Red background, Off-White text
                  : 'bg-white text-[#0A0908] hover:bg-gray-100 border border-gray-200'} // Inactive: White background, Near Black text
              `}
            >
              {category === 'sale' ? 'On Sale' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Search and Sort - Now in its own centered block */}
        <div className="flex justify-center mb-8"> {/* mb-8 for space before product grid */}
          <div className="w-full max-w-2xl flex flex-row items-center gap-4"> {/* Always flex-row, gap-4 for spacing */}
            {/* Search Input */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6001A]"
              />
              {/* Search Icon */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            {/* Sort Dropdown */}
            <div className="w-full sm:w-auto flex-shrink-0">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D6001A]"
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600 py-10 col-span-full">No fragrances found matching your criteria.</p>
        )}
      </main>

      <Footer /> {/* Your Footer component */}
    </div>
  );
}