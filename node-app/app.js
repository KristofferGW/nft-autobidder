require('dotenv').config({ path: './.env' });
const http = require('http');
const express = require('express');
const sdk = require('api')('@opensea/v2.0#2cd9im1dlr9rw9li');
const bodyParser = require('body-parser');
const { main } = require('./bidding_bot/biddingBot');
const { clearInterval } = require('timers');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let fetchInterval = null;

const fetchData = async (maxBid, minDifference, collectionSlug) => {
  clearInterval(fetchInterval);
  fetchInterval = null;
  try {
    sdk.auth('YOUR OPENSEA API KEY HERE');
    sdk.server('https://api.opensea.io');

    const floorData = await sdk.get_best_listings_on_collection_v2({ limit: '1', collection_slug: collectionSlug });
    const topBidData = await sdk.get_collection_offers_v2({ collection_slug: collectionSlug });

    const floorValue = floorData.data.listings[0]?.price?.current?.value;
    const topBidValue = topBidData.data.offers[0]?.price?.value;

    const userMaxBid = parseFloat(maxBid);
    const floorPrice = parseFloat(floorValue);
    let topBid = 0;
    if(topBidValue) {
      topBid = parseFloat(topBidValue);
    }
    const difference = floorPrice - topBid;

    console.log(
      'Combined data:', { floor: floorValue, topBid: topBid },
      'User max bid', userMaxBid,
      'Floor price', floorPrice,
      'Difference', difference
    );

    if (floorPrice > userMaxBid && userMaxBid > topBid && difference > minDifference) {
      const bidAmount = topBid + 100000000000000;
      console.log('A bid will be placed for ', bidAmount);
      await main(collectionSlug, bidAmount).catch(error => console.error(error));
    } else {
      console.log('No bid will be placed');
    }

    fetchInterval = setInterval(() => fetchData(maxBid, minDifference, collectionSlug), 60 * 15 * 1000);
  } catch (error) {
    console.error('Error combining data', error);
  }
};


app.get('/combined-data', (req, res) => {
  try {
    const maxBid = req.query.maxBid || 0;
    const minDifference = req.query.minDifference || 0;
    const collectionSlug = req.query.collectionSlug;

    fetchData(maxBid, minDifference, collectionSlug);
    res.send('Data will be fetched and combined every 15 minutes');
  } catch (error) {
    console.error('Error in /combined-data endpoint', error);
    res.status(500).send('Internal server error');
  }
});

app.get('/stop-bot', (req, res) => {
  clearInterval(fetchInterval);
  fetchInterval = null;

  res.send('The bot was stopped');
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
