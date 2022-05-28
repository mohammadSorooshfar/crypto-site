import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toggleDarkMode } from "./storedValues";
import { coinDetailAdd } from "./storedValues";
import "./style.css";
import { useNavigate, Link } from "react-router-dom";
function Search() {
  const dispatch = useDispatch();
  let darkMode = useSelector((state) => state.stored.darkMode);
  const navigate = useNavigate();
  let darkModeClass = darkMode === true ? "Dark" : "White";
  let i = 0;
  const [coin, setCoin] = useState({});
  const [coinList, setCoinList] = useState([]);
  const [show, setShow] = useState(false);
  function allStorage() {
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    return values;
  }

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/")
      .then((res) => {
        setCoinList(res.data);
        console.log(coinList);
      })
      .catch((error) => console.log(error));
  }, i);
  const onClickFunc = (coin) => {
    console.log(coin);
    dispatch(coinDetailAdd(coin));
    navigate("/coin/" + coin.id);
  };
  const onEnter = (input) => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/" + input.toLowerCase())
      .then((res) => {
        setShow(true);
        setCoin(res.data);
        let local = allStorage();
        if (!localStorage.getItem(input)) {
          if (local.length < 3) {
            localStorage.setItem(input, JSON.stringify(res.data));
          } else {
            localStorage.removeItem(localStorage.key(0));
            localStorage.setItem(input, JSON.stringify(res.data));
          }
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={"searchBody searchBody" + darkModeClass}>
      <div className={"searchNav searchNav" + darkModeClass}>
        <h2>
          <Link to="/">IE Final Project</Link>
        </h2>
        <button onClick={() => dispatch(toggleDarkMode())}>Change Theme</button>
      </div>
      <div className="imageSearch">
        <h1>Search Coin</h1>
        <p>Get Information From Here</p>
      </div>
      <div className={"searchMainDiv searchMainDiv" + darkModeClass}>
        <h2>Cryptocurrency Prices by Market Cap</h2>
        <input
          placeholder="Search For A Crypto Currency.."
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              onEnter(ev.target.value);
            }
          }}
        ></input>
        <div className="tableHeader">
          <p>Coin</p>
          <p className="textEnd">Price</p>
          <p className="textEnd">24h Change</p>
          <p className="textEnd">Market Cap</p>
        </div>
        {show === true ? (
          <div
            className={"coinDescription coinDescription" + darkModeClass}
            onClick={() => onClickFunc(coin)}
          >
            <div className="coinPhotoName">
              <img src={coin.image.large} alt="" />
              <div>
                <h3>{coin.symbol}</h3>
                <p>{coin.name}</p>
              </div>
            </div>
            <p className="price">
              $ {coin.market_data.current_price.usd.toLocaleString()}.00
            </p>
            <p
              className={
                coin.market_data.price_change_percentage_24h >= 0
                  ? "changePercentGreen"
                  : "changePercentRed"
              }
            >
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="marketCap">
              ${" "}
              {Math.round(
                coin.market_data.market_cap.usd / 1000000
              ).toLocaleString()}
              M
            </p>
          </div>
        ) : (
          coinList.map((element) => (
            <div
              className={"coinDescription coinDescription" + darkModeClass}
              onClick={() => onClickFunc(element)}
            >
              <div className="coinPhotoName">
                <img src={element.image.large} alt="" />
                <div>
                  <h3>{element.symbol}</h3>
                  <p>{element.name}</p>
                </div>
              </div>
              <p className="price">
                $ {element.market_data.current_price.usd.toLocaleString()}.00
              </p>
              <p
                className={
                  element.market_data.price_change_percentage_24h >= 0
                    ? "changePercentGreen"
                    : "changePercentRed"
                }
              >
                {element.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className="marketCap">
                ${" "}
                {Math.round(
                  element.market_data.market_cap.usd / 1000000
                ).toLocaleString()}
                M
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;
