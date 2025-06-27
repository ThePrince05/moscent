import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart, FiHeart, FiMenu } from 'react-icons/fi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <nav className="bg-black shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Hamburger + Logo (hidden when search is open) */}
          {!mobileSearchOpen && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white md:hidden focus:outline-none"
                aria-label="Menu">
                <FiMenu size={24} />
              </button>
              <Link to="/" className="text-white  text-[1.9rem] font-bold font-dmserif hover:text-gray-300">
                Mo'Scent
              </Link>
            </div>
          )}

          {/* CENTER: Search Bar */}
          <div className={`flex-1 mx-4 ${mobileSearchOpen ? '' : 'hidden md:flex'} max-w-3xl`}>
            <form className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch size={20} className="text-white opacity-60" />
              </div>
              <input
                autoFocus
                type="search"
                placeholder="Search fragrances..."
                className="w-full border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm
                           placeholder-[#9FA7A9] placeholder:text-base text-[#9FA7A9] bg-[#282A2A]
                           focus:outline-none focus:ring-2 focus:ring-[#1F75FE] focus:border-[#1F75FE]"
              />
              {/* Removed the close X button here */}
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
            className="text-white hover:text-[#1F75FE]"
            aria-label="Open Search"
          >
            <FiSearch size={22} />
          </button>
          {/* Favourites */}
          <Link to="/favourites" aria-label="Favourites" className="text-white hover:text-[#1F75FE]">
           <FiHeart size={22} />
          </Link>
          {/* Cart */}
          <Link to="/cart" aria-label="Cart" className="relative text-white hover:text-[#1F75FE]">
            <FiShoppingCart size={22} />
            <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>

        {/* Desktop-only icons */}
        <div className="hidden md:flex items-center space-x-6">
         
          <Link to="/favourites" aria-label="Favourites" className="text-white hover:text-[#1F75FE]">
            <FiHeart size={22} />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative text-white hover:text-[#1F75FE]">
            <FiShoppingCart size={22} />
            <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
           <Link to="/login" aria-label="Account" className="text-white hover:text-[#1F75FE]">
            <FiUser size={22} />
          </Link>
        </div>
      </div>

          ) : (
            <div className="md:hidden">
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="text-white font-medium hover:underline"
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
            <Link to="/login" className="text-white hover:text-[#1F75FE]">
              Sign In / Sign Up
            </Link>
            <Link to="/order" className="text-white hover:text-[#1F75FE] pb-4">
              Orders
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
