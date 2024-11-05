// components/MarketList.js
import React from "react";
import MarketItem from "./MarketItem";
import useFetchMarketData from "../hooks/useFetchMarketData";

const MarketList = () => {
  const mareketdata = useFetchMarketData(
    "https://api.upbit.com/v1/market/all?is_details=true"
  );
  return (
    <div>
      {mareketdata.map((item) => (
        <MarketItem key={item.market} item={item} />
      ))}
    </div>
  );
};

export default MarketList;
