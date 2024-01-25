import React from 'react';
import styled from 'styled-components';
import BotForm from './components/BotForm';

function App() {

  return (
    <AppContainer>
      <Header>
        <Title>NFT AutoBidder</Title>
        <BotForm />
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


export default App;
