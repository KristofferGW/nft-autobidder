import React from 'react';
import './App.css';
import ConnectWalletButton from './components/ConnectWalletButton';

function App() {
  return (
    <div className="App">
      <header>
        <h1>NFT AutoBidder</h1>
      </header>
      <ConnectWalletButton />
    </div>
  );
}

export default App;
