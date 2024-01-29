import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';

const ConnectWalletButton = ({ onConnect }) => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const checkWallet = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  
        setAccount(accounts[0] || '');
      } catch (error) {
        console.error('Error connecting to wallet from checkWallet function', error);
      }
    };

    checkWallet();

    window.ethereum.on('accountsChanged', (newAccounts) => {
      setAccount(newAccounts[0] || '');
    });

    return () => {
      window.ethereum.removeAllListiners('accountsChanged');
    }
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
