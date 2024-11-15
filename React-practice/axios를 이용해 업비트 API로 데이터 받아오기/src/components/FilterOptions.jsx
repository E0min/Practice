// FilterOptions.js
import React from "react";

const FilterOptions = ({ filters, setFilters }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="TRADING_VOLUME_SOARING"
          checked={filters.TRADING_VOLUME_SOARING}
          onChange={handleCheckboxChange}
        />
        거래량 급증
      </label>
      <label>
        <input
          type="checkbox"
          name="CONCENTRATION_OF_SMALL_ACCOUNTS"
          checked={filters.CONCENTRATION_OF_SMALL_ACCOUNTS}
          onChange={handleCheckboxChange}
        />
        소액 계좌 집중도
      </label>
      <label>
        <input
          type="checkbox"
          name="GLOBAL_PRICE_DIFFERENCES"
          checked={filters.GLOBAL_PRICE_DIFFERENCES}
          onChange={handleCheckboxChange}
        />
        글로벌 가격 차이
      </label>
      <label>
        <input
          type="checkbox"
          name="PRICE_FLUCTUATIONS"
          checked={filters.PRICE_FLUCTUATIONS}
          onChange={handleCheckboxChange}
        />
        가격 변동성
      </label>
      <label>
        <input
          type="checkbox"
          name="DEPOSIT_AMOUNT_SOARING"
          checked={filters.DEPOSIT_AMOUNT_SOARING}
          onChange={handleCheckboxChange}
        />
        입금액 급증
      </label>
    </div>
  );
};

export default FilterOptions;
