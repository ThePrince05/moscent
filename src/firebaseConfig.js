// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication service
import { getFirestore } from 'firebase/firestore'; // Import Firestore service

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF282LgwIw9B9aGrwKurpY2j7vQU5kjNc",
  authDomain: "moscent-5c0a3.firebaseapp.com",
  projectId: "moscent-5c0a3",
  storageBucket: "moscent-5c0a3.firebasestorage.app",
  messagingSenderId: "236131052141",
  appId: "1:236131052141:web:c1f03cfdd2b336f9f02d64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // Get the Authentication service instance
const db = getFirestore(app); // Get the Firestore service instance

export { auth, db,app }; // Export them for use in other components