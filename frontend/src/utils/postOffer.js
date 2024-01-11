const { apiClient } = require('./apiClient');
const { getNetwork } = require('./network');
const { seaportContractAddress } = require('./seaport');

const getCriteria = (collectionSlug) => {
    return {
      collection: {
        slug: collectionSlug,
      },
    }
}

const network = getNetwork();

const postCriteriaOffer = async (collectionSlug, offer, signature) => {
    const payload = {
      criteria: getCriteria(collectionSlug),
      protocol_data: {
        parameters: offer,
        signature,
      },
      protocol_address: seaportContractAddress,
    }
    return await apiClient
      .post("v2/offers", payload)
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        console.error(error.response.data)
      })
  }