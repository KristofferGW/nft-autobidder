import React from 'react';
import styled from 'styled-components';

function App() {
  const startBot = async () => {
    try {
      const response = await fetch('http://localhost:3000/combined-data?maxBid=5000000000000000&minDifference=1&collectionSlug=official-skulourful');
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error('Error starting bot', error);
    }
  };

  return (
    <AppContainer>
      <Header>
        <Title>NFT AutoBidder</Title>
        <Description>There will be a form here soon to fill in details</Description>
        <ActionButton onClick={startBot}>Start bot</ActionButton>
      </Header>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #2d2d2d;
  padding: 20px;
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  margin: 0;
`;

const Description = styled.p`
  margin: 10px 0;
`;

const ActionButton = styled.button`
  background-color: #61dafb;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #4fa3d1;
  }
`;


export default App;
