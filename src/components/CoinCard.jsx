export default function CoinCard({ coin }) {
  // body
  return (
    <div className="flex-none w-[300px] mx-2 bg-gray-800 shadow-lg rounded-lg p-6 mb-6 text-white">
      <div className="flex items-center mb-4">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-16 h-16 mr-4 rounded-full"
        />
        <div>
          <h3 className="text-2xl font-semibold text-yellow-500">
            {coin.name}
          </h3>
          <p className="text-md text-gray-400">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Precio Actual */}
        <div>
          <span className="font-semibold text-gray-300">Price:</span>
          <span className="text-yellow-500">${coin.current_price}</span>
          <p className="text-sm text-gray-400">
            Current market price of {coin.name} in USD.
          </p>
        </div>

        {/* Cambio de Precio en 24h */}
        <div>
          <span className="font-semibold text-gray-300">24h Change:</span>
          <span
            className={
              coin.price_change_percentage_24h < 0
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
          <p className="text-sm text-gray-400">
            Percentage change in price in the last 24 hours.
          </p>
        </div>

        {/* Precio Máximo y Mínimo en 24h */}
        <div>
          <span className="font-semibold text-gray-300">24h High:</span>
          <span className="text-yellow-500">${coin.high_24h}</span>
          <p className="text-sm text-gray-400">
            Highest price reached in the last 24 hours.
          </p>
        </div>
        <div>
          <span className="font-semibold text-gray-300">24h Low:</span>
          <span className="text-yellow-500">${coin.low_24h}</span>
          <p className="text-sm text-gray-400">
            Lowest price reached in the last 24 hours.
          </p>
        </div>

        {/* Market Cap Rank */}
        <div>
          <span className="font-semibold text-gray-300">Market Cap Rank:</span>{" "}
          {coin.market_cap_rank}
          <p className="text-sm text-gray-400">
            Ranking based on the total market capitalization of {coin.name}.
          </p>
        </div>

        {/* Market Cap */}
        <div>
          <span className="font-semibold text-gray-300">Market Cap:</span>
          <span className="text-yellow-500">
            ${coin.market_cap.toLocaleString()}
          </span>
          <p className="text-sm text-gray-400">
            The total value of all {coin.name} in circulation.
          </p>
        </div>

        {/* Circulating Supply */}
        <div>
          <span className="font-semibold text-gray-300">
            Circulating Supply:
          </span>
          <span className="text-yellow-500">
            {coin.circulating_supply.toLocaleString()}
          </span>
          <p className="text-sm text-gray-400">
            The number of coins currently in circulation.
          </p>
        </div>

        {/* Market Cap Change */}
        <div>
          <span className="font-semibold text-gray-300">
            24h Market Cap Change:
          </span>{" "}
          <span
            className={
              coin.market_cap_change_percentage_24h < 0
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {coin.market_cap_change_percentage_24h.toFixed(2)}%
          </span>
          <p className="text-sm text-gray-400">
            Change in market capitalization over the last 24 hours.
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        {/* ATH (All-Time High) */}
        <div>
          <span className="font-semibold text-gray-300">
            ATH (All-Time High):
          </span>
          <span className="text-yellow-500">${coin.ath}</span>
          <p className="text-sm text-gray-400">
            The highest price {coin.name} has ever reached.
          </p>
        </div>

        {/* ATL (All-Time Low) */}
        <div>
          <span className="font-semibold text-gray-300">
            ATL (All-Time Low):
          </span>
          <span className="text-yellow-500">${coin.atl}</span>
          <p className="text-sm text-gray-400">
            The lowest price {coin.name} has ever reached.
          </p>
        </div>
      </div>
    </div>
  );
}
