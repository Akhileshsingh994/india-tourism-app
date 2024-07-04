// DestinationDetail.js
import React from 'react';
import styled from 'styled-components';
import destinations from './Destinations';
import { useParams } from 'react-router-dom';


const DetailContainer = styled.div`
max-width: 600px;
margin: auto;
`;

const DetailImage = styled.img`
width: 100%;
height: auto;
border-radius: 8px;
margin-bottom: 20px;
`;

const DetailButton = styled.button`
background: #3498db;
color: #fff;
border: none;
padding: 10px;
border-radius: 4px;
cursor: pointer;
`;

const DestinationDetail = () => {
	const { id } = useParams();
	const destinationId = parseInt(id);
	const destination = destinations.find(dest => dest.id === destinationId);

	if (!destination) {
		return <div style={
			{
				textAlign: 'center'
			}}>
			Destination not found
		</div>;
	}

	const handleBookNow = () => {
		// Simulate opening a booking website in a new tab
		window.open('https://holidayz.makemytrip.com/holidays/international/search?packageIds=53934%2C54043%2C54284%2C56244%2C56245%2C56246%2C56247%2C56248%2C56249&redirectionPage=listing', 'make_my_trip');
	  };

	return (
		<DetailContainer>
			<h2>{destination.name}</h2>
			<DetailImage src={destination.image}
				alt={destination.name} />
			<p>{destination.description}</p>
			<p>Rating:
				{destination.rating || 'Not available'}
			</p>
			<p>
				Best time to visit:
				{destination.bestTime || 'Not specified'}
			</p>
			<DetailButton onClick={handleBookNow}>Book Now</DetailButton>
		</DetailContainer>
	);
};
export default DestinationDetail;
