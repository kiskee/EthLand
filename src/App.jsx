import React, { useState } from "react";
import ApiService from "./components/ApiService";
import CoinCard from "./components/CoinCard";
import  ethladImg  from './assets/ethland.png'

function App() {
  const [coins, setCoins] = useState([]);

  // Función que maneja los datos de las monedas
  const handleData = (data) => {
    setCoins(data);
  };

  const handleError = (error) => {
    console.error("Error fetching data:", error);
  };

  return (
    <div className="min-h-screen bg-black p-6 text-white flex flex-col">
      {/* Encabezado con el logo y el título */}
      <header className="flex items-center justify-center mb-8">
        <img
          src={ethladImg}// Ruta del logo que subiste
          alt="EthLand Logo"
          className="w-24 h-24 mr-4" // Tamaño y margen del logo
        />
        <h1 className="text-4xl font-bold text-yellow-600">EthLand---1</h1>
      </header>

      {/* Descripción debajo del título */}
      <p className="text-center text-gray-400 mb-8">
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

      {/* Pie de página */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>
          “El éxito no se logra solo con cualidades especiales. Es sobre todo un
          trabajo de mentalidad y actitud positiva. Sigue soñando, sigue
          creyendo.”
        </p>
      </footer>
    </div>
  );
}

export default App;
