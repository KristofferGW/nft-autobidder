const { buildCollectionOffer } = require('./buildOffer');
const { getNetwork } = require('./network');
const { postCriteriaOffer } = require('./postOffer');
const { signOffer } = require('./signOffer');

const network = getNetwork();

async function main(collectionSlug) {
  console.log("collection slug from main function", collectionSlug);
    const collectionOffer = await buildCollectionOffer({
      collectionSlug: collectionSlug,
      quantity: 1,
      priceWei: BigInt("3000000000000000"),
      expirationSeconds: BigInt(901),
    })

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