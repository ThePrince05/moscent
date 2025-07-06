// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components and pages
import Navbar from './components/Navbar'; // Your existing Navbar
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetailPage from './pages/Product'; // Renamed import to match your file name
import CartPage from './pages/Cart'; // We will create this file
import FavoritesPage from './pages/Favorites'; // NEW: Import the Favorites page
import Orders from './pages/Orders'; // Your existing Orders page
import AdminDashboard from './pages/AdminDashboard'; // Your existing Admin Dashboard
import AdminOrders from './pages/AdminOrders'; // Your existing Admin Orders
import Footer from './components/Footer';

// Not needed for Phase 1 as we're lifting state
// import ScrollToTop from './components/ScrollToTop';

function App() {
  // State for the shopping cart
  // Each item in the cart will be an object: { product: {...productData}, quantity: 1, selectedSize?: string }
  const [cartItems, setCartItems] = useState([]);

  // NEW: State for favorite product IDs, stored as a Set for efficient lookups
  // Use a function for lazy initialization to read from localStorage only once
  const [favoriteProductIds, setFavoriteProductIds] = useState(() => {
    try {
      const storedFavourites = JSON.parse(localStorage.getItem('moScentFavourites')) || [];
      return new Set(storedFavourites);
    } catch (error) {
      console.error("Error loading favourites from local storage:", error);
      return new Set(); // Fallback to an empty Set on error
    }
  });

  // NEW: Effect to save favorites to localStorage whenever favoriteProductIds changes
  useEffect(() => {
    try {
      localStorage.setItem('moScentFavourites', JSON.stringify(Array.from(favoriteProductIds)));
    } catch (error) {
      console.error("Error saving favourites to local storage:", error);
    }
  }, [favoriteProductIds]); // Dependency array ensures this runs when favoriteProductIds changes


  // Function to add a product to the cart
  // Now also accepts selectedSize for ProductDetailPage
  const addToCart = (productToAdd, quantity = 1, selectedSize = null) => {
    setCartItems(prevItems => {
      // Create a unique ID for cart items, combining product ID and size if size matters
      // This ensures different sizes of the same product are separate cart entries
      const cartItemId = selectedSize ? `${productToAdd.id}-${selectedSize}` : productToAdd.id;

      const existingItem = prevItems.find(item => {
        const existingCartItemId = item.selectedSize ? `${item.product.id}-${item.selectedSize}` : item.product.id;
        return existingCartItemId === cartItemId;
      });

      if (existingItem) {
        // If product (with specific size) already in cart, increment quantity
        return prevItems.map(item => {
          const currentItemCartId = item.selectedSize ? `${item.product.id}-${item.selectedSize}` : item.product.id;
          return currentItemCartId === cartItemId
            ? { ...item, quantity: item.quantity + quantity } // Add the specified quantity
            : item;
        });
      } else {
        // If product not in cart, add it with specified quantity and size
        return [...prevItems, { product: productToAdd, quantity: quantity, selectedSize: selectedSize }];
      }
    });
  };

  // NEW: Function to add/remove a product from favorites
  const toggleFavourite = (productId) => {
    setFavoriteProductIds(prevFavorites => {
      const newFavorites = new Set(prevFavorites); // Create a new Set to avoid direct mutation
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites; // Return the new Set to update state
    });
  };

  // Function to remove a product from the cart
  // Now removes by a unique cart item ID (product ID + size)
  const removeFromCart = (cartProductId) => {
    setCartItems(prevItems => prevItems.filter(item => {
      const itemIdentifier = item.selectedSize ? `${item.product.id}-${item.selectedSize}` : item.product.id;
      return itemIdentifier !== cartProductId;
    }));
  };

  // Function to update quantity of a product in the cart
  // Now updates by a unique cart item ID (product ID + size)
  const updateQuantity = (cartProductId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => {
          const itemIdentifier = item.selectedSize ? `${item.product.id}-${item.selectedSize}` : item.product.id;
          return itemIdentifier !== cartProductId;
        });
      }
      return prevItems.map(item => {
        const itemIdentifier = item.selectedSize ? `${item.product.id}-${item.selectedSize}` : item.product.id;
        return itemIdentifier === cartProductId
          ? { ...item, quantity: newQuantity }
          : item;
      });
    });
  };


  return (
    <Router>
      {/* ScrollToTop is good, but for now focusing on cart. Can add back later if needed. */}
      {/* <ScrollToTop /> */}

      <div className="flex flex-col min-h-screen">
        {/* Pass the total number of items in the cart AND favorites to the Navbar */}
        <Navbar
          cartItemCount={cartItems.length}
          favoriteItemCount={favoriteProductIds.size} // Pass the count of favorited items
        />

        <div className="flex-grow">
          <Routes>
            {/* Customer-Facing */}
            <Route
              path="/"
              element={
                <Home
                  addToCart={addToCart}
                  toggleFavourite={toggleFavourite}
                  favoriteProductIds={favoriteProductIds} // MODIFIED: Pass favoriteProductIds to Home
                />
              }
            />
            {/* Pass addToCart, toggleFavourite, and favoriteProductIds to Catalog */}
            <Route
              path="/catalog"
              element={
                <Catalog
                  addToCart={addToCart}
                  toggleFavourite={toggleFavourite} // Pass the centralized function
                  favoriteProductIds={favoriteProductIds} // Pass the Set of favorite IDs
                />
              }
            />
            {/* Pass addToCart and toggleFavourite to ProductDetailPage (your Product.jsx) */}
            <Route
              path="/product/:id"
              element={
                <ProductDetailPage
                  addToCart={addToCart}
                  toggleFavourite={toggleFavourite} // Pass the centralized function
                  favoriteProductIds={favoriteProductIds} // Pass the Set of favorite IDs
                />
              }
            />
            <Route path="/orders" element={<Orders />} />

            {/* NEW: Cart Page Route */}
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              }
            />

            {/* NEW: Favorites Page Route */}
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  addToCart={addToCart} // Favorites page will need this
                  toggleFavourite={toggleFavourite} // Favorites page will need this
                  favoriteProductIds={favoriteProductIds} // Favorites page needs this to filter products
                />
              }
            />

            {/* Admin-Only - As per your provided App.jsx */}
            {/* You can re-introduce ProtectedRoute here when ready for Phase 2 */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />

            {/* Add a catch-all route for 404 or a redirect to home if desired */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;