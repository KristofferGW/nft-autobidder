# nft-autobidder

Project Overview

NFT Autobidder is a bot that will place automatic WETH offers on OpenSea based on parameters entered in the frontend. The parameters are collection slug (in other words, which NFT collection), max bid, and minimum difference to the floor price. If the max bid entered by the user is lower than the floor price but higher than the current max bid, it will place a bid that's 0.0001 WETH higher than the current max bid. The bid will be valid for 15 minutes, and when those 15 minutes have passed, the bot will check the parameters again and place a bid if the conditions are right. This is a great way to get discounted NFTs for users who are not in a rush and are not too concerned about which NFT in the collection they get.
