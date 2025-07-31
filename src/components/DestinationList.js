import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import destinations from './Destinations';
import { useFavorites } from './FavoritesContext'; // Update the import path


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
`;

const AddedButton = styled(Button)`
  background: #2ecc71; /* Green color for "Added to Favorites" */
`;

const DestinationList = () => {

	const { addFavorite, removeFavorite, favorites } = useFavorites(); // Access favorites and functions from FavoritesContext
	const [favoritesMap, setFavoritesMap] = useState(new Map());
	const [addedToFavorites, setAddedToFavorites] = useState(new Set());

  useEffect(() => {

    const favMap = new Map();
    favorites.forEach(favId => favMap.set(favId, true));
    setFavoritesMap(favMap);

	const addedSet = new Set(favorites.map(fav => fav.id));
    setAddedToFavorites(addedSet);
  }, [favorites]);

  const isFavorite = (id) => favoritesMap.has(id);

  
  const handleToggleFavorite = (destination) => {
    const { id } = destination;
    if (isFavorite(id)) {
      removeFavorite(id);
      setAddedToFavorites(prev => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    } else {
      addFavorite(destination);
      setAddedToFavorites(prev => new Set([...prev, id]));
    }
  };

  const isAddedToFavorites = (id) => addedToFavorites.has(id);

	
	return (
		<div style={
			{
				backgroundColor: "#c8e2fa",
				padding: "2%"
			}
		}>
			<List>
				{destinations.map((destination) => (
					<ListItem key={destination.id}>
						<Link to={`/destination/${destination.id}`}
							style={
								{
									textDecoration: 'none',
									color: '#333'
								}}>
							<Image src={destination.image}
								alt={destination.name} />
							<h3>{destination.name}</h3>
							<h5>{destination.bestTime}</h5>
							<h6>{destination.rating}</h6>
							</Link>
            {isAddedToFavorites(destination.id) ? (
              <AddedButton>Added to Favorites</AddedButton>
            ) : (
              <Button onClick={() => handleToggleFavorite(destination)}>
                {isFavorite(destination.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            )}
          </ListItem>
        ))}
      </List>
		</div>
	);
};
export default DestinationList;
