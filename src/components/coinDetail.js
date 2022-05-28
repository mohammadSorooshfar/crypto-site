import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "./storedValues";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./style.css";

export default function CoinDetail(props) {
  const dispatch = useDispatch();
  let darkMode = useSelector((state) => state.stored.darkMode);
  let coin = useSelector((state) => state.stored.coinDetail);

  let darkModeClass = darkMode === true ? "Dark" : "White";
  return (
    <>
      <div className={"detailBody detailBody" + darkModeClass}>
        <div className={"detailNav detailNav" + darkModeClass}>
          <h2>
            <Link to="/">IE Final Project</Link>
          </h2>
          <button onClick={() => dispatch(toggleDarkMode())}>
            Change Theme
          </button>
        </div>
        <div className="detailMainDiv">
          <img src={coin.image.large} alt="" />
          <h1>{coin.name}</h1>
          <p>
            {coin.description == undefined
              ? "no detail cause you didn't search the coin"
              : coin.description.en.slice(0, 200)}
            .
          </p>
          <h2>
            Rank:
            <span>
              {" "}
              {coin.coingecko_rank == undefined
                ? coin.market_data.market_cap_rank
                : coin.coingecko_rank}
            </span>{" "}
          </h2>
          <h2>
            Current Price:
            <span>
              {" "}
              $ {coin.market_data.current_price.usd.toLocaleString()}
            </span>{" "}
          </h2>
          <h2>
            Market Cap:
            <span>
              {" "}
              ${" "}
              {Math.round(
                coin.market_data.market_cap.usd / 1000000
              ).toLocaleString()}
              M
            </span>{" "}
          </h2>
        </div>
      </div>
    </>
  );
}
