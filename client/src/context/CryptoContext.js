/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useLayoutEffect, useState } from "react";
import axios from 'axios';

// create context object
export const CryptoContext = createContext({});

// create the provider component
export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinData, setCoinData] = useState();

  const [coinSearch, setCoinSearch] = useState("");

  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(250);
  const [perPage, setPerPage] = useState(10);


  // This is how you can do error handling by creating one state to store the error,
  // This is only for example purpose and not covered in the video
  // create one state for the error
  const [error, setError] = useState({ data: "", coinData: "", search: "" });
// there can be 3 errors that we can catch from all three functions, also send the error state 
// through value prop

  const getCryptoData = async () => {
    //here we will set an empty string for the data error
    setError({ ...error, data: "" });
    setCryptoData();
    setTotalPages(13220);
    // try {
    //   const data = await fetch(
    //     `https://api.coingecko.com/api/v3/coins/list`
    //   )
    //     .then((res) => res.json())
    //     .then((json) => json);

    //   console.log(data);
    //   setTotalPages(data.length);
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const data = await fetch(
        `http://localhost:5000/api/crypto/${currency}/${sortBy}/${perPage}/${page}`
      ).then(async (res) => {
        if (res.ok) {
          return res.json();
        }
        let errorResponse = await res.json();
        // here we might get the error so it is best to handle it and throw the error
        // console.log(errorResponse);
        setError({ ...error, data: errorResponse.error });
        throw new Error(errorResponse.error);
      }).then((json) => json);

      // console.log(data);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoinData = async (coinid) => {
    setCoinData();
    try {
      const data = await fetch(
        `http://localhost:5000/api/crypto/`, coinid
      )
        .then((res) => res.json())
        .then((json) => json);

      // console.log("CoinData", data);
      setCoinData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchResult = async (query) => {
    try {
        const response = await axios.post(
            'http://localhost:5000/api/crypto/getSearchData',
            { query: query }
        );

        // Assuming the response contains data
        const data = response.data;
        // Handle the response data as needed
        setSearchData(data?.coins);
    } catch (error) {
        console.error('Error fetching search data:', error);
    }
};

  const resetFunction = () => {
    setPage(1);
    setCoinSearch("");
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, page, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        resetFunction,
        setPerPage,
        perPage,
        getCoinData,
        coinData,
        error
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
