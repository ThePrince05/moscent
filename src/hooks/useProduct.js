import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust if your firebase export path differs

export default function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    const docRef = doc(db, 'fragrances', id);
    getDoc(docRef)
      .then(docSnap => {
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Product not found');
        }
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
