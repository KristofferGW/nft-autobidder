require('./config');
const axios = require("axios");
const { ethers } = require("ethers");
const { OpenSeaSDK } = require("opensea-js");
const { getNetwork } = require("./network");

const network = getNetwork();

const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);

const sdkClient = new OpenSeaSDK(provider, {
    chain: network.network,
    apiKey: network.apiKey,
});

const headers = network.apiKey ? { "X-API-KEY": network.apiKey } : {}

const client = axios.create({
    baseURL: network.baseURL,
    headers,
});

const apiClient = client;

module.exports = {
    sdkClient,
    apiClient,
  };
  