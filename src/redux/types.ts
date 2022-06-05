export const ADD_CITY = "ADD_CITY";
export const UPDATE_CITY = "UPDATE_CITY";
export const DELETED_CITY = "DELETED_CITY";
export const GET_CITIES = "GET_CITIES";
export const GET_DETAILED_INFORMATION = " GET_DETAILED_INFORMATION";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherData {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    humidity: number;
    pressure: number;
    temp: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  weather: IWeather[];
  wind: {
    speed: number;
  };
}

export interface IHourlyWeather {
  clouds: number;
  dt: number;
  humidity: number;
  pressure: number;
  temp: number;
  weather: IWeather[];
  wind_speed: number;
}

export interface IWeatherDataDetailedInformation {
  current: {
    weather: IWeather[];
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  hourly: IHourlyWeather[];
  lat: number;
  lon: number;
}

export interface IWeatherDataList {
  cnt: number;
  list: IWeatherData[];
}

export interface IWeatherError {
  cod: string;
  message: string;
}

export interface IWeatherState {
  data: IWeatherData[] | [];
  Cities: number[] | [];
  loadingIdCard: null | number;
  error: string;
  cityFullInformation: null | IWeatherDataDetailedInformation;
}

interface IAddWeatherCityAction {
  type: typeof ADD_CITY;
  payload: IWeatherData;
}

interface IGetWeatherCitiesAction {
  type: typeof GET_CITIES;
  payload: IWeatherDataList;
}

interface IGetWeatherDetailedInformation {
  type: typeof GET_DETAILED_INFORMATION;
  payload: IWeatherDataDetailedInformation;
}

interface IUpdateWeatherCityAction {
  type: typeof UPDATE_CITY;
  payload: IWeatherData;
}

interface IDeletedWeatherCityAction {
  type: typeof DELETED_CITY;
  payload: number;
}

interface ISetLoadingAction {
  type: typeof SET_LOADING;
  payload: number;
}

interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export type IWeatherAction =
  | IAddWeatherCityAction
  | IDeletedWeatherCityAction
  | IUpdateWeatherCityAction
  | IGetWeatherDetailedInformation
  | IGetWeatherCitiesAction
  | ISetLoadingAction
  | ISetErrorAction;
