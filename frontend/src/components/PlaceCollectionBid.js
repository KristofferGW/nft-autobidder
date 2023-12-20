import React from 'react';
import { useState } from "react";

function PlaceCollectionBid() {
    const [collectionAddress, setCollectionAddress] = useState("");
    const [maxBid, setMaxBid] = useState(0);
    const [percentageBid, setPercentageBid] = useState(0);

    function handleContractChange(event) {
        setCollectionAddress(event.target.value);
    }

    function handleChangeMaxBid(event) {
        setMaxBid(event.target.value);
    }

    function handleChangePercentageBid(event) {
        setPercentageBid(event.target.value);
    }

    function handleSubmit(event) {
        console.log("You tried place a bid on collection on " + collectionAddress + ". Your max bid was " + maxBid + " WETH, and " + percentageBid + "% of collection floor.");
        event.preventDefault();
    }

  return (
    <div className="App">
      <h3>Place Bid</h3>
      <form onSubmit={handleSubmit}>
        <label for="collection-contract">Collection contract address: </label>
        <input type='text' id='collection-contract' onChange={handleContractChange}></input>
        <br/>
        <label for="max-bid">Max bid in WETH: </label>
        <input type='number' id='max-bid' onChange={handleChangeMaxBid}></input>
        <br/>
        <label for="percentage-bid">Max bid in % of collection floor</label>
        <input type='number' id='percentage-bid' onChange={handleChangePercentageBid}></input>
        <button>Place bid</button>
      </form>
    </div>
  );
}

export default PlaceCollectionBid;
