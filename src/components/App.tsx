import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TypedDispatch } from "../redux/store";
import { getWeatherCities, setLoading } from "../redux/actions";
import Header from "./Header/Header";
import CityList from "./CityList/CityList";
import DetailedInfo from "./DetailedInfo/DetailedInfo";
import Footer from "./Footer/Footer";
import "../index.css";

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<TypedDispatch>();

  const localStorageItems = window.localStorage.getItem("Cities");

  if (localStorageItems) {
    dispatch(setLoading(-10));
    dispatch(getWeatherCities(localStorageItems.replace(/^.|.$/g, "")));
  }

  return (
    <div className="home">
      <Header />
      <Routes>
        <Route path="/" element={<CityList />} />
        <Route path=":cityId" element={<DetailedInfo />} />
        <Route path="*" element={<CityList />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
