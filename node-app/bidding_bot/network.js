require('./config');
const { Chain } = require('opensea-js/lib/types');


const getEnvRequired = (key) => {
    const value = process.env[key]
    if (value === undefined) {
      throw new Error(`Missing required environment variable: ${key}`)
    }
    return value
}

const networks = {
    mainnet: {
      chainId: 1,
      chainName: "ethereum",
      baseURL: "https://api.opensea.io/api/",
      wethAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      apiKey: getEnvRequired("API_KEY"),
      rpcUrl: getEnvRequired("MAINNET_RPC_URL"),
      network: Chain.Mainnet,
      collectionSlug: getEnvRequired("MAINNET_COLLECTION_SLUG"),
      itemAssetContractAddress: getEnvRequired(
        "MAINNET_ITEM_ASSET_CONTRACT_ADDRESS",
      ),
      itemTokenIdentifier: getEnvRequired("MAINNET_ITEM_TOKEN_IDENTIFIER"),
    },
    testnets: {
      chainId: 11155111,
      chainName: "sepolia",
      baseURL: "https://testnets-api.opensea.io/api/",
      wethAddress: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
      apiKey: undefined,
      rpcUrl:
        process.env.TESTNETS_RPC_URL ||
        "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      network: Chain.Sepolia,
      collectionSlug:
        process.env.TESTNETS_COLLECTION_SLUG || "boredapeyachtclub-ehs3xmkzrw",
      itemAssetContractAddress:
        process.env.TESTNETS_ITEM_ASSET_CONTRACT_ADDRESS ||
        "0xd0a21d074efc3393853accd481160a070a20cf32",
      itemTokenIdentifier: process.env.TESTNETS_ITEM_TOKEN_IDENTIFIER || "143",
    },
  }

  const getNetwork = () => {
    const network = process.env.NETWORK
    switch (network) {
      case "mainnet":
        return networks.mainnet
      case "testnets":
        return networks.testnets
      case undefined:
        console.warn("No network found in .env. Defaulting to testnets.")
        return networks.testnets
      default:
        throw `Invalid network found in .env. Please add "NETWORK=mainnet" or "NETWORK=testnets" to your .env file.`
    }
  }

module.exports = {getNetwork}