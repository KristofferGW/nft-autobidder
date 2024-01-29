import React, { useState } from 'react';
import styled from 'styled-components';
import BotForm from './components/BotForm';
import ConnectWalletButton from './components/ConnectWalletButton';

function App() {
  const [isBotRunning, setIsBotRunning] = useState(false);

  return (
    <AppContainer>
      <Header>
        <Title>NFT AutoBidder</Title>
        <ConnectWalletButton />
        <BotForm setIsBotRunning={setIsBotRunning} isBotRunning={isBotRunning} />
        {/* <BotStatus isBotRunning={isBotRunning} /> */}
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
