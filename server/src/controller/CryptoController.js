const express = require('express');


const getCryptoData  = (req, res) => {
   const {currency, sortBy, perPage, page} = req.params;
    try {
        // if(string.length == 6){
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
          )
          .then(a => a.json())
          .then(result => res.json({data: result})) ;
    } catch (error) {
        console.log(error);
    }
}
 

const getCoinsData = (req, res) => {
    const {coinid} = req.body;
    try {
        fetch(`https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
        )
        .then(a => a.json())
        .then(result => res.json(result)) ;
    } catch (error) {
        
    }
}
const getSearchData = (req, res) => {
    const { query } = req.body;
    console.log(query);
    try {
        fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
            .then(response => response.json())
            .then(result => res.json(result))
            .catch(error => {
                console.error('Error fetching data from CoinGecko API:', error);
                res.status(500).json({ error: 'Internal server error' });
            });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {getCryptoData, getCoinsData, getSearchData};