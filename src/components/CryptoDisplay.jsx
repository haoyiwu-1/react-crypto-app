function CryptoDisplay(props) {
  if (props.priceChange > 0) {
    return (
      <tr>
        <td>{props.CryptoCurrency}</td>
        <td>{props.CryptoSymbol}</td>
        <td>{props.rank}</td>
        <td>${props.price}</td>
        <td className="positive">{props.priceChange}%</td>
      </tr>
    )
  } else if (props.priceChange < 0) {
    return (
      <tr>
        <td>{props.CryptoCurrency}</td>
        <td>{props.CryptoSymbol}</td>
        <td>{props.rank}</td>
        <td>${props.price}</td>
        <td className="negative">{props.priceChange}%</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{props.CryptoCurrency}</td>
        <td>{props.CryptoSymbol}</td>
        <td>{props.rank}</td>
        <td>${props.price}</td>
        <td className>0.00%</td>
      </tr>
    )
  }
}

export default CryptoDisplay