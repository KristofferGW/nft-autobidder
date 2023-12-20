import React from 'react';
import { useState } from "react";

function FundAccount() {
    const [fundingAmount, setFundingAmount] = useState(0);
    
    function fundAccount() {
        console.log("You tried to fund your account with " + fundingAmount + " WETH");
    }

    function handleChangeOfAmount(event) {
        setFundingAmount(event.target.value);
    }

  return (
    <div className="App">
      <h3>Fund your autobidder account</h3>
      <label for="funding-amount">WETH to deposit: </label>
      <input type='number' id='funding-amount' onChange={handleChangeOfAmount}></input>
      <button onClick={fundAccount}>Fund account</button>
    </div>
  );
}

export default FundAccount;
