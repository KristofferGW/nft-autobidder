require('./config');
const axios = require("axios");
// const axiosRetry = require("axios-retry");
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

// axiosRetry(client, {
//     retryCondition: function(error) {
//         return error.response && error.response.status === 429;
//     },
//     retryDelay: function(retryCount, error) {
//         if (error.response && error.response.headers["retry-after"]) {
//             return parseInt(error.response.headers["retry-after"]) * 1000;
//         }
//         return retryCount * 1000;
//     },
// });

const apiClient = client;

module.exports = {
    sdkClient,
    apiClient,
  };
  