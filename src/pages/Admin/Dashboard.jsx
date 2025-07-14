// src/pages/Admin/Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Import Feather icons from react-icons
import { FiDollarSign, FiShoppingCart, FiUsers, FiPackage, FiBox, FiAlertTriangle } from 'react-icons/fi';

export default function Dashboard() {
  // Mock Data for Dashboard - This will eventually come from Firebase Firestore
  const [dashboardStats, setDashboardStats] = useState({
    totalSales: '$15,450.75',
    totalOrders: 320,
    totalCustomers: 45,
    pendingOrders: 12,
    lowStockItems: 3,
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 'ORD001', customer: 'Alice Smith', date: '2025-07-12', total: '$120.00', status: 'Processing' },
    { id: 'ORD002', customer: 'Bob Johnson', date: '2025-07-11', total: '$75.50', status: 'Shipped' },
    { id: 'ORD003', customer: 'Charlie Brown', date: '2025-07-11', total: '$210.00', status: 'Delivered' },
    { id: 'ORD004', customer: 'Diana Prince', date: '2025-07-10', total: '$99.99', status: 'Processing' },
    { id: 'ORD005', customer: 'Eve Adams', date: '2025-07-09', total: '$50.00', status: 'Delivered' },
  ]);

  const [topProducts, setTopProducts] = useState([
    { name: 'Enchanted Evening', sales: '85 units' },
    { name: 'Ocean Breeze', sales: '72 units' },
    { name: 'Mystic Woods', sales: '60 units' },
    { name: 'Golden Sunrise', sales: '55 units' },
  ]);

  return (
    <div className="bg-off-white min-h-[calc(100vh-128px)] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-near-black mb-10 text-center">
          Admin Dashboard
        </h1>

        <div className="space-y-8">

          {/* Key Metrics Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-near-black mb-6 text-center">Key Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

              {/* Total Sales */}
              <div className="flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                              text-near-black text-lg font-medium group text-center">
                <FiDollarSign size={32} className="mb-2" />
                <span className="leading-tight text-xl font-semibold mb-1">Total Sales</span>
                <span className="text-3xl font-bold text-near-black">{dashboardStats.totalSales}</span>
              </div>

              {/* Total Orders (clickable) */}
              <Link
                to="/admin/orders"
                className="flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                           text-near-black hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center no-underline"
              >
                <FiShoppingCart size={32} className="mb-2 group-hover:text-accent-red transition-colors" />
                <span className="leading-tight text-xl font-semibold mb-1">Total Orders</span>
                <span className="text-3xl font-bold text-near-black">{dashboardStats.totalOrders}</span>
              </Link>

              {/* Total Customers */}
              <div className="flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                              text-near-black hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center">
                <FiUsers size={32} className="mb-2 group-hover:text-accent-red transition-colors" />
                <span className="leading-tight text-xl font-semibold mb-1">Total Customers</span>
                <span className="text-3xl font-bold text-near-black">{dashboardStats.totalCustomers}</span>
              </div>

              {/* Pending Orders */}
              <div className="flex flex-col items-center justify-center py-4 px-6 border border-gray-300 rounded-md
                              text-near-black hover:bg-gray-50 transition-colors duration-200 text-lg font-medium group text-center">
                <FiPackage size={32} className="mb-2 group-hover:text-accent-red transition-colors" />
                <span className="leading-tight text-xl font-semibold mb-1">Pending Orders</span>
                <span className="text-3xl font-bold text-near-black">{dashboardStats.pendingOrders}</span>
              </div>

            </div>
          </div>

          {/* Recent Activity & Quick Links Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Recent Orders Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-near-black mb-6 text-center">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider text-near-black border-near-black">
                        Order ID
                      </th>
                      <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider text-near-black border-near-black">
                        Customer
                      </th>
                      <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider text-near-black border-near-black">
                        Date
                      </th>
                      <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider text-near-black border-near-black">
                        Total
                      </th>
                      <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider text-near-black border-near-black">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-5 py-5 border-b text-sm text-near-black border-[#D3D3D3]">{order.id}</td>
                        <td className="px-5 py-5 border-b text-sm text-near-black border-[#D3D3D3]">{order.customer}</td>
                        <td className="px-5 py-5 border-b text-sm text-near-black border-[#D3D3D3]">{order.date}</td>
                        <td className="px-5 py-5 border-b text-sm text-near-black border-[#D3D3D3]">{order.total}</td>
                        <td className="px-5 py-5 border-b text-sm border-[#D3D3D3]">
                          <span
                            className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                              order.status === 'Processing'
                                ? 'text-orange-900'
                                : order.status === 'Shipped'
                                ? 'text-blue-900'
                                : 'text-green-900'
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`absolute inset-0 opacity-50 rounded-full ${
                                order.status === 'Processing'
                                  ? 'bg-orange-200'
                                  : order.status === 'Shipped'
                                  ? 'bg-blue-200'
                                  : 'bg-green-200'
                              }`}
                            ></span>
                            <span className="relative">{order.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-6">
                <Link
                  to="/admin/orders"
                  className="inline-flex items-center justify-center bg-transparent border-2 border-accent-red text-accent-red px-6 py-2 rounded-md text-base font-semibold
                             hover:bg-accent-red hover:text-primary-background transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-red group"
                >
                  <FiPackage size={18} className="mr-2" />
                  View All Orders
                </Link>
              </div>
            </div>

            {/* Top Products & Quick Admin Links */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-near-black mb-6 text-center">Product Overview & Quick Links</h2>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-near-black mb-4">Top Selling Products</h3>
                <ul>
                  {topProducts.map((product, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-2 border-b last:border-b-0 border-[#D3D3D3]"
                    >
                      <span className="text-lg text-near-black">{product.name}</span>
                      <span className="text-md font-semibold text-near-black">{product.sales}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Admin Quick Links */}
              <div>
                <h3 className="text-xl font-semibold text-near-black mb-4">Quick Admin Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Link to Manage Products */}
                  <Link
                    to="/admin/products"
                    className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md
                               text-near-black hover:bg-gray-50 transition-colors duration-200 text-md font-medium group text-center"
                  >
                    <FiBox size={20} className="mr-2 group-hover:text-accent-red transition-colors" />
                    <span className="leading-tight">Manage Products</span>
                  </Link>
                  {/* Link for Low Stock Alert */}
                  <Link
                    to="/admin/inventory"
                    className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md
                               text-near-black hover:bg-gray-50 transition-colors duration-200 text-md font-medium group text-center"
                  >
                    <FiAlertTriangle size={20} className="mr-2 group-hover:text-accent-red transition-colors" />
                    <span className="leading-tight">Low Stock ({dashboardStats.lowStockItems})</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
