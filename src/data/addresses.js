// src/data/addresses.js
const addresses = [
  {
    id: 'addr1',
    fullName: 'John Doe',
    addressLine1: '123 Fragrance Lane',
    addressLine2: 'Apt 4B',
    city: 'Pretoria',
    province: 'Gauteng',
    postalCode: '0001',
    country: 'South Africa',
    phoneNumber: '+27 12 345 6789',
    isDefault: true, // Optional: if you want a default address
  },
  {
    id: 'addr2',
    fullName: 'Jane Smith',
    addressLine1: '45 Scent Boulevard',
    city: 'Cape Town',
    province: 'Western Cape',
    postalCode: '8001',
    country: 'South Africa',
    phoneNumber: '+27 21 987 6543',
    isDefault: false,
  },
];

export default addresses;