import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SearchBar = styled.div`
  margin-bottom: 30px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SearchInput = styled.input`
  padding: 12px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 25px;
  font-size: 16px;
  min-width: 250px;
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const FilterSelect = styled.select`
  padding: 12px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 25px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

export const DestinationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

export const DestinationCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export const CardContent = styled.div`
  padding: 20px;
`;

export const CardTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.4rem;
`;

export const CardSubtitle = styled.p`
  color: #7f8c8d;
  margin: 0 0 15px 0;
  font-size: 0.9rem;
`;

export const CardDescription = styled.p`
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 15px;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #ecf0f1;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #f39c12;
  font-weight: bold;
`;

export const FavoriteButton = styled.button`
  background: ${props => props.$isFavorite ? '#2ecc71' : '#3498db'};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.isFavorite ? '#27ae60' : '#2980b9'};
    transform: scale(1.05);
  }
`;

export const HeroSection = styled.section`
  padding: 60px 20px;
  text-align: center;
  background: linear-gradient(120deg, #667eea, #764ba2);
  color: white;
  border-radius: 15px;
  margin-bottom: 40px;
`;

export const Header = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 15px;
`;

export const Subtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
`;

export const StatsSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 40px 0;
`;

export const StatCard = styled.div`
  text-align: center;
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
`;

export const StatLabel = styled.div`
  color: #7f8c8d;
`;