import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractAbi from '../conctractABI.json'
import {CONTRACT_ADDRESS} from '../utils/contractAddress.js';

// const CONTRACT_ADDRESS = "0x76A9fEb31e4B81ADDc74737dAF64F6088d6d5eea";

function FundAccount(props) {
  const [fundingAmount, setFundingAmount] = useState(0);
  // const [currentAccount, setCurrentAccount] = useState(null);
  // const [web3, setWeb3] = useState(null);

  function handleChangeOfAmount(event) {
    setFundingAmount(event.target.value);
  }

  // useEffect(() => {
  //   const initializeWeb3 = async () => {
  //     try {
  //       // Check if the user has MetaMask installed
  //       if (window.ethereum) {
  //         // Use MetaMask's provider
  //         const web3Instance = new Web3(window.ethereum);
  //         setWeb3(web3Instance);

  //         // Request account access
  //         const accounts = await window.ethereum.request({
  //           method: 'eth_requestAccounts',
  //         });
  //         setCurrentAccount(accounts[0]);
  //       } else {
  //         console.log('MetaMask not detected. Please install MetaMask extension.');
  //       }
  //     } catch (error) {
  //       console.error('Error initializing web3:', error);
  //     }
  //   };

  //   initializeWeb3();
  // }, []);

  const web3 = props.web3;
  const currentAccount = props.currentAccount;

  async function fundAccount() {
    console.log('web3', web3);
    try {
      if (!web3 || !currentAccount) {
        console.error('Web3 or account not available.');
        return;
      }

      // Create a contract instance
      const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);

      // Convert the funding amount to Wei
      const amountInWei = web3.utils.toWei(fundingAmount.toString(), 'ether');

      // Send a transaction to the 'deposit' function
      const transaction = await contract.methods.deposit().send({
        from: currentAccount,
        value: amountInWei,
      });

      console.log(`Transaction successful. Funded account with ${fundingAmount} WETH`);
      console.log('Transaction Hash:', transaction.transactionHash);
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
