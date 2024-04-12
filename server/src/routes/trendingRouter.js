const express = require('express');
const getTrendingData = require('../controller/trendingController');

const trendingRouter = express.Router();

trendingRouter.get('/', getTrendingData);

module.exports = trendingRouter;