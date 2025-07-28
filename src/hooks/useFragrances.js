import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getApp } from 'firebase/app';

// Your existing short description helper
const getShortDescription = (fullDescription) => {
  if (!fullDescription) return '';

  const sentenceEndings = /[.!?]/;
  const firstSentenceMatch = fullDescription.match(sentenceEndings);

  if (firstSentenceMatch) {
    const endIndex = fullDescription.indexOf(firstSentenceMatch[0]) + 1;
    if (endIndex > 150) {
      return fullDescription.substring(0, 150).trim() + '...';
    }
    return fullDescription.substring(0, endIndex).trim();
  }

  const maxLength = 120;
  if (fullDescription.length > maxLength) {
    return fullDescription.substring(0, maxLength).trim() + '...';
  }
  return fullDescription.trim();
};

export default function useFragrances() {
  const [fragrances, setFragrances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFragrances() {
      try {
        const db = getFirestore(getApp());
        const snapshot = await getDocs(collection(db, 'fragrances'));
        let data = snapshot.docs.map(doc => doc.data());

        // Add shortDescription
        data = data.map(frag => ({
          ...frag,
          shortDescription: getShortDescription(frag.longDescription),
        }));

        // Filter by category
        const menFragrances = data.filter(f => f.category === 'men');
        const womenFragrances = data.filter(f => f.category === 'women');
        const unisexFragrances = data.filter(f => f.category === 'unisex');

        // Slice like your original logic
        const firstFiveMen = menFragrances.slice(0, 5);
        const firstFiveWomen = womenFragrances.slice(0, 5);

        const remainingMen = menFragrances.slice(5);
        const remainingWomen = womenFragrances.slice(5);

        const combinedFragrances = [
          ...firstFiveMen,
          ...firstFiveWomen,
          ...remainingMen,
          ...remainingWomen,
          ...unisexFragrances,
        ];

        setFragrances(combinedFragrances);
      } catch (err) {
        console.error('Error fetching fragrances:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFragrances();
  }, []);

  return { fragrances, loading, error };
}
