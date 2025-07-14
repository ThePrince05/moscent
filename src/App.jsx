// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth, db } from './firebaseConfig'; // Import auth and db instances
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  onSnapshot, // Import onSnapshot for real-time listeners
  writeBatch // Import writeBatch for atomic operations
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Import your components and pages
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetailPage from './pages/Product'; 
import CartPage from './pages/Cart';
import FavoritesPage from './pages/Favorites';
import Orders from './pages/Orders';
import Dashboard from './pages/Admin/Dashboard';
import Auth from './pages/Auth';
import MyAccount from './pages/MyAccount'; 
import ShippingAddresses from './pages/Account/ShippingAddresses'; 
import PersonalDetails from './pages/Account/PersonalDetails';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import ChangePassword from './pages/Account/ChangePassword';
import ChangeEmail from './pages/Account/ChangeEmail';



function App() {
  // --- AUTHENTICATION & LOADING STATES ---
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Tracks if auth state is being checked

  // --- CART STATE & LOCAL STORAGE INITIALIZATION ---
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('moScentCart')) || [];
      // console.log("Initializing cart from localStorage:", storedCart); // DEBUG
      return storedCart;
    } catch (error) {
      console.error("Error loading cart from local storage during initialization:", error);
      return []; // Fallback to an empty array on error
    }
  });

  // --- FAVORITES STATE & LOCAL STORAGE INITIALIZATION ---
  const [favoriteProductIds, setFavoriteProductIds] = useState(() => {
    try {
      const storedFavourites = JSON.parse(localStorage.getItem('moScentFavourites')) || [];
      // console.log("Initializing favorites from localStorage:", storedFavourites); // DEBUG
      return new Set(storedFavourites);
    } catch (error) {
      console.error("Error loading favourites from local storage during initialization:", error);
      return new Set(); // Fallback to an empty Set on error
    }
  });

  // Helper to get current user UID or null for anonymous operations
  const getCurrentUserUid = useCallback(() => currentUser?.uid, [currentUser]);

  // --- useEffect to handle Auth State Changes and Data Sync ---
  useEffect(() => {
    let unsubscribeCart = () => {};
    let unsubscribeFavorites = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false); // Auth state determined

       if (!user || !user.emailVerified) {
        // If no user, or user isn’t verified yet, skip Firestore syncing entirely
        unsubscribeCart();
        unsubscribeFavorites();
        setCartItems(JSON.parse(localStorage.getItem('moScentCart')) || []);
        setFavoriteProductIds(new Set(JSON.parse(localStorage.getItem('moScentFavourites')) || []));
        return;
      }

      if (user) {
        // User is logged in
        console.log("User logged in:", user.uid);

        const userCartCollectionRef = collection(db, 'users', user.uid, 'cart');
        const userFavoritesCollectionRef = collection(db, 'users', user.uid, 'favorites');

        // Merge logic on login
        const mergeData = async () => {
          const localCart = JSON.parse(localStorage.getItem('moScentCart')) || [];
          const localFavorites = JSON.parse(localStorage.getItem('moScentFavourites')) || [];
          // console.log("Local storage cart before merge:", localCart); // DEBUG
          // console.log("Local storage favorites before merge:", localFavorites); // DEBUG

          try {
            const [firestoreCartSnapshot, firestoreFavoritesSnapshot] = await Promise.all([
              getDocs(userCartCollectionRef),
              getDocs(userFavoritesCollectionRef),
            ]);

            const firestoreCart = firestoreCartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const firestoreFavorites = new Set(firestoreFavoritesSnapshot.docs.map(doc => doc.id));
            // console.log("Firestore cart before merge:", firestoreCart); // DEBUG
            // console.log("Firestore favorites before merge:", Array.from(firestoreFavorites)); // DEBUG

            const mergedCartMap = new Map();
            firestoreCart.forEach(item => {
              const itemKey = item.selectedSize ? `${item.productId}-${item.selectedSize}` : item.productId;
              mergedCartMap.set(itemKey, { ...item });
            });

            for (const localItem of localCart) {
              // Ensure localItem.product exists and has an id
              if (!localItem.product || !localItem.product.id) {
                  console.warn("Skipping malformed local cart item:", localItem);
                  continue;
              }
              const itemKey = localItem.selectedSize ? `${localItem.product.id}-${localItem.selectedSize}` : localItem.product.id;
              if (mergedCartMap.has(itemKey)) {
                const existingItem = mergedCartMap.get(itemKey);
                mergedCartMap.set(itemKey, {
                  ...existingItem,
                  quantity: existingItem.quantity + localItem.quantity,
                });
              } else {
                mergedCartMap.set(itemKey, {
                  productId: localItem.product.id,
                  name: localItem.product.name || 'Unknown Fragrance',
                  brand: localItem.product.brand || 'N/A',
                  price: localItem.product.price || 0,
                  imageUrl: localItem.product.image || 'https://via.placeholder.com/150',
                  selectedSize: localItem.selectedSize || null,
                  quantity: localItem.quantity,
                  addedAt: serverTimestamp(),
                });
              }
            }

            const mergedFavorites = new Set(firestoreFavorites);
            localFavorites.forEach(productId => mergedFavorites.add(productId));
            // console.log("Merged cart map after local merge:", Array.from(mergedCartMap.values())); // DEBUG
            // console.log("Merged favorites set after local merge:", Array.from(mergedFavorites)); // DEBUG

            const batch = writeBatch(db);

            // Process merged cart items for Firestore updates/adds
            for (const [key, itemData] of mergedCartMap.entries()) {
              // Check if the item already exists in Firestore by its product ID and size
              const existingFirestoreDoc = firestoreCart.find(
                  fsItem => (fsItem.productId === itemData.productId) && (fsItem.selectedSize === itemData.selectedSize)
              );

              if (existingFirestoreDoc) {
                  // Update existing Firestore item
                  const docRef = doc(db, 'users', user.uid, 'cart', existingFirestoreDoc.id);
                  batch.update(docRef, {
                      quantity: itemData.quantity,
                      // Ensure addedAt is not overwritten if it exists
                      addedAt: existingFirestoreDoc.addedAt || serverTimestamp()
                  });
              } else {
                  // Add new item to Firestore
                  const newDocRef = doc(userCartCollectionRef); // Let Firestore generate ID
                  batch.set(newDocRef, {
                      productId: itemData.productId,
                      name: itemData.name,
                      brand: itemData.brand,
                      price: itemData.price,
                      imageUrl: itemData.imageUrl,
                      selectedSize: itemData.selectedSize,
                      quantity: itemData.quantity,
                      addedAt: serverTimestamp(), // Use serverTimestamp for newly added items
                  });
              }
            }

            // Process merged favorites for Firestore adds
            for (const productId of mergedFavorites) {
              if (!firestoreFavorites.has(productId)) { // If it's a new favorite (from local storage)
                batch.set(doc(userFavoritesCollectionRef, productId), { addedAt: serverTimestamp() });
              }
            }

            await batch.commit();
            console.log("Firestore merge batch committed."); // DEBUG

            // Clear local storage as data is now in Firestore
            localStorage.removeItem('moScentCart');
            localStorage.removeItem('moScentFavourites');
            console.log("Local storage cleared after successful merge."); // DEBUG

          } catch (error) {
            console.error("Error during Firestore merge/sync process:", error);
            // Fallback: If merge fails, revert to local storage data
            setCartItems(localCart);
            setFavoriteProductIds(new Set(localFavorites));
            console.log("Fallback: React state loaded from local storage due to merge error."); // DEBUG
          }
        };

        await mergeData(); // Run merge on login

        // Set up real-time listeners for authenticated user's cart and favorites
        unsubscribeCart = onSnapshot(userCartCollectionRef, (snapshot) => {
          const updatedCart = snapshot.docs.map(doc => ({
            id: doc.id,
            productId: doc.data().productId,
            name: doc.data().name,
            brand: doc.data().brand,
            price: doc.data().price,
            imageUrl: doc.data().imageUrl,
            quantity: doc.data().quantity,
            selectedSize: doc.data().selectedSize || null,
          }));
          setCartItems(updatedCart);
          // console.log("Real-time cart update:", updatedCart); // DEBUG
        }, (error) => {
          console.error("Error listening to cart changes:", error);
        });

        unsubscribeFavorites = onSnapshot(userFavoritesCollectionRef, (snapshot) => {
          const updatedFavorites = new Set(snapshot.docs.map(doc => doc.id));
          setFavoriteProductIds(updatedFavorites);
          // console.log("Real-time favorites update:", Array.from(updatedFavorites)); // DEBUG
        }, (error) => {
          console.error("Error listening to favorites changes:", error);
        });

      } else {
        // User is logged out
        console.log("User logged out. Re-initializing state from local storage."); // DEBUG
        // Unsubscribe from Firestore listeners when user logs out
        unsubscribeCart();
        unsubscribeFavorites();

        // When logged out, reset React state from local storage to enable anonymous functionality
        const currentLocalCart = JSON.parse(localStorage.getItem('moScentCart')) || [];
        const currentLocalFavs = JSON.parse(localStorage.getItem('moScentFavourites')) || [];
        setCartItems(currentLocalCart);
        setFavoriteProductIds(new Set(currentLocalFavs));
      }
    });

    return () => {
      unsubscribeAuth(); // Cleanup auth listener
      unsubscribeCart(); // Cleanup cart listener
      unsubscribeFavorites(); // Cleanup favorites listener
    };
  }, []); // Empty dependency array means this runs once on mount

  // --- Cart Functions (Modified for Firestore/Local Storage) ---
  const addToCart = async (productToAdd, quantity = 1, selectedSize = null) => {
    const userUid = getCurrentUserUid();
    // Use productToAdd.id directly as productId in Firestore documents
    const cartItemIdentifier = selectedSize ? `${productToAdd.id}-${selectedSize}` : productToAdd.id;

    try {
      if (userUid) {
        // LOGGED IN: Use Firestore
        // console.log("addToCart: User is logged in. Using Firestore."); // DEBUG
        const userCartRef = collection(db, 'users', userUid, 'cart');
        const q = query(userCartRef,
          where('productId', '==', productToAdd.id),
          where('selectedSize', '==', selectedSize || null)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docToUpdate = querySnapshot.docs[0];
          // console.log("addToCart: Item exists, updating quantity in Firestore."); // DEBUG
          await updateDoc(doc(db, 'users', userUid, 'cart', docToUpdate.id), {
            quantity: docToUpdate.data().quantity + quantity,
          });
        } else {
          // console.log("addToCart: Item new, adding to Firestore."); // DEBUG
          await addDoc(userCartRef, {
            productId: productToAdd.id,
            name: productToAdd.name || 'Unknown Fragrance',
            brand: productToAdd.brand || 'N/A',
            price: productToAdd.price || 0,
            imageUrl: productToAdd.image || 'https://via.placeholder.com/150', // Assuming 'image' field for productToAdd
            selectedSize: selectedSize || null,
            quantity: quantity,
            addedAt: serverTimestamp(),
          });
        }
      } else {
        // ANONYMOUS: Use Local Storage
        // console.log("addToCart: User is anonymous. Using Local Storage."); // DEBUG
        setCartItems(prevItems => {
          const existingItemIndex = prevItems.findIndex(item => {
            const currentItemIdentifier = item.selectedSize ? `${item.product.id}-${item.selectedSize}` : item.product.id;
            return currentItemIdentifier === cartItemIdentifier;
          });

          let newItems;
          if (existingItemIndex > -1) {
            newItems = prevItems.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...prevItems, { product: productToAdd, quantity: quantity, selectedSize: selectedSize || null }];
          }

          try {
            localStorage.setItem('moScentCart', JSON.stringify(newItems));
            // console.log("addToCart: Cart saved to local storage:", newItems); // DEBUG
          } catch (error) {
            console.error("addToCart: Error saving cart to local storage:", error);
          }
          return newItems;
        });
      }
    } catch (error) {
      console.error("Error in addToCart:", error);
    }
  };

  const removeFromCart = async (cartProductId) => {
    const userUid = getCurrentUserUid();

    try {
      if (userUid) {
        // LOGGED IN: Use Firestore
        // console.log("removeFromCart: User is logged in. Using Firestore. cartProductId:", cartProductId); // DEBUG
        const userCartRef = collection(db, 'users', userUid, 'cart');

        const parts = String(cartProductId).split('-');
        const productId = parts[0];
        const selectedSize = parts.length > 1 ? parts[1] : null;

        const q = query(userCartRef,
          where('productId', '==', productId),
          where('selectedSize', '==', selectedSize)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docToDelete = querySnapshot.docs[0];
          // console.log("removeFromCart: Removing item from Firestore with doc ID:", docToDelete.id); // DEBUG
          await deleteDoc(doc(db, 'users', userUid, 'cart', docToDelete.id));
          // State will be updated by the onSnapshot listener
        } else {
          console.warn("removeFromCart: Item not found in Firestore for cartProductId:", cartProductId);
        }
      } else {
        // ANONYMOUS: Use Local Storage
        // console.log("removeFromCart: User is anonymous. Using Local Storage. cartProductId:", cartProductId); // DEBUG
        setCartItems(prevItems => {
          const newItems = prevItems.filter(item => {
            const itemIdentifier = item.selectedSize ? `${item.product.id}-${item.selectedSize}` : item.product.id;
            return itemIdentifier !== cartProductId;
          });
          try {
            localStorage.setItem('moScentCart', JSON.stringify(newItems));
            // console.log("removeFromCart: Cart removed from local storage:", newItems); // DEBUG
          } catch (error) {
            console.error("removeFromCart: Error removing cart item from local storage:", error);
          }
          return newItems;
        });
      }
    } catch (error) {
      console.error("Error in removeFromCart:", error);
    }
  };

  const updateQuantity = async (cartProductId, newQuantity) => {
    const userUid = getCurrentUserUid();

    try {
      if (userUid) {
        // LOGGED IN: Use Firestore
        // console.log("updateQuantity: User is logged in. Using Firestore. cartProductId:", cartProductId, "newQuantity:", newQuantity); // DEBUG
        if (newQuantity <= 0) {
          // console.log("updateQuantity: Quantity <= 0, calling removeFromCart."); // DEBUG
          await removeFromCart(cartProductId);
          return;
        }

        const userCartRef = collection(db, 'users', userUid, 'cart');
        const parts = String(cartProductId).split('-');
        const productId = parts[0];
        const selectedSize = parts.length > 1 ? parts[1] : null;

        const q = query(userCartRef,
          where('productId', '==', productId),
          where('selectedSize', '==', selectedSize)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docToUpdate = querySnapshot.docs[0];
          // console.log("updateQuantity: Updating quantity in Firestore for doc ID:", docToUpdate.id); // DEBUG
          await updateDoc(doc(db, 'users', userUid, 'cart', docToUpdate.id), {
            quantity: newQuantity,
          });
          // State will be updated by the onSnapshot listener
        } else {
          console.warn("updateQuantity: Item not found in Firestore for cartProductId:", cartProductId);
        }
      } else {
        // ANONYMOUS: Use Local Storage
        // console.log("updateQuantity: User is anonymous. Using Local Storage. cartProductId:", cartProductId, "newQuantity:", newQuantity); // DEBUG
        setCartItems(prevItems => {
          if (newQuantity <= 0) {
            const newItems = prevItems.filter(item => {
              const itemIdentifier = item.selectedSize ? `${item.product.id}-${item.selectedSize}` : item.product.id;
              return itemIdentifier !== cartProductId;
            });
            try {
              localStorage.setItem('moScentCart', JSON.stringify(newItems));
              // console.log("updateQuantity: Quantity <= 0, item removed from local storage:", newItems); // DEBUG
            } catch (error) {
              console.error("updateQuantity: Error updating cart quantity to 0 or removing from local storage:", error);
            }
            return newItems;
          }

          const newItems = prevItems.map(item => {
            const itemIdentifier = item.selectedSize ? `${item.product.id}-${item.selectedSize}` : item.product.id;
            return itemIdentifier === cartProductId
              ? { ...item, quantity: newQuantity }
              : item;
          });
          try {
            localStorage.setItem('moScentCart', JSON.stringify(newItems));
            // console.log("updateQuantity: Cart quantity updated in local storage:", newItems); // DEBUG
          } catch (error) {
            console.error("updateQuantity: Error updating cart quantity in local storage:", error);
          }
          return newItems;
        });
      }
    } catch (error) {
      console.error("Error in updateQuantity:", error);
    }
  };

  // New function to clear the cart after a successful checkout
  const clearCart = async () => {
    const userUid = getCurrentUserUid();
    try {
      if (userUid) {
        // Logged in: Clear Firestore cart
        const userCartRef = collection(db, 'users', userUid, 'cart');
        const querySnapshot = await getDocs(userCartRef);
        const batch = writeBatch(db);
        querySnapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        console.log("Firestore cart cleared.");
        // State will be updated by the onSnapshot listener
      } else {
        // Anonymous: Clear local storage cart
        localStorage.removeItem('moScentCart');
        setCartItems([]);
        console.log("Local storage cart cleared.");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };


  // --- Favorites Function (Modified for Firestore/Local Storage) ---
  const toggleFavourite = async (productId) => {
    const userUid = getCurrentUserUid();

    try {
      if (userUid) {
        // LOGGED IN: Use Firestore
        // console.log("toggleFavourite: User is logged in. Using Firestore. Product ID:", productId); // DEBUG
        const userFavoritesDocRef = doc(db, 'users', userUid, 'favorites', productId);
        const favoriteDoc = await getDoc(userFavoritesDocRef);

        if (favoriteDoc.exists()) {
          // console.log("toggleFavourite: Item exists, unfavoriting from Firestore."); // DEBUG
          await deleteDoc(userFavoritesDocRef);
        } else {
          // console.log("toggleFavourite: Item new, adding to Firestore."); // DEBUG
          await setDoc(userFavoritesDocRef, { addedAt: serverTimestamp() });
        }
        // State will be updated by the onSnapshot listener
      } else {
        // ANONYMOUS: Use Local Storage
        // console.log("toggleFavourite: User is anonymous. Using Local Storage. Product ID:", productId); // DEBUG
        setFavoriteProductIds(prevFavorites => {
          const newFavorites = new Set(prevFavorites);
          if (newFavorites.has(productId)) {
            newFavorites.delete(productId);
          } else {
            newFavorites.add(productId);
          }
          try {
            localStorage.setItem('moScentFavourites', JSON.stringify(Array.from(newFavorites)));
            // console.log("toggleFavourite: Favorites saved to local storage:", Array.from(newFavorites)); // DEBUG
          } catch (error) {
            console.error("toggleFavourite: Error saving favorites to local storage:", error);
          }
          return newFavorites;
        });
      }
    } catch (error) {
      console.error("Error in toggleFavourite:", error);
    }
  };


  // --- Render based on Authentication Loading State ---
  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F2F4F3] text-[#0A0908]">
        <svg className="animate-spin h-10 w-10 text-[#D6001A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-3 text-xl">Loading application...</span>
      </div>
    );
  }

  // --- Main App Render ---
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar
          cartItemCount={cartItems.length}
          favoriteItemCount={favoriteProductIds.size}
        />
        <div className="flex-grow">
          <Routes>
            {/* Public Customer-Facing Routes */}
            <Route
              path="/"
              element={
                <Home
                  addToCart={addToCart}
                  toggleFavourite={toggleFavourite}
                  favoriteProductIds={favoriteProductIds}
                />
              }
            />
            <Route
              path="/catalog"
              element={
                <Catalog
                  addToCart={addToCart}
                  toggleFavourite={toggleFavourite}
                  favoriteProductIds={favoriteProductIds}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetailPage
                  addToCart={addToCart}
                  toggleFavourite={toggleFavourite}
                  favoriteProductIds={favoriteProductIds}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart} // Pass clearCart function
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  addToCart={addToCart}
                  toggleFavourite={toggleFavourite}
                  favoriteProductIds={favoriteProductIds}
                />
              }
            />

            <Route path="/auth" element={<Auth />} />

            {/* PROTECTED ROUTES */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            {/* MyAccount Route - Now Protected */}
            <Route
              path="/my-account" 
              element={
                <ProtectedRoute>
                  <MyAccount /> {/* Render the MyAccount component */}
                </ProtectedRoute>
              }
            />

            {/* Admin-Only Routes - Now Protected */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
           
            <Route
              path="/account/shipping-addresses"
              element={
                <ProtectedRoute>
                  <ShippingAddresses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/personal-details"
              element={
                <ProtectedRoute>
                  <PersonalDetails />
                </ProtectedRoute>
              }
            />
             <Route
              path="/account/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/change-email"
              element={
                <ProtectedRoute>
                  <ChangeEmail/>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;