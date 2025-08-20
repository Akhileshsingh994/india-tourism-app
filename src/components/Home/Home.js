import React, { useState } from 'react';
import useDestinations from '../DestinationHook';
import { useFavorites } from '../FavoritesContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    SearchBar,
    SearchInput,
    FilterSelect,
    DestinationsGrid,
    DestinationCard,
    CardImage,
    CardContent,
    CardTitle,
    CardSubtitle,
    CardDescription,
    CardFooter,
    Rating,
    FavoriteButton,

  } from './Home.styles';


const Destinations = () => {
  const { destinations = [], isLoading, error } = useDestinations();
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');

  // Get unique regions and seasons for filters
 const regions = [...new Set(destinations.map(d => d.region).filter(Boolean))];
  const seasons = [...new Set(destinations.map(d => d.bestTime).filter(Boolean))];

  // Filter destinations based on search and filters
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = !selectedRegion || destination.region === selectedRegion;
    const matchesSeason = !selectedSeason || destination.bestTime === selectedSeason;
    
    return matchesSearch && matchesRegion && matchesSeason;
  });

  const handleToggleFavorite = (destination) => {
    const isFavorite = favorites.some(fav => fav.id === destination.id);
    if (isFavorite) {
      removeFavorite(destination.id);
    } else {
      addFavorite(destination);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Discovering amazing destinations...</p>
        </div>
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <div className="text-center py-5">
          <h3>Failed to load destinations</h3>
          <p>{error.message}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">All Regions</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </FilterSelect>
        <FilterSelect
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
        >
          <option value="">All Seasons</option>
          {seasons.map(season => (
            <option key={season} value={season}>{season}</option>
          ))}
        </FilterSelect>
      </SearchBar>

      <DestinationsGrid>
        {filteredDestinations.map((destination) => {
          const isFavorite = favorites.some(fav => fav.id === destination.id);
          return (
            <DestinationCard key={destination.id}>
              <CardImage src={destination.image} alt={destination.name} />
              <CardContent>
                <CardTitle>{destination.name}</CardTitle>
                <CardSubtitle>
                  {destination.region && `${destination.region} • `}
                  Best Time: {destination.bestTime || 'Year-round'}
                </CardSubtitle>
                <CardDescription>
                  {destination.description}
                </CardDescription>
                <CardFooter>
                  <Rating>
                    ⭐ {destination.rating || '4.5'}
                  </Rating>
                  <FavoriteButton
                    $isFavorite={isFavorite}
                    onClick={() => handleToggleFavorite(destination)}
                  >
                    {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
                  </FavoriteButton>
                </CardFooter>
              </CardContent>
            </DestinationCard>
          );
        })}
      </DestinationsGrid>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-5">
          <h3>No destinations found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      )}
    </Container>
  );
};

export default Destinations;