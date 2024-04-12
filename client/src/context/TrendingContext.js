import { createContext, useLayoutEffect, useState } from "react";

// create context object
export const TrendingContext = createContext({});

// create the provider component
export const TrendingProvider = ({ children }) => {
  const [trendData, setTrendData] = useState();

  const getTrendData = async () => {
    try {
      const data = await fetch(
        ` http://localhost:5000/api/trending/`
      )
        .then((res) => res.json())
        .then((json) => json);

      // console.log(data);
      console.log(data)
      setTrendData(data?.data?.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetTrendingResult = () => {
    getTrendData();
  };

  useLayoutEffect(() => {
    getTrendData();
  }, []);

  return (
    <TrendingContext.Provider
      value={{
        trendData,
        resetTrendingResult,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
