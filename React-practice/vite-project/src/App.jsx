// App.js
import React, { useState } from "react";
import "./App.css";
import MarketList from "./components/MarketList";
import SearchItem from "./components/searchItem";
import FilterOptions from "./components/FilterOptions";

function App() {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    TRADING_VOLUME_SOARING: false,
    CONCENTRATION_OF_SMALL_ACCOUNTS: false,
    GLOBAL_PRICE_DIFFERENCES: false,
    PRICE_FLUCTUATIONS: false,
    DEPOSIT_AMOUNT_SOARING: false,
  });

  return (
    <div>
      <SearchItem search={search} setSearch={setSearch} />
      <FilterOptions filters={filters} setFilters={setFilters} />
      <MarketList search={search} filters={filters} />
    </div>
  );
}

export default App;
