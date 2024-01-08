import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractAbi from './conctractABI.json'
import './App.css';
import ConnectWalletButton from './components/ConnectWalletButton';
import FundAccount from './components/FundAccount';
import PlaceCollectionBid from './components/PlaceCollectionBid';
import WithdrawWeth from './components/WithdrawWeth';
import CheckBalance from './components/CheckBalance';
import { CONTRACT_ADDRESS } from './utils/contractAddress';
import newWallet from './utils/newWallet';
import getNetwork from './utils/network';

function App() {
  const [web3, setWeb3] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        // Check if the user has MetaMask installed
        if (window.ethereum) {
          // Use MetaMask's provider
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Request account access
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          setCurrentAccount(accounts[0]);

          const contractInstance = new web3Instance.eth.Contract(contractAbi, CONTRACT_ADDRESS);
          setContract(contractInstance);
        } else {
          console.log('MetaMask not detected. Please install MetaMask extension.');
        }
      } catch (error) {
        console.error('Error initializing web3:', error);
      }
    };

    initializeWeb3();
  }, []);
  
  return (
    <div className="App">
      <header>
        <h1>NFT AutoBidder</h1>
      </header>
      {/* <ConnectWalletButton /> */}
      <FundAccount web3={web3} currentAccount={currentAccount} />
      <PlaceCollectionBid />
      <WithdrawWeth />
      <CheckBalance web3={web3} currentAccount={currentAccount} contract={contract} />
    </div>
  );
}

export default App;
