import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  addCityError,
  addCityRequest,
  addCitySuccess,
  getCityId,
  deleteCity,
  getHourlyWeatherError,
  getHourlyWeatherRequest,
  getHourlyWeatherSuccess,
  updateCityError,
  updateCityRequest,
  updateCitySuccess,
} from './actions';

const cities = createReducer([], {
  [addCitySuccess]: (state, action) => [...state, action.payload],
  [deleteCity]: (state, action) =>
    state.filter(({ id }) => id !== action.payload),

  [updateCitySuccess]: (state, action) =>
    state.map(city => {
      if (city.id === action.payload.id) {
        return action.payload;
      }
      return city;
    }),
});

const cityId = createReducer('', {
  [getCityId]: (state, action) => action.payload,
});

const hourlyWeatherCity = createReducer([], {
  [getHourlyWeatherSuccess]: (state, action) => action.payload.hourly,
});

const loading = createReducer(false, {
  [addCityRequest]: () => true,
  [addCitySuccess]: () => false,
  [addCityError]: () => false,
  [updateCityRequest]: () => true,
  [updateCitySuccess]: () => false,
  [updateCityError]: () => false,
  [getHourlyWeatherRequest]: () => true,
  [getHourlyWeatherSuccess]: () => false,
  [getHourlyWeatherError]: () => false,
});

const error = createReducer(null, {});

export default combineReducers({
  cities,
  cityId,
  hourlyWeatherCity,
  loading,
  error,
});
