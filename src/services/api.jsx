import axios from 'axios';

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5';
const KEY = 'd4d607e5d23d189c71bea9a2692975a0';

export async function getWeather(query) {
  try {
    const data = await axios.get(
      `/weather?q=${query}&units=metric&appid=${KEY}`
    );
    return data.data;
  } catch (error) {
    throw alert('City not found.');
  }
}

export async function getDetailsWeather(lat, lon, exclude) {
  try {
    const data = await axios.get(
      `/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=metric&appid=${KEY}`
    );
    return data.data;
  } catch (error) {
    throw Error(error);
  }
}
