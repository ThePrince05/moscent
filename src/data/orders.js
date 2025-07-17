import fragrances from './fragrances'; // Import your fragrance data

// Helper function to find a fragrance by its ID
const getFragranceDetails = (id) => {
  return fragrances.find(frag => frag.id === id);
};

const orders = [
  {
    id: 'ORD-20250627-001',
    userId: 'customer_1',
    userEmail: 'alice@example.com',
    date: '2025-06-25',
    createdAt: new Date('2025-06-25T10:00:00Z'),
    updatedAt: new Date('2025-06-25T12:00:00Z'),
    shippingAddress: {
      street: '123 Main St',
      city: 'Cape Town',
      zip: '8000',
    },
    status: 'Delivered',
    total: 0,
    items: [
      { productId: '1', quantity: 1 },
      { productId: '20', quantity: 1 },
    ],
  },
  {
    id: 'ORD-20250627-002',
    userId: 'customer_2',
    userEmail: 'bob@example.com',
    date: '2025-06-24',
    createdAt: new Date('2025-06-24T09:30:00Z'),
    updatedAt: new Date('2025-06-24T11:15:00Z'),
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Johannesburg',
      zip: '2000',
    },
    status: 'Shipped',
    total: 0,
    items: [
      { productId: '3', quantity: 2 },
    ],
  },
  {
    id: 'ORD-20250627-003',
    userId: 'customer_1',
    userEmail: 'alice@example.com',
    date: '2025-06-20',
    createdAt: new Date('2025-06-20T08:00:00Z'),
    updatedAt: new Date('2025-06-20T09:00:00Z'),
    shippingAddress: {
      street: '123 Main St',
      city: 'Cape Town',
      zip: '8000',
    },
    status: 'Processing',
    total: 0,
    items: [
      { productId: '8', quantity: 1 },
      { productId: '26', quantity: 1 },
      { productId: '13', quantity: 1 },
    ],
  },
  {
    id: 'ORD-20250627-004',
    userId: 'admin_user',
    userEmail: 'admin@example.com',
    date: '2025-06-18',
    createdAt: new Date('2025-06-18T14:45:00Z'),
    updatedAt: new Date('2025-06-18T15:00:00Z'),
    shippingAddress: {
      street: '789 Pine Rd',
      city: 'Durban',
      zip: '4001',
    },
    status: 'New Order',
    total: 0,
    items: [
      { productId: '21', quantity: 3 },
      { productId: '18', quantity: 1 },
    ],
  },
  {
    id: 'ORD-20250627-005',
    userId: 'customer_3',
    userEmail: 'carol@example.com',
    date: '2025-06-15',
    createdAt: new Date('2025-06-15T07:15:00Z'),
    updatedAt: new Date('2025-06-15T08:00:00Z'),
    shippingAddress: {
      street: '321 Maple St',
      city: 'Pretoria',
      zip: '0002',
    },
    status: 'Cancelled',
    total: 0,
    items: [
      { productId: '29', quantity: 1 },
      { productId: '15', quantity: 1 },
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
        brand: fragrance.brand,
        quantity: item.quantity,
        price: fragrance.price,
        image: fragrance.image,
      };
    }
    return { ...item, name: 'Unknown Fragrance', price: 0 };
  });
  order.total = parseFloat(orderTotal.toFixed(2));
});

export default orders;
