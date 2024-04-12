const express = require('express');

const getTrendingData  = (req, res) => {
    console.log("working")
     try {
         // if(string.length == 6){
           fetch(`https://api.coingecko.com/api/v3/search/trending`
           )
           .then(a => a.json())
           .then(result => res.json({data: result})) ;
     } catch (error) {
         console.log(error);
     }
 }

 module.exports = getTrendingData;