import { createAction } from '@reduxjs/toolkit';

export const addCityRequest = createAction('city/addRequest');
export const addCitySuccess = createAction('city/addSuccess');
export const addCityError = createAction('city/addError');
export const getCityId = createAction('city/cityId');
export const deleteCity = createAction('city/delete');

export const updateCityRequest = createAction('city/updateRequest');
export const updateCitySuccess = createAction('city/updateSuccess');
export const updateCityError = createAction('city/updateError');

export const getHourlyWeatherRequest = createAction('city/getRequest');
export const getHourlyWeatherSuccess = createAction('city/getSuccess');
export const getHourlyWeatherError = createAction('city/getError');

export const errorOff = createAction('error/off');
