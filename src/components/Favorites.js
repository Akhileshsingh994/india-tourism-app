import React from 'react';
import { useFavorites } from './FavoritesContext';
import styled from 'styled-components';

const FavoritesContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

const FavoriteItem = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const FavoriteImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <FavoritesContainer>
      <h2 className="fade-in">Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite destinations added yet.</p>
      ) : (
        favorites.map((destination) => (
          <FavoriteItem key={destination.id} className="animated-card slide-in-up">
            <h3>{destination.name}</h3>
            <FavoriteImage src={destination.image} alt={destination.name} />
            <p>{destination.description}</p>
            <button className="animated-btn" onClick={() => removeFavorite(destination.id)}>
              Remove from Favorites
            </button>
          </FavoriteItem>
        ))
      )}
    </FavoritesContainer>
  );
};

export default Favorites;
