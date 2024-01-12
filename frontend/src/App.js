import React, { useState } from 'react';
import './App.css';
import OfferForm from './components/OfferForm';
import CreateBiddingWallet from './components/CreateBiddingWallet';

function App() {
  
  return (
    <div className="App">
      <header>
        <h1>NFT AutoBidder</h1>
        <OfferForm />
        <CreateBiddingWallet />
      </header>
    </div>
  );
}

export default App;
