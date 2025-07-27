// firebase-upload/upload.js

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Adjust this path if needed depending on your structure
import fragrances from "../data/fragrance.js" assert { type: "json" };

// Initialize Firebase
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function uploadData() {
  const batch = db.batch();
  const colRef = db.collection("fragrances");

  fragrances.forEach((fragrance) => {
    const docRef = colRef.doc(fragrance.id);
    batch.set(docRef, fragrance);
  });

  try {
    await batch.commit();
    console.log("🧴 Fragrances uploaded successfully!");
  } catch (err) {
    console.error("❌ Upload failed:", err);
  }
}

uploadData();
