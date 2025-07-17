// src/pages/Admin/Customers.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { FiSearch } from 'react-icons/fi';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    async function fetchCustomers() {
      const q = collection(db, 'users');
      const snapshot = await getDocs(q);
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomers(users);
      setFilteredCustomers(users);
    }
    fetchCustomers();
  }, []);

  useEffect(() => {
    let items = [...customers];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(u =>
        (`${u.firstName} ${u.lastName}`.toLowerCase().includes(term)) ||
        u.email.toLowerCase().includes(term)
      );
    }
    if (sortOption === 'newest') {
      items.sort((a, b) => b.lastUpdated.seconds - a.lastUpdated.seconds);
    } else if (sortOption === 'oldest') {
      items.sort((a, b) => a.lastUpdated.seconds - b.lastUpdated.seconds);
    } else if (sortOption === 'name') {
      items.sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`.trim();
        const nameB = `${b.firstName} ${b.lastName}`.trim();
        return nameA.localeCompare(nameB);
      });
    }
    setFilteredCustomers(items);
  }, [searchTerm, sortOption, customers]);

  const formatDate = (ts) => ts?.toDate ? ts.toDate().toLocaleDateString() : '-';

  return (
    <div className="bg-off-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-near-black mb-8 text-center">Total Customers</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-1/2">
          <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent-red"
          />
        </div>
        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-accent-red"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase text-near-black border-near-black">Name</th>
                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase text-near-black border-near-black">Email</th>
                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase text-near-black border-near-black">Phone</th>
                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase text-near-black border-near-black">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-6 text-gray-500">No customers found.</td></tr>
              ) : (
                filteredCustomers.map((u) => {
                  const fullName = `${u.firstName} ${u.lastName}`.trim();
                  return (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 border-b text-sm text-near-black">{fullName || '-'}</td>
                      <td className="px-5 py-4 border-b text-sm text-near-black">{u.email}</td>
                      <td className="px-5 py-4 border-b text-sm text-near-black">{u.phoneNumber || '-'}</td>
                      <td className="px-5 py-4 border-b text-sm text-near-black">{formatDate(u.lastUpdated)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
