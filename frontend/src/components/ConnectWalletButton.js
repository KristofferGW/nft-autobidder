import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';

const ConnectWalletButton = ({ onConnect }) => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const checkMetaMask = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.requestAccounts();
          setAccount(accounts[0] || '');
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      }
    };

    checkMetaMask();
  }, []);

  return (
    <ConnectWalletContainer>
      <ConnectWalletStatus>
        {account ? (
          <ConnectedText>Connected: {account}</ConnectedText>
        ) : (
          <ConnectWalletButtonStyled onClick={() => onConnect()}>
            Connect Wallet
          </ConnectWalletButtonStyled>
        )}
      </ConnectWalletStatus>
    </ConnectWalletContainer>
  );
};

const ConnectWalletContainer = styled.div`
  margin-top: 20px;
`;

const ConnectWalletStatus = styled.div`
  color: #333;
`;

const ConnectWalletButtonStyled = styled.button`
  background-color: #61dafb;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #4fa3d1;
  }
`;

const ConnectedText = styled.p`
  color: green;
`;

export default ConnectWalletButton;
