// src/pages/Admin/OrderDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import orders from '../../data/orders';
import { FiArrowLeft } from 'react-icons/fi';

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  console.log("Order ID from params:", orderId);
  console.log("All available order IDs:", orders.map(o => o.id));

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    console.warn("Order with ID", orderId, "not found.");
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white px-4">
        <div className="text-center bg-white p-8 rounded-lg shadow border border-gray-200 max-w-md w-full">
          <h2 className="text-3xl font-bold mb-4 text-near-black">Order not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="inline-block mt-4 px-6 py-2 border-2 border-accent-red text-accent-red rounded-md
                       hover:bg-accent-red hover:text-white transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-off-white min-h-[calc(100vh-128px)] py-10 px-4 sm:px-6 lg:px-8 font-sans flex flex-col">
      <div className="max-w-5xl mx-auto flex-grow">
        <h1 className="text-4xl font-extrabold text-near-black mb-8 text-center">Order Details - {order.id}</h1>

        {/* Customer & Order Info */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-near-black mb-4">Customer Info</h2>
            <p className="mb-2"><strong>Email:</strong> {order.userEmail}</p>
            <p className="mb-2"><strong>Shipping Address:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.zip}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-near-black mb-4">Order Info</h2>
            <p className="mb-2"><strong>Date:</strong> {order.date}</p>
            <p className="mb-2"><strong>Status:</strong> {order.status}</p>
            <p className="mb-2"><strong>Created At:</strong> {order.createdAt.toLocaleString()}</p>
            <p className="mb-2"><strong>Updated At:</strong> {order.updatedAt.toLocaleString()}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-near-black mb-6 text-center">Order Items</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="px-4 py-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                  </td>
                  <td className="px-4 py-3 font-medium text-near-black">{item.name}</td>
                  <td className="px-4 py-3">{item.brand}</td>
                  <td className="px-4 py-3">R{item.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3 font-semibold text-near-black">R{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300">
                <td colSpan="5" className="px-4 py-4 text-right font-bold text-lg text-near-black">Total:</td>
                <td className="px-4 py-4 font-bold text-lg text-near-black">R{order.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Back button at bottom center */}
      <div className="flex justify-center mt-10">
        <button
          type="button"
          onClick={() => navigate('/admin/orders')}
          className="w-full sm:w-auto px-10 py-3 rounded-lg font-semibold flex items-center justify-center
                     bg-white text-near-black border border-gray-300
                     hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          aria-label="Back to orders list"
        >
          <FiArrowLeft size={20} className="mr-2 flex-shrink-0" /> Back to Orders
        </button>
      </div>
    </div>
  );
}
