const ethers = require('ethers');
const nftABI = require("../ABIs/nftABI.json");

const checkNFTownership = async (walletAddress) => {
    try {
        const contractAddress = "0x73dfc6942810599a18ef82287fc7a73f7eea339f";
        const sepoliaProviderUrl = 'https://eth-sepolia.g.alchemy.com/v2/i4OaVpjczGtbZpleao3mDJxpEqNCNnBC';

        const provider = new ethers.providers.JsonRpcProvider(sepoliaProviderUrl);
        const nftContract = new ethers.Contract(contractAddress, nftABI, provider);
        
        const balance = await nftContract.balanceOf(walletAddress);

        return balance.gt(0);
    } catch (error) {
        console.error('Error checking NFT ownership: ', error.message);
    }
}

export default checkNFTownership;