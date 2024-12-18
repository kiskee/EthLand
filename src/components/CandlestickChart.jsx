import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function CandlestickChart({ coin , interval = "5m" }) {
  const chartContainerRef = useRef(null);
  const candlestickSeriesRef = useRef(null);

  const toUTC5 = (timestamp) => {
    const date = new Date(timestamp * 1000);
    // Convertir UTC a UTC-5
    const utc5Offset = -5 * 60; // Desplazamiento en minutos
    const localDate = new Date(date.getTime() + utc5Offset * 60 * 1000);
    return Math.floor(localDate.getTime() / 1000);
  };

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
      timeScale: {
        timeVisible: true, // Mostrar horas
        secondsVisible: false, // Ocultar segundos
      },
      localization: {
        dateFormat: "yyyy-MM-dd HH:mm", // Formato de fecha/hora
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: true,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeriesRef.current = candlestickSeries;
    chart.timeScale().fitContent();

    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${coin}&interval=${interval}&limit=1000`
        );
        const data = await response.json();

        const formattedData = data.map((kline) => ({
          time: toUTC5(kline[0] / 1000), // Ajustar a UTC-5
          open: parseFloat(kline[1]),
          high: parseFloat(kline[2]),
          low: parseFloat(kline[3]),
          close: parseFloat(kline[4]),
        }));

        candlestickSeries.setData(formattedData);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [coin, interval]);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${coin.toLowerCase()}@kline_${interval}`
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.k) {
        const kline = data.k;
        const newCandle = {
          time: toUTC5(kline.t / 1000), // Ajustar a UTC-5
          open: parseFloat(kline.o),
          high: parseFloat(kline.h),
          low: parseFloat(kline.l),
          close: parseFloat(kline.c),
        };
        candlestickSeriesRef.current?.update(newCandle);
      }
    };

    socket.onerror = (error) => console.error("WebSocket error:", error);
    socket.onclose = () => console.log("WebSocket closed");

    return () => socket.close();
  }, [coin, interval]);

  return (
    <div className="flex justify-center items-center mx-auto"
      ref={chartContainerRef}
      style={{ width: "70%", height: "500px" }}
    />
  );
}
