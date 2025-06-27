// src/data/orders.js

import fragrances from './fragrances'; // Import your fragrance data

// Helper function to find a fragrance by its ID
const getFragranceDetails = (id) => {
  return fragrances.find(frag => frag.id === id);
};

const orders = [
  {
    id: 'ORD-20250627-001',
    userId: 'customer_1',
    date: '2025-06-25',
    total: 0, // Will be calculated dynamically
    status: 'Delivered',
    items: [
      { productId: '1', quantity: 1 }, // Versace Pour Homme
      { productId: '20', quantity: 1 }, // Armani Si
    ],
  },
  {
    id: 'ORD-20250627-002',
    userId: 'customer_2',
    date: '2025-06-24',
    total: 0,
    status: 'Shipped',
    items: [
      { productId: '3', quantity: 2 }, // Sauvage
    ],
  },
  {
    id: 'ORD-20250627-003',
    userId: 'customer_1',
    date: '2025-06-20',
    total: 0,
    status: 'Processing',
    items: [
      { productId: '8', quantity: 1 }, // Versace Eros
      { productId: '26', quantity: 1 }, // Good Girl
      { productId: '13', quantity: 1 }, // Scandal (Men)
    ],
  },
  {
    id: 'ORD-20250627-004',
    userId: 'admin_user', // Example for an admin order view
    date: '2025-06-18',
    total: 0,
    status: 'New Order',
    items: [
      { productId: '21', quantity: 3 }, // Light Blue (Women)
      { productId: '18', quantity: 1 }, // Acqua Di Gio
    ],
  },
  {
    id: 'ORD-20250627-005',
    userId: 'customer_3',
    date: '2025-06-15',
    total: 0,
    status: 'Cancelled',
    items: [
      { productId: '29', quantity: 1 }, // Black Opium
      { productId: '15', quantity: 1 }, // Legend
    ],
  },
];

// --- Dynamically populate item details and calculate total for each order ---
orders.forEach(order => {
  let orderTotal = 0;
  order.items = order.items.map(item => {
    const fragrance = getFragranceDetails(item.productId);
    if (fragrance) {
      const itemPrice = fragrance.price * item.quantity;
      orderTotal += itemPrice;
      return {
        productId: item.productId,
        name: fragrance.name,
        brand: fragrance.brand, // Include brand for better display
        quantity: item.quantity,
        price: fragrance.price,
        image: fragrance.image, // Include image for easier display in order details
      };
    }
    // Fallback if a fragrance ID isn't found (shouldn't happen if IDs are correct)
    return { ...item, name: 'Unknown Fragrance', price: 0 };
  });
  order.total = parseFloat(orderTotal.toFixed(2)); // Format total to 2 decimal places
});

export default orders;