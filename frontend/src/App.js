import React, { useState } from 'react';
import './App.css';
import OfferForm from './components/OfferForm';

function App() {
  
  return (
    <div className="App">
      <header>
        <h1>NFT AutoBidder</h1>
        <OfferForm />
      </header>
    </div>
  );
}

export default App;
