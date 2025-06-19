import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="bg-black shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-white font-bold text-[1.5rem] hover:text-gray-300">
           Mo'Scent
          </Link>


          {/* Search Bar */}
          <div className="flex-1 ml-2 mr-6 max-w-3xl">
            <form className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch size={20} className="text-white opacity-60" />
              </div>
              <input
                type="search"
                placeholder="Search fragrances..."
                className="w-full border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm
                            placeholder-[#9FA7A9] placeholder:text-base text-[#9FA7A9] bg-[#282A2A]
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

            </form>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/login" aria-label="User" className="text-white hover:text-indigo-400">
              <FiUser size={22} />
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative text-white hover:text-indigo-400">
              <FiShoppingCart size={22} />
              <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
