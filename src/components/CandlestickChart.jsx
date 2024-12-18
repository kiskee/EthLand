import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function CandlestickChart() {
  const chartContainerRef = useRef(null);
  const candlestickSeriesRef = useRef(null);

  useEffect(() => {
    // Configurar el gráfico
    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 400,
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
    });

    // Crear la serie de velas
    candlestickSeriesRef.current = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    chart.timeScale().fitContent();

    // Obtener datos históricos al montar el componente
    const fetchHistoricalData = async () => {
      const response = await fetch(
        "https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&limit=1000"
      );
      const data = await response.json();

      // Transformar los datos al formato esperado por Lightweight Charts
      const formattedData = data.map((kline) => ({
        time: kline[0] / 1000, // Convertir de milisegundos a segundos
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
      }));

      // Establecer los datos históricos en la serie
      candlestickSeriesRef.current.setData(formattedData);
    };

    fetchHistoricalData();

    return () => chart.remove();
  }, []);

  useEffect(() => {
    // Stream de WebSocket para datos en tiempo real
    const binanceSocket = new WebSocket(
      "wss://stream.binance.com:9443/ws/ethusdt@kline_1m"
    );

    binanceSocket.onmessage = (e) => {
      const messageObj = JSON.parse(e.data);

      if (messageObj.k && candlestickSeriesRef.current) {
        const kline = messageObj.k;

        // Formatear datos en el formato esperado por Lightweight Charts
        const newCandle = {
          time: kline.t / 1000, // Convertir de milisegundos a segundos
          open: parseFloat(kline.o),
          high: parseFloat(kline.h),
          low: parseFloat(kline.l),
          close: parseFloat(kline.c),
        };

        // Añadir la nueva vela al gráfico
        candlestickSeriesRef.current.update(newCandle);
      }
    };

    // Cleanup: cerrar el socket al desmontar el componente
    return () => {
      binanceSocket.close();
    };
  }, []);

  return (
    <div>
      <h1>Gráfico de Velas Japonesas con Datos Históricos y Tiempo Real</h1>
      <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}
