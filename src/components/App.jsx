// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateCity } from 'redux/operations';
import { Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import '../index.css';
import CityList from './CityList/CityList';
import DetailedInfo from './DetailedInfo/DetailedInfo';
import Footer from './Footer/Footer';

const App = () => {
  // const dispatch = useDispatch();
  // const listCities = useSelector(state => state.cities.cities);

  // useEffect(() => {
  //   dispatch(updateCity());
  // }, [dispatch]);

  return (
    <div className="home">
      <Header />
      <Routes>
        <Route path="/" element={<CityList />} />
        <Route path=":cityId" element={<DetailedInfo />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
