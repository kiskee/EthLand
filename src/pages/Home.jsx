import React, { useState } from "react";
import ApiService from "../components/ApiService";
import CoinCard from "../components/CoinCard";

export default function Home() {
  const initialParams = {
    vs_currency: "usd",
    ids: "bitcoin,ethereum,tether,ripple", // Monedas iniciales
    order: "market_cap_desc",
    per_page: 10,
    page: 1,
  };

  const [coins, setCoins] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // Estado para el valor del input
  const [params, setParams] = useState(initialParams); // Estado para los parámetros

  // Función que maneja los datos de las monedas
  const handleData = (data) => {
    setCoins(data);
  };

  const handleError = (error) => {
    console.error("Error fetching data:", error);
  };

  // Maneja el cambio en el input
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Maneja la búsqueda de monedas
  const handleSearch = () => {
    if (searchValue.trim()) {
      setParams((prev) => ({
        ...prev,
        ids: searchValue.trim().toLowerCase(), // Actualiza el parámetro `ids`
      }));
    }
  };

  // Restablece los valores iniciales
  const handleReset = () => {
    setParams(initialParams); // Restablece los parámetros
    setSearchValue(""); // Limpia el campo de búsqueda
  };

  return (
    <>
      {/* Descripción debajo del título */}
      <p className="text-center text-gray-400 mb-8 mt-8">
        Bienvenido a EthLand, tu fuente confiable de información sobre
        criptomonedas. Aquí podrás ver el precio actual, la capitalización de
        mercado y otros datos cruciales para tus decisiones de inversión.
      </p>

      {/* Campo de búsqueda */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Buscar moneda (e.g., bitcoin)"
          value={searchValue}
          onChange={handleInputChange}
          className="border p-2 rounded w-1/3 text-black"
        />
        <button
          onClick={handleSearch}
          className=" px-4 py-2 ml-2
      bg-yellow-500 
      text-black 
      rounded-md 
      hover:bg-yellow-600 
      transition-all 
      duration-300 
      hover:shadow-[0_0_20px_rgba(245,158,11,0.7)]
      hover:scale-105"
        >
          Buscar
        </button>
        <button
          onClick={handleReset}
          className="ml-2 bg-gray-500 text-white p-2 rounded"
        >
          Restablecer
        </button>
      </div>

      {/* Servicio para obtener datos de las monedas */}
      <ApiService
        endpoint="/coins/markets"
        params={params}
        onData={handleData}
        onError={handleError}
      />

      {/* Contenedor que usa flexbox para mostrar las monedas en una sola fila */}
      <div className="flex flex-wrap justify-center sss:flex-col ss:flex-col sm:flex-row md:justify-center lg:justify-around xl:justify-center ">
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
