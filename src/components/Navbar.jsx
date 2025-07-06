// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart, FiHeart, FiMenu } from 'react-icons/fi';

// Receive cartItemCount AND favoriteItemCount as props
export default function Navbar({ cartItemCount, favoriteItemCount = 0 }) { // Added favoriteItemCount with default
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Define your color palette for easy reference
  const offWhite = '#F2F4F3';       // Primary Background, Text
  const nearBlack = '#0A0908';      // Primary Text & Strongest Elements, Navbar/Footer background
  const accentRed = '#D6001A';      // Accent for Impact & Navigation

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    if (searchQuery.trim()) {
      // Navigate to the catalog page with the search query
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Optional: clear search bar after submitting
    }
  };

  return (
    // Navbar background: Near Black
    <nav className="bg-[#0A0908] shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Hamburger + Logo (hidden when search is open) */}
          {!mobileSearchOpen && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-[#F2F4F3] md:hidden focus:outline-none" // Text: Off-White
                aria-label="Menu">
                <FiMenu size={24} />
              </button>
              {/* Mo'Scent text hover changed to the new accent red #D6001A */}
              <Link to="/" className="text-[#F2F4F3] text-[1.7rem] font-bold font-inter hover:text-[#D6001A]">
                Mo'Scent
              </Link>
            </div>
          )}

          {/* CENTER: Search Bar */}
          <div className={`flex-1 mx-4 ${mobileSearchOpen ? '' : 'hidden md:flex'} max-w-3xl`}>
            <form className="relative w-full" onSubmit={handleSearchSubmit}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch size={20} className="text-[#F2F4F3] opacity-60" />
              </div>
              <input
                autoFocus
                type="search"
                placeholder="Search fragrances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-[#F2F4F3]/20 rounded-full py-2 pl-10 pr-4 text-base
                           placeholder-[#F2F4F3]/70 text-[#F2F4F3] bg-[#1A1A1A]
                           focus:outline-none focus:ring-2 focus:ring-[#D6001A] focus:border-[#D6001A]"
              />
            </form>
          </div>

          {/* RIGHT: Icons (hidden when search is open) and Close button (shown only when search open) */}
          {!mobileSearchOpen ? (
            <div className="flex items-center space-x-4">
              {/* Mobile-only icons */}
              <div className="flex items-center space-x-4 md:hidden">
                {/* Search */}
                <button
                  onClick={() => setMobileSearchOpen(true)}
                  className="text-[#F2F4F3] hover:text-[#D6001A]" // Text: Off-White, Hover: New Red Accent
                  aria-label="Open Search"
                >
                  <FiSearch size={22} />
                </button>
                {/* Favourites - Mobile */}
                <Link to="/favorites" aria-label="Favourites" className="relative text-[#F2F4F3] hover:text-[#D6001A]"> {/* Text: Off-White, Hover: New Red Accent */}
                  <FiHeart size={22} />
                  {favoriteItemCount > 0 && ( // Only show bubble if count > 0
                    <span className="absolute -top-2 -right-3 bg-[#D6001A] text-[#F2F4F3] rounded-full text-xs w-5 h-5 flex items-center justify-center"> {/* Favorites bubble: New Red Accent background, Off-White text */}
                      {favoriteItemCount}
                    </span>
                  )}
                </Link>
                {/* Cart - Mobile */}
                <Link to="/cart" aria-label="Cart" className="relative text-[#F2F4F3] hover:text-[#D6001A]"> {/* Text: Off-White, Hover: New Red Accent */}
                  <FiShoppingCart size={22} />
                  {cartItemCount > 0 && ( // Only show bubble if count > 0
                    <span className="absolute -top-2 -right-3 bg-[#D6001A] text-[#F2F4F3] rounded-full text-xs w-5 h-5 flex items-center justify-center"> {/* Cart bubble: New Red Accent background, Off-White text */}
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Desktop-only icons and links */}
              <div className="hidden md:flex items-center space-x-6">
                {/* Favourites - Desktop */}
                <Link to="/favorites" aria-label="Favourites" className="relative text-[#F2F4F3] hover:text-[#D6001A]"> {/* Text: Off-White, Hover: New Red Accent */}
                  <FiHeart size={22} />
                  {favoriteItemCount > 0 && ( // Only show bubble if count > 0
                    <span className="absolute -top-2 -right-3 bg-[#D6001A] text-[#F2F4F3] rounded-full text-xs w-5 h-5 flex items-center justify-center"> {/* Favorites bubble: New Red Accent background, Off-White text */}
                      {favoriteItemCount}
                    </span>
                  )}
                </Link>
                {/* Cart - Desktop */}
                <Link to="/cart" aria-label="Cart" className="relative text-[#F2F4F3] hover:text-[#D6001A]"> {/* Text: Off-White, Hover: New Red Accent */}
                  <FiShoppingCart size={22} />
                  {cartItemCount > 0 && ( // Only show bubble if count > 0
                    <span className="absolute -top-2 -right-3 bg-[#D6001A] text-[#F2F4F3] rounded-full text-xs w-5 h-5 flex items-center justify-center"> {/* Cart bubble: New Red Accent background, Off-White text */}
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <Link to="/login" aria-label="Account" className="text-[#F2F4F3] hover:text-[#D6001A]"> {/* Text: Off-White, Hover: New Red Accent */}
                  <FiUser size={22} />
                </Link>
              </div>
            </div>

          ) : (
            <div className="md:hidden">
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="text-[#F2F4F3] font-medium hover:text-[#D6001A]" // Text: Off-White, Hover: New Red Accent
                aria-label="Close search"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {!mobileSearchOpen && menuOpen && (
          <div className="flex flex-col items-start space-y-4 mt-1 md:hidden">
            {/* Catalog Link for mobile */}
            <NavLink
              to="/catalog"
              onClick={() => setMenuOpen(false)} // Close menu on click
              className={({ isActive }) =>
                `text-[#F2F4F3] hover:text-[#D6001A] ${
                  isActive ? `text-[${accentRed}]` : ''
                }`
              }
            >
              Catalog
            </NavLink>
            <Link to="/login" className="text-[#F2F4F3] hover:text-[#D6001A]"> {/* Text: Off-White, Hover: New Red Accent */}
              Sign In / Sign Up
            </Link>
            <Link to="/orders" className="text-[#F2F4F3] hover:text-[#D6001A] pb-4"> {/* Corrected to /orders based on App.jsx route */}
              Orders
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}