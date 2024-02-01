import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import checkNFTownership from '../functions/nftChecker';

const ConnectWalletButton = ({ onConnect, setHoldsNft }) => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const checkWallet = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAccount(accounts[0] || '');

        const accessGranted = await checkNFTownership(accounts[0]);

        if (accessGranted) {
          setHoldsNft(true);
        } else {
          setHoldsNft(false);
        }
      } catch (error) {
        console.error('Error connecting to wallet from checkWallet function', error);
      }
    };

    checkWallet();

    window.ethereum.on('accountsChanged', async (newAccounts) => {
      setAccount(newAccounts[0] || '');

      const accessGranted = await checkNFTownership(newAccounts[0]);

      if (accessGranted) {
        setHoldsNft(true);
      } else {
        setHoldsNft(false);
      }
    });

    return () => {
      window.ethereum.removeAllListeners('accountsChanged');
    };
  }, [setHoldsNft]);

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
