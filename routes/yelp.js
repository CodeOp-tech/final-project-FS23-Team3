var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();

const YELP_BASE_URL = 'https://api.yelp.com/v3/businesses';

router.get('*', async (req, res) => {
    // Replace 'http://localhost:5000/yelp' with Yelp base URL
    let url = req.originalUrl.replace(/^.*?\/yelp/, YELP_BASE_URL);
    console.log(url);

    // Add authorization header
    let options = {
        method: 'GET',
        headers: { 
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.YELP_API_KEY 
        }
    };

    try {
        let response = await axios.get(url, options);
        res.status(response.status).send(response.data);
    } catch (err) {
        if (err.response) {
            // Server responded
            let r = err.response;
            res.status(r.status).send({ error: r.statusText });
        } else {
            // Server not reached
            res.status(500).send({ error: `Network error: ${err.message}` });
        }
    }
});

module.exports = router;