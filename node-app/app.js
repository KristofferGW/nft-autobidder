const http = require('http');
const express = require('express');
const sdk = require('api')('@opensea/v2.0#2cd9im1dlr9rw9li');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const fetchData = async () => {
  try {
    sdk.auth('9d2673aea38642219bf60ddfd03e726a');
    sdk.server('https://api.opensea.io');

    const floorData = await sdk.get_best_listings_on_collection_v2({ limit: '1', collection_slug: 'insrt-finance' });

    const topBidData = await sdk.get_collection_offers_v2({ collection_slug: 'insrt-finance' });

    const combinedData = {
      floor: floorData.data.listings[0]?.price,
      topBid: topBidData.data.offers[0]?.price
    };

    console.log('Combined data:', combinedData);

    setInterval(fetchData, 15 * 60 * 1000);
  } catch (error) {
    console.error('Error combining data', error);
  }
};

app.get('/combined-data', (req, res) => {
  try {
    fetchData();
    res.send('Data will be fetched and combined every 15 minutes');
  } catch (error) {
    console.error('Error in /combined-data endpoint', error);
    res.status(500).send('Internal server error');
  }
});

app.get('/floor', (req, res) => {
  sdk.auth('9d2673aea38642219bf60ddfd03e726a');
  sdk.server('https://api.opensea.io');
  
  sdk.get_best_listings_on_collection_v2({ limit: '1', collection_slug: 'insrt-finance' })
    .then(({ data }) => res.send(data))
    .catch(err => res.status(500).send(err));
});

app.get('/top-bid', (req, res) => {
  sdk.auth('9d2673aea38642219bf60ddfd03e726a');
  sdk.server('https://api.opensea.io');
  sdk.get_collection_offers_v2({collection_slug: 'insrt-finance'})
    .then(({ data }) => res.send(data))
    .catch(err => res.status(500).send(err));
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
