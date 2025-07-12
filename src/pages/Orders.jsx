// src/pages/Orders.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import orders from '../data/orders'; // Import the mock orders data
import { FiArrowLeft } from 'react-icons/fi'; // Import the back arrow icon

export default function Orders() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Define your color palette for consistent styling
  const offWhite = '#F2F4F3';
  const nearBlack = '#0A0908';
  const accentRed = '#D6001A';

  // Sort orders by date in descending order (most recent first)
  const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className={`bg-[${offWhite}] min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-extrabold text-[${nearBlack}] mb-10 text-center`}>Your Orders</h1>

        {sortedOrders.length === 0 ? (
          <p className={`text-center text-xl text-[${nearBlack}]`}>You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-6">
            {sortedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                {/* Order Header */}
                <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200">
                  <div>
                    <h2 className={`text-lg font-semibold text-[${nearBlack}] mb-1`}>Order ID: {order.id}</h2>
                    <p className="text-sm text-gray-600">Date: {order.date}</p>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:text-right">
                    <p className={`text-lg font-bold text-[${nearBlack}]`}>Total: R{order.total.toFixed(2)}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <h3 className={`text-xl font-semibold text-[${nearBlack}] mb-3 border-b border-gray-300 pb-2`}>Items</h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <Link
                        to={`/product/${item.productId}`}
                        key={item.productId}
                        className="flex items-center space-x-3 p-2 -mx-2 rounded-md transition-colors duration-150 hover:bg-gray-50"
                      >
                        <img
                          src={item.image || `https://placehold.co/112x112/E0E0E0/333333?text=No+Image`}
                          alt={item.name}
                          className="w-28 h-28 object-cover rounded-md border border-gray-200"
                          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/112x112/E0E0E0/333333?text=No+Image"; }}
                        />
                        <div className="flex-grow">
                          <p className={`text-base font-medium text-[${nearBlack}]`}>{item.name}</p>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className={`text-base font-semibold text-[${nearBlack}]`}>R{(item.price * item.quantity).toFixed(2)}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Account Button */}
        <div className="flex justify-center mt-8"> {/* Added margin top for spacing */}
        <button
          type="button"
          onClick={() => navigate('/my-account')}
          className={`w-full sm:w-auto px-10 py-3 rounded-lg font-semibold flex items-center justify-center
                      bg-white text-[${nearBlack}] border border-gray-300
                      hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400`}
          aria-label="Back to account details"
        >
          <FiArrowLeft size={20} className="mr-2 flex-shrink-0" /> Back to Account
        </button>
      </div>

      </div>
    </div>
  );
}