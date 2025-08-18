// Destinations.js (updated to fetch from Firestore)

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";

function useDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const querySnapshot = await getDocs(collection(db, "destinations"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id, // Firestore auto-ID
          ...doc.data(),
        }));
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinations();
  }, []);

  return { destinations, loading };
}

export default useDestinations;