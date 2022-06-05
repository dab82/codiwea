import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";
import {
  ADD_CITY,
  UPDATE_CITY,
  DELETED_CITY,
  GET_CITIES,
  GET_DETAILED_INFORMATION,
  SET_ERROR,
  SET_LOADING,
  IWeatherAction,
  IWeatherData,
  IWeatherError,
  IWeatherDataDetailedInformation,
  IWeatherDataList,
} from "./types";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const KEY = "d4d607e5d23d189c71bea9a2692975a0";

export const addCity = (
  city: string
): ThunkAction<void, RootState, unknown, IWeatherAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${KEY}`
      );

      if (!res.ok) {
        const resData: IWeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: IWeatherData = await res.json();
      dispatch({
        type: ADD_CITY,
        payload: resData,
      });
    } catch (err: any) {
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};

export const getWeatherCities = (
  cities: string
): ThunkAction<void, RootState, null, IWeatherAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${BASE_URL}/group?id=${cities}&units=metric&appid=${KEY}`
      );

      if (!res.ok) {
        const resData: IWeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: IWeatherDataList = await res.json();
      dispatch({
        type: GET_CITIES,
        payload: resData,
      });
    } catch (err: any) {
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};

export const getWeatherDetailedInformation = (
  lat: number,
  lon: number
): ThunkAction<void, RootState, null, IWeatherAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${KEY}`
      );

      if (!res.ok) {
        const resData: IWeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: IWeatherDataDetailedInformation = await res.json();
      dispatch({
        type: GET_DETAILED_INFORMATION,
        payload: resData,
      });
    } catch (err: any) {
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};

export const updateCity = (
  city: string
): ThunkAction<void, RootState, null, IWeatherAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${KEY}`
      );

      if (!res.ok) {
        const resData: IWeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: IWeatherData = await res.json();
      dispatch({
        type: UPDATE_CITY,
        payload: resData,
      });
    } catch (err: any) {
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};

export const deletedCity = (id: number): IWeatherAction => {
  return {
    type: DELETED_CITY,
    payload: id,
  };
};

export const setLoading = (id: number): IWeatherAction => {
  return {
    type: SET_LOADING,
    payload: id,
  };
};

export const setError = (): IWeatherAction => {
  return {
    type: SET_ERROR,
    payload: "",
  };
};
