export default function CoinDetails({ coin }) {
  // body
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center mb-6">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-16 h-16 mr-6 rounded-full"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{coin.name}</h2>
          <p className="text-xl text-gray-500">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Price Info</h3>
          <div className="text-xl text-gray-800 mb-2">
            <span className="font-bold">Current Price:</span> $
            {coin.current_price}
          </div>
          <div className="text-xl text-gray-800 mb-2">
            <span className="font-bold">24h Change:</span>{" "}
            <span
              className={
                coin.price_change_percentage_24h < 0
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
          <div className="text-xl text-gray-800 mb-2">
            <span className="font-bold">24h High:</span> ${coin.high_24h}
          </div>
          <div className="text-xl text-gray-800 mb-2">
            <span className="font-bold">24h Low:</span> ${coin.low_24h}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700">Market Info</h3>
          <div className="text-xl text-gray-800 mb-2">
            <span className="font-bold">Market Cap:</span> $
            {coin.market_cap.toLocaleString()}
          </div>
          <div className="text-xl text-gray-800 mb-2">
            <span className="font-bold">Market Cap Rank:</span>{" "}
            {coin.market_cap_rank}
          </div>
          <div className="text-xl text-gray-800 mb-2">
            <span className="font-bold">Total Volume:</span> $
            {coin.total_volume.toLocaleString()}
          </div>
          <div className="text-xl text-gray-800 mb-2">
            <span className="font-bold">Circulating Supply:</span>{" "}
            {coin.circulating_supply}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">
          All Time High & Low
        </h3>
        <div className="text-xl text-gray-800 mb-2">
          <span className="font-bold">ATH:</span> ${coin.ath} (
          {coin.ath_change_percentage.toFixed(2)}% change)
        </div>
        <div className="text-xl text-gray-800 mb-2">
          <span className="font-bold">ATL:</span> ${coin.atl} (
          {coin.atl_change_percentage.toFixed(2)}% change)
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Additional Info</h3>
        <div className="text-xl text-gray-800 mb-2">
          <span className="font-bold">Last Updated:</span>{" "}
          {new Date(coin.last_updated).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
