import "./App.css";
import { useState, useEffect } from "react";
import CryptoDisplay from "./components/CryptoDisplay";

function App() {
  const url = "https://api.coincap.io/v2/assets?limit=20";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prevState) => !prevState);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const fetchData = async () => {
    try {
      const result = await fetch(url);
      const data = await result.json();
      setData(data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container poppins-font">
      <div className="flex justify-between align-middle items-center w-full">
        <h1 className="header flex-grow text-center">
          React Cryptocurrency App
        </h1>
        <button
          onClick={toggleTheme}
          className="border-black border-2 rounded-lg hover:bg-slate-300 mt-3 dark:border-white"
        >
          {isDark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="yellow"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="sm:size-6 md:size-7 lg:size-7 size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="gray"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="sm:size-6 md:size-7 lg:size-7 size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </button>
      </div>
      <p className="description">
        The top 20 ranked cryptocurrencies from the CoinCap API 2.0 are
        displayed below, with data updated every minute.
      </p>
      {loading ? (
        <div></div>
      ) : data && data.length > 0 ? (
        <table className="table-content">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Rank</th>
              <th>Price (USD)</th>
              <th>24H Price Change (%)</th>
            </tr>
            {data.map(
              ({ name, symbol, rank, priceUsd, changePercent24Hr }, i) => (
                <CryptoDisplay
                  key={i}
                  CryptoCurrency={name}
                  logo={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                  CryptoSymbol={symbol}
                  rank={rank}
                  price={parseFloat(priceUsd).toFixed(2)}
                  priceChange={parseFloat(changePercent24Hr).toFixed(2)}
                />
              )
            )}
          </tbody>
        </table>
      ) : (
        <div className="text-xl text-center text-red-500">
          No data available. The API is experiencing issues.
        </div>
      )}
      <p className="notice">
        This application utilizes{" "}
        <a className="underline" href="https://docs.coincap.io/">
          CoinCap API 2.0
        </a>
      </p>
    </div>
  );
}

export default App;
