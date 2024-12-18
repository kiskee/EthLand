import React, { useState } from "react";
import ApiService from "../components/ApiService";
import CoinCard from "../components/CoinCard";

export default function Home() {
  const [coins, setCoins] = useState([]);

  // Función que maneja los datos de las monedas
  const handleData = (data) => {
    setCoins(data);
  };

  const handleError = (error) => {
    console.error("Error fetching data:", error);
  };

  return (
    <>
      {/* Descripción debajo del título */}
      <p className="text-center text-gray-400 mb-8 mt-8">
        Bienvenido a EthLand, tu fuente confiable de información sobre
        criptomonedas. Aquí podrás ver el precio actual, la capitalización de
        mercado y otros datos cruciales para tus decisiones de inversión.
      </p>

      <ApiService
        endpoint="/coins/markets"
        params={{
          vs_currency: "usd",
          ids: "bitcoin,ethereum,cardano",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        }}
        onData={handleData}
        onError={handleError}
      />

      {/* Contenedor que usa flexbox para mostrar las monedas en una sola fila */}
      <div className="flex flex-wrap justify-center">
        {/* Mapea las monedas y genera una tarjeta para cada una */}
        {coins.length > 0 ? (
          coins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
        ) : (
          <div className="text-center text-gray-400">Loading...</div>
        )}
      </div>
    </>
  );
}
