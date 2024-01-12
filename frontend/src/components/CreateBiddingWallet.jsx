import React, { useState } from 'react';
import { newWallet } from '../utils/newWallet';

const CreateBiddingWallet = () => {
  const [keys, setKeys] = useState(null);

  const handleCreateWalletClick = () => {
    const walletKeys = newWallet();
    setKeys(walletKeys);
  };

  return (
    <div>
      <button onClick={handleCreateWalletClick}>Create Bidding Wallet</button>
      {keys && (
        <div>
          <p>Public Key: {keys.address}</p>
          <p>Private Key: {keys.privateKey}</p>
        </div>
      )}
    </div>
  );
};

export default CreateBiddingWallet;
