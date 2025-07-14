// src/pages/Admin/Orders.jsx
import React from 'react';
import orders from '../../data/orders';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function Orders() {
  const navigate = useNavigate();

  return (
    <div className="bg-off-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans flex flex-col">
      <div className="max-w-7xl mx-auto flex-grow">
        <h1 className="text-3xl font-bold text-near-black mb-8 text-center">All Orders</h1>

        <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-near-black">Order ID</th>
                <th className="px-6 py-4 text-left font-semibold text-near-black">Customer Email</th>
                <th className="px-6 py-4 text-left font-semibold text-near-black">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-near-black">Payment</th>
                <th className="px-6 py-4 text-left font-semibold text-near-black">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-near-black">Total</th>
                <th className="px-6 py-4 text-left font-semibold text-near-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium text-near-black">{order.id}</td>
                  <td className="px-6 py-4 text-gray-700">{order.userEmail}</td>
                  <td className="px-6 py-4 text-gray-700">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      order.paymentStatus === 'paid'
                        ? 'bg-green-200 text-green-800'
                        : order.paymentStatus === 'pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-red-200 text-red-800'
                    }`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-200 text-green-800'
                        : order.status === 'Shipped'
                        ? 'bg-blue-200 text-blue-800'
                        : order.status === 'Processing'
                        ? 'bg-orange-200 text-orange-800'
                        : order.status === 'Cancelled'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="inline-flex items-center text-accent-red hover:underline"
                    >
                      View <FiArrowRight className="ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Back to Dashboard button */}
      <div className="flex justify-center mt-10">
        <button
          type="button"
          onClick={() => navigate('/admin/dashboard')}
          className="w-full sm:w-auto px-10 py-3 rounded-lg font-semibold flex items-center justify-center
                     bg-white text-near-black border border-gray-300
                     hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          aria-label="Back to admin dashboard"
        >
          <FiArrowLeft size={20} className="mr-2 flex-shrink-0" /> Back to Dashboard
        </button>
      </div>
    </div>
  );
}
