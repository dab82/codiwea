import {
  ADD_CITY,
  UPDATE_CITY,
  DELETED_CITY,
  GET_CITIES,
  GET_DETAILED_INFORMATION,
  SET_ERROR,
  SET_LOADING,
  IWeatherAction,
  IWeatherState,
} from "./types";

const initialState: IWeatherState = {
  data: [],
  Cities: [],
  loadingIdCard: null,
  error: "",
  cityFullInformation: null,
};

export const weatherReducer = (
  state = initialState,
  action: IWeatherAction
): IWeatherState => {
  switch (action.type) {
    case GET_CITIES:
      const item = window.localStorage.getItem("Cities");
      return {
        ...state,
        Cities: item ? JSON.parse(item) : [],
        data: action.payload.list,
        loadingIdCard: null,
        error: "",
      };
    case ADD_CITY:
      if (
        state.data.find((weatherCity) => weatherCity.id === action.payload.id)
      ) {
        return {
          ...state,
          loadingIdCard: null,
          error: "This city has already been added",
        };
      }
      const addCityId = action.payload.id;
      window.localStorage.setItem(
        "Cities",
        JSON.stringify([...state.Cities, addCityId])
      );
      return {
        ...state,
        Cities: [...state.Cities, addCityId],
        data: [...state.data, action.payload],
        loadingIdCard: null,
        error: "",
      };
    case UPDATE_CITY:
      const idx = state.data.findIndex(
        (weatherCity) => weatherCity.id === action.payload.id
      );
      const arr = state.data;
      arr[idx] = action.payload;

      return {
        ...state,
        data: arr,
        loadingIdCard: null,
        error: "",
      };
    case DELETED_CITY:
      const deletedCity = state.Cities.filter(
        (City) => City !== action.payload
      );
      window.localStorage.setItem("Cities", JSON.stringify(deletedCity));
      if (window.localStorage.getItem("Cities") === "[]") {
        window.localStorage.clear();
      }
      return {
        ...state,
        Cities: deletedCity,
        data: state.data.filter(
          (weatherCity) => weatherCity.id !== action.payload
        ),
        loadingIdCard: null,
      };
    case GET_DETAILED_INFORMATION:
      return {
        ...state,
        loadingIdCard: null,
        error: "",
        cityFullInformation: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loadingIdCard: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingIdCard: null,
      };
    default:
      return state;
  }
};
