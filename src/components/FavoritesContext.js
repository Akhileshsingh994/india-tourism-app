import React, { createContext, useState, useContext, useEffect } from "react";
import { authService as auth } from '../authentication/auth';
import { db } from "../firebase/config.js";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);

  // Listen for auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        const favRef = doc(db, "favorites", user.uid);

        // Real-time listener for this user's favorites
        const unsubscribeFavs = onSnapshot(favRef, (docSnap) => {
          if (docSnap.exists()) {
            setFavorites(docSnap.data().items || []);
          } else {
            setFavorites([]);
          }
        });

        return () => unsubscribeFavs();
      } else {
        setUserId(null);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addFavorite = async (destination) => {
    if (!userId) return;
    const favRef = doc(db, "favorites", userId);
    await setDoc(favRef, { items: arrayUnion(destination) }, { merge: true });
  };

  const removeFavorite = async (destinationId) => {
    if (!userId) return;
    const favRef = doc(db, "favorites", userId);
    await updateDoc(favRef, {
      items: arrayRemove(favorites.find((f) => f.id === destinationId))
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);