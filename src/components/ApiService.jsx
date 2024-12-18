import React, { useState, useEffect } from "react";

const BASE_URL = "https://api.coingecko.com/api/v3";

export default function ApiService({ endpoint, params = {}, onData, onError }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("Fetching data from API...");

      try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `${BASE_URL}${endpoint}${queryParams ? `?${queryParams}` : ""}`;
        console.log("Request URL:", url);

        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO,
          },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        onData(data);
      } catch (error) {
        console.error("Error during fetch:", error.message);
        onError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]); // Se eliminan onData y onError de las dependencias

  return loading ? (
    <div className="text-center text-gray-500">Loading...</div>
  ) : null;
}
