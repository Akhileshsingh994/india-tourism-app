import React from 'react';
import { useFavorites } from './FavoritesContext';
import styled from 'styled-components';
import '../App.css';
import '../styles/animations.css';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const EmptyStateTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 10px;
`;

const EmptyStateText = styled.p`
  font-size: 1.1rem;
`;

const DestinationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

const DestinationCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  
  &.animated-card {
    transition: box-shadow 0.3s, transform 0.3s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    
    &:hover {
      box-shadow: 0 8px 24px rgba(0,0,0,0.18);
      transform: translateY(-6px) scale(1.03);
    }
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.4rem;
`;

const CardSubtitle = styled.p`
  color: #7f8c8d;
  margin: 0 0 15px 0;
  font-size: 0.9rem;
`;

const CardDescription = styled.p`
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #ecf0f1;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #f39c12;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c0392b;
    transform: scale(1.05);
  }
`;

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <Container>
      <Header className="fade-in">
        <Title>Your Favorites</Title>
        <Subtitle>
          {favorites.length === 0 
            ? 'Start exploring and add destinations to your favorites'
            : `${favorites.length} ${favorites.length === 1 ? 'destination' : 'destinations'} saved`}
        </Subtitle>
      </Header>

      {favorites.length === 0 ? (
        <EmptyState className="fade-in slide-in-up">
          <EmptyStateIcon>❤️</EmptyStateIcon>
          <EmptyStateTitle>No favorites yet</EmptyStateTitle>
          <EmptyStateText>
            Discover amazing destinations and add them to your favorites to see them here.
          </EmptyStateText>
        </EmptyState>
      ) : (
        <DestinationsGrid className="fade-in">
          {favorites.map((destination) => (
            <DestinationCard key={destination.id} className="animated-card slide-in-up">
              <CardImage src={destination.image} alt={destination.name} />
              <CardContent>
                <CardTitle>{destination.name}</CardTitle>
                <CardSubtitle>
                  {destination.region && `${destination.region} • `}
                  {destination.bestTime ? `Best Time: ${destination.bestTime}` : 'Year-round'}
                </CardSubtitle>
                <CardDescription>
                  {destination.description}
                </CardDescription>
                <CardFooter>
                  <Rating>
                    ⭐ {destination.rating || '4.5'}
                  </Rating>
                  <RemoveButton 
                    className="animated-btn" 
                    onClick={() => removeFavorite(destination.id)}
                  >
                    ❤️ Remove
                  </RemoveButton>
                </CardFooter>
              </CardContent>
            </DestinationCard>
          ))}
        </DestinationsGrid>
      )}
    </Container>
  );
};

export default Favorites;
