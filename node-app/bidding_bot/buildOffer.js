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
    const fee = ((BigInt(priceWei) * BigInt(feeBasisPoints)) / 10000n);
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

// function extractFeesApi(feesObject, priceWei) {
//     const fees = [];
//     console.log('feesObject from extractFeesApi', feesObject);

//     for (const category in feesObject) {
//         if (feesObject.hasOwnProperty(category)) {
//             const categoryFees = feesObject[category];
//             console.log('categoryFees inside category loop', categoryFees);

//             for (const address in categoryFees) {
//                 if (categoryFees.hasOwnProperty(address)) {
//                     const basisPoints = 250;

//                     console.log('address before getFee:', address);

//                     const fee = getFee(priceWei, BigInt(basisPoints), address);
//                     console.log('fee inside loop in extractFeesApi');

//                     if (fee) {
//                         fees.push(fee);
//                     }
//                 }
//             }
//         }
//     }

//     console.log("fees after extractFeesApi is done",fees)
//     return fees;
// }

function extractFeesApi(feesObject, priceWei) {
  const fees = [];

  for (const category in feesObject) {
      if (feesObject.hasOwnProperty(category)) {
          const categoryFees = feesObject[category];

          for (const recipient in categoryFees) {
              if (categoryFees.hasOwnProperty(recipient)) {
                  const basisPoints = 250;
                  
                  const fee = getFee(priceWei, BigInt(basisPoints), categoryFees.recipient);

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
    const response = await apiClient.get(`v2/collections/${collectionSlug}`)
  
    const feesObject = response.data.fees
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

// const getCriteriaConsideration = async (
//     criteriaFees,
//     collectionSlug,
//     priceWei,
//   ) => {
//     const fees = [
//       ...criteriaFees,
//       ...(await getCriteriaFees(collectionSlug, priceWei)),
//     ]

//     console.log('fees unfiltered from getCriteriaConsideration', fees);
//     console.log('filtered fees from getCriteriaConsideration', fees.filter(fee => fee !== null));
  
//     return fees.filter(fee => fee !== null)
// }

const getCriteriaConsideration = async (
  criteriaFees,
  collectionSlug,
  priceWei,
) => {
  // Fetch additional fees
  const additionalFees = await getCriteriaFees(collectionSlug, priceWei);

  // Combine the arrays
  const allFees = [...criteriaFees, ...additionalFees];

  // Use a Map to store unique fees based on their properties
  const uniqueFeesMap = new Map();

  // Add fees to the Map
  allFees.forEach((fee) => {
    const key = JSON.stringify(fee); // Use a unique key based on fee properties
    uniqueFeesMap.set(key, fee);
  });

  // Convert the Map values back to an array
  const uniqueFees = Array.from(uniqueFeesMap.values());

  return uniqueFees;
};



const getSalt = () => {
  return Math.floor(Math.random() * 100_000).toString()
}

const buildCollectionOffer = async (offerSpecification) => {
  const { collectionSlug, quantity, priceWei, expirationSeconds } =
    offerSpecification

  const now = BigInt(Math.floor(Date.now() / 1000))
  const startTime = now.toString()
  const endTime = (now + BigInt(expirationSeconds)).toString()
  const buildData = await getBuildData(collectionSlug, quantity)
  const consideration = await getCriteriaConsideration(
    buildData.consideration,
    collectionSlug,
    priceWei,
  );

  const offer = {
    offerer: getOfferer(),
    offer: getOffer(priceWei),
    consideration,
    startTime,
    endTime,
    orderType: 2,
    zone: buildData.zone,
    zoneHash: buildData.zoneHash,
    salt: getSalt(),
    conduitKey,
    totalOriginalConsiderationItems: consideration.length.toString(),
    counter: 0,
  }

  return offer
}

module.exports = { buildCollectionOffer };

