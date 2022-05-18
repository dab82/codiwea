import {
  addCityError,
  addCityRequest,
  addCitySuccess,
  getHourlyWeatherError,
  getHourlyWeatherRequest,
  getHourlyWeatherSuccess,
  updateCityError,
  updateCityRequest,
  updateCitySuccess,
} from './actions';
import { getWeather, getDetailsyWeather } from './api';

export const addCity = (cityName, listCitiesWeather) => async dispatch => {
  dispatch(addCityRequest());
  try {
    const data = await getWeather(cityName);
    const isCity = listCitiesWeather.find(({ id }) => id === data.id);
    !isCity
      ? dispatch(addCitySuccess(data))
      : dispatch(addCityError(alert('This city has already been declared')));
  } catch (error) {
    dispatch(addCityError(error.message));
  }
};

export const updateCity = cityName => async dispatch => {
  dispatch(updateCityRequest());
  try {
    const data = await getWeather(cityName);
    dispatch(updateCitySuccess(data));
  } catch (error) {
    dispatch(updateCityError(error.message));
  }
};

export const getHourlyWeather = (lat, lon, exclude) => async dispatch => {
  dispatch(getHourlyWeatherRequest());
  try {
    const data = await getDetailsyWeather(lat, lon, exclude);

    dispatch(getHourlyWeatherSuccess(data));
  } catch (error) {
    dispatch(getHourlyWeatherError(error.message));
  }
};
