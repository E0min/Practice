// components/MarketItem.js
import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const MarketItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="market" onClick={openModal}>
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
      <Modal isOpen={isModalOpen} onClose={closeModal} market={item.market} />
    </>
  );
};

export default MarketItem;
