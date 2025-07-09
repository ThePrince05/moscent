// src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Cart({ cartItems, updateQuantity, removeFromCart, clearCart }) {
  // Your color palette from saved information
  const primaryBackground = '#F2F4F3'; // Off-White/Light Gray [cite: 2025-07-02]
  const primaryText = '#0A0908';       // Near Black [cite: 2025-07-02]
  const accentRed = '#D6001A';         // A vibrant, modern red [cite: 2025-07-02]

  // Helper function to safely get item properties with default values
  const getItemProperty = (item, propName, defaultValue = '') => {
    if (item.product && item.product[propName] !== undefined) {
      return item.product[propName];
    }
    if (item[propName] !== undefined) {
      return item[propName];
    }
    return defaultValue;
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(getItemProperty(item, 'price', 0));
    const discountedPrice = parseFloat(getItemProperty(item, 'discountedPrice', 0));
    const itemPrice = discountedPrice || price;

    const quantity = item.quantity;

    if (!isNaN(itemPrice) && !isNaN(quantity)) {
      return acc + (itemPrice * quantity);
    }
    return acc;
  }, 0);

  const handleCheckout = () => {
    alert('Proceeding to checkout (Phase 2 feature - Stripe integration coming soon!)'); // This will be integrated with Stripe in Phase 2 [cite: 2025-06-26, 2025-07-06]
    // clearCart();
  };

  return (
    <div className={`bg-[${primaryBackground}] min-h-screen flex flex-col`}>
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
            {/* Cart Items List Container */}
            {/* The py-6 on this container should provide consistent padding around the items. */}
            <div className="md:col-span-2 bg-white px-6 py-6 rounded-lg shadow-md">
              {cartItems.map((item, index) => {
                const currentProductId = getItemProperty(item, 'productId', getItemProperty(item, 'id'));
                const currentSelectedSize = item.selectedSize;
                const cartItemKey = currentSelectedSize ? `${currentProductId}-${currentSelectedSize}` : currentProductId;
                const itemPrice = parseFloat(getItemProperty(item, 'discountedPrice', getItemProperty(item, 'price', 0)));
                const imageUrl = getItemProperty(item, 'imageUrl') || getItemProperty(item, 'image') || 'https://via.placeholder.com/96x96?text=No+Image';

                return (
                  <div
                    key={item.id || cartItemKey}
                    // Apply border-b only if it's not the last item
                    // Apply consistent top margin to all items except the first
                    className={`flex items-center py-4
                      ${index > 0 ? 'mt-4' : ''}
                      ${index < cartItems.length - 1 ? 'border-b border-gray-200' : ''}
                    `}
                  >
                    <Link to={`/product/${currentProductId}`} className="flex-shrink-0 mr-4">
                      <img
                        src={imageUrl}
                        alt={getItemProperty(item, 'name', 'Product Image')}
                        className="w-24 h-24 object-contain rounded-md border border-gray-200"
                      />
                    </Link>
                    <div className="flex-grow">
                      <Link to={`/product/${currentProductId}`} className={`text-lg font-semibold text-[${primaryText}] hover:text-[${accentRed}] transition-colors`}>
                        {getItemProperty(item, 'name', 'Unknown Product')}
                      </Link>
                      <p className="text-gray-500 text-sm">
                        {getItemProperty(item, 'brand', 'N/A')} {currentSelectedSize ? `(${currentSelectedSize}ml)` : ''}
                      </p>
                      <p className={`text-lg font-bold text-[${primaryText}] mt-1`}>
                        R{(!isNaN(itemPrice) && !isNaN(item.quantity) ? (itemPrice * item.quantity).toFixed(2) : '0.00')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(cartItemKey, item.quantity - 1)}
                        className={`px-3 py-1 border border-gray-300 rounded-md text-[${primaryText}] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
                        aria-label="Decrease quantity"
                        disabled={item.quantity <= 1}
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
                onClick={handleCheckout}
                className={`w-full bg-[${accentRed}] text-[${primaryBackground}] font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity mt-4`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}