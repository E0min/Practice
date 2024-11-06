// components/MarketList.js
import React, { useState } from "react";
import Modal from "./Modal";
import useFetchMarketData from "../hooks/useFetchMarketData";

const MarketList = ({ search, filters }) => {
  const marketData = useFetchMarketData(
    "https://api.upbit.com/v1/market/all?is_details=true"
  );

  //search 관련

  //모달관련 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);

  const openModal = (market) => {
    setSelectedMarket(market);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedMarket(null);
    setIsModalOpen(false);
  };

  // 검색어와 필터 체크박스를 이용하여 데이터 필터링
  const filteredData = marketData.filter((item) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      item.korean_name.toLowerCase().includes(searchTerm) ||
      item.english_name.toLowerCase().includes(searchTerm) ||
      item.market.toLowerCase().includes(searchTerm);

    // 필터 체크박스 조건 확인
    const matchesFilters = Object.keys(filters).every((key) => {
      if (filters[key]) {
        // 해당 필터가 체크된 경우
        return item.market_event?.caution?.[key] === true;
      }
      return true; // 필터가 체크되지 않은 경우 모든 데이터 통과
    });

    return matchesSearch && matchesFilters;
  });

  return (
    <div>
      {filteredData.map((item, index) => (
        <div
          key={index}
          className="market"
          onClick={() => openModal(item.market)}
        >
          <h3>
            {item.korean_name} ({item.english_name})
          </h3>
          <h4>Market: {item.market}</h4>
          <h4>
            거래량 급증:{" "}
            {item.market_event.caution.TRADING_VOLUME_SOARING ? "Yes" : "No"}
          </h4>
          <h4>
            소액 계좌 집중도:{" "}
            {item.market_event.caution.CONCENTRATION_OF_SMALL_ACCOUNTS
              ? "Yes"
              : "No"}
          </h4>
          <h4>
            글로벌 가격 차이:{" "}
            {item.market_event.caution.GLOBAL_PRICE_DIFFERENCES ? "Yes" : "No"}
          </h4>
          <h4>
            가격 변동성:{" "}
            {item.market_event.caution.PRICE_FLUCTUATIONS ? "Yes" : "No"}
          </h4>
          <h4
            style={{
              color: item.market_event.caution.DEPOSIT_AMOUNT_SOARING
                ? "red"
                : "black",
            }}
          >
            입금액 급증:{" "}
            {item.market_event.caution.DEPOSIT_AMOUNT_SOARING ? "Yes" : "No"}
          </h4>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        market={selectedMarket}
      />
    </div>
  );
};

export default MarketList;
