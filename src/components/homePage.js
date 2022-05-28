import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { coinDetailAdd } from "./storedValues";
import { toggleDarkMode } from "./storedValues";
import "./style.css";
import { useNavigate } from "react-router-dom";
export default function Home(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [arr, setArr] = useState([]);
  let darkMode = useSelector((state) => state.stored.darkMode);
  let darkModeClass = darkMode === true ? "Dark" : "White";
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
    setArr(allStorage());
  }, []);
  function coinBoxClick(coin) {
    dispatch(coinDetailAdd(coin));
  }
  return (
    <>
      <div className={"mainBody mainBody" + darkModeClass}>
        <div className="navBody">
          <button
            className={"changeTheme changeTheme" + darkModeClass}
            onClick={() => dispatch(toggleDarkMode())}
          >
            Change Theme
          </button>
        </div>
        <div className={"leftBody leftBody" + darkModeClass}>
          <h1>
            Search & Buy <span>Crpyto</span>
          </h1>
          <p className="firstParagraph">Shahid Beheshti University</p>
          <p>IE Final Project</p>
          <button onClick={() => navigate("/search")}>SEARCH MORE</button>
        </div>
        <div className="rightBody">
          {arr === false
            ? ""
            : arr.map((coin) => (
                <div
                  className={"cryptoBox cryptoBox" + darkModeClass}
                  onClick={() => {
                    coinBoxClick(coin);
                    navigate("/coin/" + coin.id);
                  }}
                >
                  <img src={coin.image.small} alt="" />
                  <div>
                    <h4>${coin.market_data.current_price.usd.toFixed(2)}</h4>
                    <p>{coin.name}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
