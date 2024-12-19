import React, { useState, useEffect } from "react";
import ApiService from "../components/ApiService";
import CoinCard from "../components/CoinCard";

export default function Home() {
  const initialParams = {
    vs_currency: "usd",
    ids: "bitcoin,ethereum,tether,ripple",
    order: "market_cap_desc",
    per_page: 10,
    page: 1,
  };

  const [coins, setCoins] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // Estado para el valor del input
  const [params, setParams] = useState(initialParams);
  const [allCoins, setAllCoins] = useState([]); // Lista de todas las monedas
  const [filteredCoins, setFilteredCoins] = useState([]); // Lista de monedas filtradas
  const [showDropdown, setShowDropdown] = useState(false); // Controla la visibilidad del dropdown

  // Función que maneja los datos de las monedas
  const handleData = (data) => {
    setCoins(data);
  };

  const handleError = (error) => {
    console.error("Error fetching data:", error);
  };

  // Cargar la lista de todas las monedas al montar el componente
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
        const data = await response.json();
        setAllCoins(data); // Guardar la lista completa de monedas
      } catch (error) {
        console.error("Error fetching coin list:", error);
      }
    };

    fetchCoins();
  }, []);

  // Maneja el cambio en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Filtrar monedas según el texto ingresado
    if (value.trim()) {
      const filtered = allCoins.filter((coin) =>
        coin.name.toLowerCase().includes(value.toLowerCase()) ||
        coin.id.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCoins(filtered);
      setShowDropdown(true); // Mostrar el dropdown
    } else {
      setFilteredCoins([]);
      setShowDropdown(false); // Ocultar el dropdown
    }
  };

  // Maneja la búsqueda de monedas
  const handleSearch = () => {
    if (searchValue.trim()) {
      setParams((prev) => ({
        ...prev,
        ids: searchValue.trim().toLowerCase(),
      }));
      setShowDropdown(false); // Ocultar el dropdown al buscar
    }
  };

  // Maneja la selección de una moneda del dropdown
  const handleSelectCoin = (coinId) => {
    setSearchValue(coinId); // Actualizar el input con la moneda seleccionada
    setShowDropdown(false); // Ocultar el dropdown
  };

  // Restablece los valores iniciales
  const handleReset = () => {
    setParams(initialParams);
    setSearchValue("");
    setShowDropdown(false);
  };

  return (
    <>
      <p className="text-center text-gray-400 mb-8 mt-8">
        Bienvenido a EthLand, tu fuente confiable de información sobre
        criptomonedas. Aquí podrás ver el precio actual, la capitalización de
        mercado y otros datos cruciales para tus decisiones de inversión.
      </p>

      {/* Campo de búsqueda con dropdown */}
      <div className="flex flex-row justify-center items-center  mb-8 relative">
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

        {/* Dropdown con autocompletado */}
        {showDropdown && (
          <ul className="absolute top-14 bg-white border border-gray-300 rounded shadow-md w-1/3 max-h-60 overflow-y-auto z-10">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => (
                <li
                  key={coin.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                  onClick={() => handleSelectCoin(coin.id)}
                >
                  {coin.name} ({coin.symbol.toUpperCase()})
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-400">No se encontraron monedas</li>
            )}
          </ul>
        )}
      </div>

      <ApiService
        endpoint="/coins/markets"
        params={params}
        onData={handleData}
        onError={handleError}
      />

      <div className="flex flex-wrap justify-center sss:flex-col ss:flex-col sm:flex-row md:justify-center lg:justify-around xl:justify-center ">
        {coins.length > 0 ? (
          coins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
        ) : (
          <div className="text-center text-gray-400">Loading...</div>
        )}
      </div>
    </>
  );
}
