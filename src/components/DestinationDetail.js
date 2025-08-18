import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useDestinations from "./Destinations"; // ✅ use the hook

const DetailContainer = styled.div`
  text-align: center;
  max-width: 600px;
  margin: auto;
  border-radius: 8px;
  margin-bottom: 20px;
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
  margin-bottom: 10px;
`;

const DestinationDetail = () => {
  const { id } = useParams();
  const { destinations, loading } = useDestinations(); // ✅ fetch from Firestore

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading destination...</p>;
  }

  const destination = destinations.find((dest) => dest.id === id); 
  // NOTE: Firestore ids are strings, not numbers → no parseInt needed

  if (!destination) {
    return <div style={{ textAlign: "center" }}>Destination not found</div>;
  }

  const handleBookNow = () => {
    window.open(
      "https://holidayz.makemytrip.com/holidays/international/search?packageIds=53934%2C54043%2C54284%2C56244%2C56245%2C56246%2C56247%2C56248%2C56249&redirectionPage=listing",
      "make_my_trip"
    );
  };

  return (
    <DetailContainer className="fade-in animated-card">
      <h2>{destination.name}</h2>
      <DetailImage src={destination.image} alt={destination.name} />
      <p>{destination.description}</p>
      <p>Rating: {destination.rating || "Not available"}</p>
      <p>Best time to visit: {destination.bestTime || "Not specified"}</p>
      <DetailButton className="animated-btn" onClick={handleBookNow}>
        Book Now
      </DetailButton>
    </DetailContainer>
  );
};

export default DestinationDetail;