import "./App.css";
import { useState, useEffect } from "react";
import CryptoDisplay from "./components/CryptoDisplay";

function App() {
  const url = "https://api.coincap.io/v2/assets?limit=20";
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(url);
      const data = await result.json();
      setData(data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <h1 className="header">React Cryptocurrency App</h1>
      <p className="description">
        The top 20 ranked cryptocurrencies from CoinCap API 2.0 are listed
        below.
      </p>
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
            ),
          )}
        </tbody>
      </table>
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
