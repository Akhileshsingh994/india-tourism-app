// DestinationHook.js 

import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";

async function fetchDestinations() {
  const snapshot = await getDocs(collection(db, "destinations"));
  return snapshot.docs.map((doc) => ({
    id: doc.id, // Firestore auto-ID
    ...doc.data(),
  }));
}

function useDestinations() {
  const { data, isLoading, error } = useQuery(
    // ["destinations"], 
    // fetchDestinations, 
    {
      queryKey: ["destinations"],
      queryFn: fetchDestinations,
      staleTime: Infinity,            // never refetch automatically
      gcTime: Infinity,            // keep cache for full app session
      refetchOnWindowFocus: false,    // don’t refetch when tab focus changes
      refetchOnReconnect: false,      // don’t refetch on reconnect
      refetchOnMount: false           // don’t refetch on re-mount
    }
  );

  return { destinations: data || [], isLoading, error };
}

export default useDestinations;