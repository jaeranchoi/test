import React, { useState, useEffect } from "react";
import * as S from "./styles";
import Papa from "papaparse";

export default function DataVisual() {
  const [stockPrice, setStockPrice] = useState(0);
  const [stockData, setStockData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Load and parse the CSV file
    fetch("/assets/id412/w1/data/NFLX.csv")
      .then((response) => response.text())
      .then((csvString) => {
        const result = Papa.parse(csvString, { header: true });
        const prices = result.data
          .filter((row) => row.Date) // Filter out empty rows
          .map((row) => parseFloat(row["Close"])); // Extract closing prices
        setStockData(prices);
      });
  }, []);

  useEffect(() => {
    if (stockData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= stockData.length - 1) {
          clearInterval(interval);
          return prevIndex;
        }
        setStockPrice(stockData[prevIndex + 1]);
        return prevIndex + 1;
      });
    }, 100); // 0.1s interval, speed of the animation, 100 > 5로 바꾸면 숫자 바뀌는 속도가 빨라짐

    return () => clearInterval(interval);
  }, [stockData]);

  return (
    <S.Container>
      <S.Counter>{stockPrice.toFixed(2)}</S.Counter> 
    </S.Container> // Visualized, 2는 소수점 둘째자리까지 표시
  );
}
