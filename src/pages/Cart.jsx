// src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Removed Footer import and usage, assuming App.jsx handles it globally for cleaner structure

export default function Cart({ cartItems, updateQuantity, removeFromCart }) { // Renamed from CartPage to Cart
  // Your color palette from saved information
  const primaryBackground = '#F2F4F3'; // Off-White/Light Gray
  const primaryText = '#0A0908';       // Near Black
  const accentRed = '#D6001A';         // A vibrant, modern red

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.product.discountedPrice || item.product.price;
    return acc + (itemPrice * item.quantity);
  }, 0);

  return (
    <div className={`bg-[${primaryBackground}] min-h-screen flex flex-col`}>
      {/* Header (Navbar) is rendered by App.jsx, not directly within pages. */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className={`text-4xl font-bold text-[${primaryText}] mb-8 text-center`}>
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className={`text-xl text-[${primaryText}] mb-4`}>Your cart is empty.</p>
            <Link to="/catalog" className={`inline-block bg-[${accentRed}] text-[${primaryBackground}] font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity`}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              {cartItems.map(item => {
                const cartItemKey = item.selectedSize ? `${item.product.id}-${item.selectedSize}` : item.product.id;
                const itemPrice = item.product.discountedPrice || item.product.price;

                return (
                  <div key={cartItemKey} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0 mr-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-contain rounded-md"
                      />
                    </Link>
                    <div className="flex-grow">
                      <Link to={`/product/${item.product.id}`} className={`text-lg font-semibold text-[${primaryText}] hover:text-[${accentRed}] transition-colors`}>
                        {item.product.name}
                      </Link>
                      <p className="text-gray-500 text-sm">
                          {item.product.brand} {item.selectedSize ? `(${item.selectedSize}ml)` : ''}
                      </p>
                      <p className={`text-lg font-bold text-[${primaryText}] mt-1`}>
                        R{(itemPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(cartItemKey, item.quantity - 1)}
                        className={`px-3 py-1 border border-gray-300 rounded-md text-[${primaryText}] hover:bg-gray-100`}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className={`text-lg font-medium text-[${primaryText}]`}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(cartItemKey, item.quantity + 1)}
                        className={`px-3 py-1 border border-gray-300 rounded-md text-[${primaryText}] hover:bg-gray-100`}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(cartItemKey)}
                        className={`ml-4 text-red-500 hover:text-red-700 transition-colors`}
                        title="Remove from cart"
                        aria-label="Remove item from cart"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
              <h2 className={`text-2xl font-bold text-[${primaryText}] mb-4 border-b pb-3`}>Order Summary</h2>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[${primaryText}]`}>Subtotal ({cartItems.length} items)</span>
                <span className={`font-semibold text-[${primaryText}]`}>R{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <button
                onClick={() => alert('Proceeding to checkout (Phase 2 feature!)')}
                className={`w-full bg-[${accentRed}] text-[${primaryBackground}] font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity mt-4`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
      {/* If your App.jsx always renders Footer, this is redundant and can be removed. */}
      {/* <Footer /> */}
    </div>
  );
}