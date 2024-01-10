const { Chain, Fees } = require('opensea-js/lib/types');
const { apiClient, sdkClient } = require('./apiClient');
const { getNetwork } = require('./network');
const { seaportContractAddress } = require('./seaport');
const { getWallet } = require('./wallet');

const network = getNetwork();

const conduitKey =
  "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000";

const getOfferer = () => {
    const wallet = getWallet();
    return wallet.address;
}

const getOffer = (priceWei) => {
    return [
        {
            itemType: 1, // ERC20,
            token: network.wethAddress,
            identifierOrCriteria: 0,
            startAmount: priceWei.toString(),
            endAmount: priceWei.toString(),
        },
    ]
}

const getFee = (priceWei, feeBasisPoints, receipient) => {
    const fee = (BigInt(priceWei) * BigInt(feeBasisPoints)) / 1000n;
    if (fee <= 0) {
        return null;
    }
    return {
        itemType: 1, // ERC 20
        token: network.wethAddress,
        identifierOrCriteria: 0,
        startAmount: fee.toString(),
        endAmount: fee.toString(),
        recipient: receipient,
    }
}

function extractFeesApi(feesObject, priceWei) {
    const fees = [];

    for (const category in feesObject) {
        if (feesObject.hasOwnProperty(category)) {
            const categoryFees = feesObject[category];

            for (const address in categoryFees) {
                if (categoryFees.hasOwnProperty(address)) {
                    const basisPoints = categoryFees[address];

                    const fee = getFee(priceWei, BigInt(basisPoints), address);

                    if (fee) {
                        fees.push(fee);
                    }
                }
            }
        }
    }
    return fees;
}

const extractFeesSdk = (feesObject, priceWei) => {
    const fees = []
    const feesToAdd = [...feesObject.openseaFees, ...feesObject.sellerFees]
  
    for (const [address, basisPoints] of feesToAdd) {
      const fee = getFee(priceWei, BigInt(basisPoints), address)
      if (fee) {
        fees.push(fee)
      }
    }
  
    return fees
}

// Unsure if getItemFees is needed. Debug if it is indeed needed.
const getItemFees = async (assetContractAddress, tokenId, priceWei) => {
    const response = await sdkClient.api.getNFT(
      Chain.Goerli,
      assetContractAddress,
      tokenId,
    )
  
    const collectionSlug = response.nft.collection
    const collection = await sdkClient.api.getCollection(collectionSlug)
    const fees = collection.fees
    return extractFeesSdk(fees, priceWei)
}

const getCriteriaFees = async (collectionSlug, priceWei) => {
    const response = await apiClient.get(`v1/collection/${collectionSlug}`)
  
    const feesObject = response.data.collection.fees
    return extractFeesApi(feesObject, priceWei)
}

const getBuildData = async (collectionSlug, quantity) => {
    const offerer = getOfferer()
    const response = await apiClient.post("v2/offers/build", {
      offerer,
      quantity,
      criteria: {
        collection: {
          slug: collectionSlug,
        },
      },
      protocol_address: seaportContractAddress,
    })
  
    return response.data.partialParameters
}

