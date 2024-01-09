const { Chain, Fees } = require('opensea-js/lib/types');
const { apiClient, sdkClients } = require('./apiClient');
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
    const fee = (priceWei * feeBasisPoints) / 1000;
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

//Fix function below
function extractFeesApi(feesObject, priceWei) {
    const fees = [];

    for (const [category, categoryFees] of Object.entries(feesObject)) {
        for (const [address, basisPoints] of Object.entries(categoryFees)) {
            const fee = getFee(priceWei, BigInt(basisPoints), address);
            if (fee) {
                fees.push(fee);
            }
        }
    }

    return fees;
}
