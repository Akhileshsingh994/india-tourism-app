import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useDestinations from "./Destinations"; // 🔹 updated to fetch from Firestore
import { useFavorites } from "./FavoritesContext";

// 🔹 Styles
const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  text-align: center;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 550px;
  height: 350px;
  border-radius: 8px;
  object-fit: cover;
`;

const Button = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const AddedButton = styled(Button)`
  background: #2ecc71; /* Green color for "Added to Favorites" */
`;

// 🔹 Component
const DestinationList = () => {
  const { destinations, loading } = useDestinations(); // fetch from Firestore
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const [favoritesMap, setFavoritesMap] = useState(new Map());
  const [addedToFavorites, setAddedToFavorites] = useState(new Set());

  // Sync favorites from context
  useEffect(() => {
    const favMap = new Map();
    favorites.forEach((favId) => favMap.set(favId, true));
    setFavoritesMap(favMap);

    const addedSet = new Set(favorites.map((fav) => fav.id));
    setAddedToFavorites(addedSet);
  }, [favorites]);

  const isFavorite = (id) => favoritesMap.has(id);

  const handleToggleFavorite = (destination) => {
    const { id } = destination;
    if (isFavorite(id)) {
      removeFavorite(id);
      setAddedToFavorites((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    } else {
      addFavorite(destination);
      setAddedToFavorites((prev) => new Set(prev).add(id));
    }
  };

  // Show loading state
  if (loading) {
    return <p>Loading destinations...</p>;
  }

  return (
    <List className="fade-in">
      {destinations.map((destination) => (
        <ListItem
          key={destination.id}
          className="animated-card slide-in-up"
        >
          <Link
            to={`/destination/${destination.id}`}
            style={{ textDecoration: "none", color: "#333" }}
          >
            <Image src={destination.image} alt={destination.name} />
            <h3>{destination.name}</h3>
            <h5>{destination.bestTime}</h5>
            <h6>{destination.rating}</h6>
          </Link>
          <p>{destination.description}</p>
          {addedToFavorites.has(destination.id) ? (
            <AddedButton
              className="animated-btn"
              onClick={() => handleToggleFavorite(destination)}
            >
              Added to Favorites
            </AddedButton>
          ) : (
            <Button
              className="animated-btn"
              onClick={() => handleToggleFavorite(destination)}
            >
              {isFavorite(destination.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </Button>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default DestinationList;