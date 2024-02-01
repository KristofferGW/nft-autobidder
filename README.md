# NFT Autobidder

## Project Overview

NFT Autobidder is a bot that will place automatic WETH offers on OpenSea based on parameters entered in the frontend. The parameters are collection slug (in other words, which NFT collection), max bid, and minimum difference to the floor price. If the max bid entered by the user is lower than the floor price but higher than the current max bid, it will place a bid that's 0.0001 WETH higher than the current max bid. The bid will be valid for 15 minutes, and when those 15 minutes have passed, the bot will check the parameters again and place a bid if the conditions are right. This is a great way to get discounted NFTs for users who are not in a rush and are not too concerned about which NFT in the collection they get.

## Installation

### Step 1:
Clone this repository locally to your computer.

### Step 2:
Deploy the NFT-contract in contracts folder to the Sepolia network.

### Step 3:
Replace the contract address in nftChecker.js with the contract address of your deployed NFT-contract.

### Step 4:
Mint an NFT from the collection you deployed to the address you want to use with the bot.

### Step 5:
Change directory to the frontend folder and install all dependencis by running "npm install" in the terminal. Change directory to node-app and install all dependencies for the backend as well.

### Step 6:
Get an API-key from OpenSea and paste it in node-app/app.js on line 20.

## Usage

### Start the server and frontend
When in the node-app folder, run the command "node app.js" to start the server. Change to the frontend folder and run the command "npm start" to start the frontend.

### Bid parameters
Enter the collection slug of the collection you want to bid on. As an example, here is the URL for the Beanz Collection on OpenSea:

https://opensea.io/collection/beanzofficial

The collection slug would be "beanzofficial".

Then enter your max bid in ether and the minimum difference to the floor price you want from your max bid.

Click "Start bot".

If you want to stop the bot, click "Stop bot".
