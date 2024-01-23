const { ethers } = require('ethers');

const newWallet = () => {

    const userWallet = ethers.Wallet.createRandom();
    console.log('This is your public key: ', userWallet.address);
    console.log('This is your private key, do not share: ', userWallet.privateKey);
    return userWallet;
      
}
module.exports = {newWallet};