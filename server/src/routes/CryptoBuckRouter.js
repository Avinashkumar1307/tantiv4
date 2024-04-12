const express = require('express');
const { getCryptoData, getCoinsData, getSearchData } = require('../controller/CryptoController');

const cryptoRouter = express.Router();

cryptoRouter.get('/:currency/:sortBy/:perPage/:page', getCryptoData);
cryptoRouter.get('/getCoin', getCoinsData);
cryptoRouter.post('/getSearchData', getSearchData);

module.exports = cryptoRouter;