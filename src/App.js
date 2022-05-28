import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Search from "./components/searchPage";
import Home from "./components/homePage";
import CoinDetail from "./components/coinDetail";
import React from "react";
import "./components/style.css";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/search" element={<Search />} />
          <Route path="/coin/:coinId" element={<CoinDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
