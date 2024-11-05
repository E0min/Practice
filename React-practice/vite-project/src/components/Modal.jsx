// components/Modal.js
import React, { useState, useEffect } from "react";
import useFetchMarketData from "../hooks/useFetchMarketData";
import CandleStickChart from "./CandleStickChart";

const Modal = ({ isOpen, onClose, market }) => {
  if (!isOpen) {
    return null;
  }
  const [marketCandle, setMarketCandle] = useState("days"); // 캔들 종류
  const [minuteValue, setMinuteValue] = useState(null); // 분봉 단위 (분봉일 때만 사용)
  const [url, setUrl] = useState(
    `https://api.upbit.com/v1/candles/days?market=${market}&count=200`
  );

  useEffect(() => {
    if (marketCandle === "minutes" && minuteValue) {
      setUrl(
        `https://api.upbit.com/v1/candles/minutes/${minuteValue}?market=${market}&count=200`
      );
    } else {
      setUrl(
        `https://api.upbit.com/v1/candles/${marketCandle}?market=${market}&count=200`
      );
    }
  }, [market, marketCandle, minuteValue]);

  const marketData = useFetchMarketData(url);
  console.log(marketData);

  // 분봉 단위 배열
  const minuteIntervals = [1, 3, 5, 10, 15, 30, 60, 240];

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <button
          onClick={() => setMarketCandle("seconds")}
          style={modalStyles.candleButton}
        >
          초
        </button>
        {minuteIntervals.map((interval) => (
          <button
            key={interval}
            onClick={() => {
              setMarketCandle("minutes");
              setMinuteValue(interval);
            }}
            style={modalStyles.candleButton}
          >
            {interval}분
          </button>
        ))}
        <button
          onClick={() => setMarketCandle("days")}
          style={modalStyles.candleButton}
        >
          일
        </button>
        <button
          onClick={() => setMarketCandle("weeks")}
          style={modalStyles.candleButton}
        >
          주
        </button>
        <button
          onClick={() => setMarketCandle("months")}
          style={modalStyles.candleButton}
        >
          월
        </button>
        <button
          onClick={() => setMarketCandle("years")}
          style={modalStyles.candleButton}
        >
          년
        </button>
        <button onClick={onClose} style={modalStyles.closeButton}>
          닫기
        </button>
        <div>
          <CandleStickChart data={marketData} />
        </div>
      </div>
    </div>
  );
};

// Modal.js
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "90%", // 최대 너비를 화면의 90%로 설정
    maxHeight: "90%", // 최대 높이를 화면의 90%로 설정
    overflow: "auto", // 콘텐츠가 넘칠 경우 스크롤 생성
  },
  closeButton: {
    marginTop: "10px",
  },
};

export default Modal;
