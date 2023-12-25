import React, { useEffect } from 'react';
import { useState } from "react";
import web3 from 'web3';

const CONTRACT_ABI = process.env.CONTRACT_ABI;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

function FundAccount() {
    const [fundingAmount, setFundingAmount] = useState(0);
    const [currentAccount, setCurrentAccount] = useState(null);
    
    function handleChangeOfAmount(event) {
        setFundingAmount(event.target.value);
    }

    useEffect(() => {
      const handleAccountChange = (accounts) => {
        setCurrentAccount(accounts[0]);
      };

      if (window.ethereum) {
        window.ethereum.on('accountsChanged', handleAccountChange);
      }

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountChange);
        }
      }
    }, []);

    async function fundAccount() {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setCurrentAccount(accounts[0]);

        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        await contract.methods.deposit().send({
          from: accounts[0],
          value: web3.utils.toWei(fundingAmount.toString(), 'ether'),
        });

        console.log(`Transaction successful. Funded account with ${fundingAmount} WETH`);
      } catch (error) {
        console.error('Error funding account:', error);
      }
    }

  return (
    <div className="App">
      <h3>Fund your autobidder account</h3>
      <label htmlFor="funding-amount">WETH to deposit: </label>
      <input type='number' id='funding-amount' onChange={handleChangeOfAmount}></input>
      <button onClick={fundAccount}>Fund account</button>
      <div>
        <h3>Current Wallet Address: {currentAccount}</h3>
      </div>
    </div>
  );
}

export default FundAccount;
