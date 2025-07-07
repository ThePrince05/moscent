// src/pages/Orders.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import orders from '../data/orders'; // Import the mock orders data

export default function Orders() {
  // Sort orders by date in descending order (most recent first)
  const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-[#F2F4F3] min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#0A0908] mb-10 text-center">Your Orders</h1>

        {sortedOrders.length === 0 ? (
          <p className="text-center text-xl text-[#0A0908]">You haven't placed any orders yet.</p>
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
                    <h2 className="text-lg font-semibold text-[#0A0908] mb-1">Order ID: {order.id}</h2>
                    <p className="text-sm text-gray-600">Date: {order.date}</p>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:text-right">
                    <p className="text-lg font-bold text-[#0A0908]">Total: R{order.total.toFixed(2)}</p>
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
                  <h3 className="text-xl font-semibold text-[#0A0908] mb-3 border-b border-gray-300 pb-2">Items</h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      // MODIFIED: Wrap the item div with Link
                      <Link
                        to={`/product/${item.productId}`} // Link to the product detail page
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
                          <p className="text-base font-medium text-[#0A0908]">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-base font-semibold text-[#0A0908]">R{(item.price * item.quantity).toFixed(2)}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}