// src/FavoritesContext.js
import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (destination) => {
    setFavorites((prevFavorites) => [...prevFavorites, destination]);
  };

  const removeFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((dest) => dest.id !== id)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
