const { buildCollectionOffer } = require('./buildOffer');
const { getNetwork } = require('./network');
const { postCriteriaOffer } = require('./postOffer');
const { signOffer } = require('./signOffer');

const network = getNetwork();

async function main(collectionSlug, bidAmount) {
    console.log('Bid amount as is', bidAmount);
    const bidAmountBigInt = BigInt(bidAmount);
    console.log('Bid amount bigint', bidAmountBigInt);
    const collectionOffer = await buildCollectionOffer({
      collectionSlug: collectionSlug,
      quantity: 1,
      priceWei: BigInt(bidAmount),
      expirationSeconds: BigInt(901),
    })
    console.log('Collection offer', collectionOffer);

    const collectionSignature = await signOffer(collectionOffer)
    const collectionResponse = await postCriteriaOffer(
      collectionSlug,
      collectionOffer,
      collectionSignature,
    )
    console.log(
      `Collection offer posted! Order Hash: ${collectionResponse.order_hash}`,
    )
  }

  // main().catch(error => console.error(error));

  module.exports = { main };