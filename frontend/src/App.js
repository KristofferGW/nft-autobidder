import React from 'react';
import './App.css';
import ConnectWalletButton from './components/ConnectWalletButton';
import FundAccount from './components/FundAccount';
import PlaceCollectionBid from './components/PlaceCollectionBid';

function App() {
  return (
    <div className="App">
      <header>
        <h1>NFT AutoBidder</h1>
      </header>
      <ConnectWalletButton />
      <FundAccount />
      <PlaceCollectionBid />
    </div>
  );
}

export default App;
