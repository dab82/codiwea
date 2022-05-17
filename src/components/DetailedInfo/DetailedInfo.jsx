import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHourlyWeather, updateCity } from 'redux/operations';
import {
  Box,
  Container,
  IconButton,
  Typography,
  List,
  CircularProgress,
} from '@mui/material';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import { ArrowBackIosSharp } from '@mui/icons-material';

const DetailedInfo = () => {
  const dispatch = useDispatch();

  const listCitiesWeather = useSelector(state => state.cities.cities);
  const idCity = useSelector(state => state.cities.cityId);
  const hourlyTempList = useSelector(state => state.cities.hourlyWeatherCity);

  const hourlyTemp24 = hourlyTempList.slice(0, 25);

  const loading = useSelector(state => state.cities.loading);

  const cityDetails = listCitiesWeather.find(({ id }) => id === +idCity);
  const { main, name, sys, weather, wind, dt, coord, clouds } = cityDetails;
  const { temp, pressure, humidity } = main;

  useEffect(() => {
    dispatch(getHourlyWeather(coord.lat, coord.lon, 'minutely,daily'));
  }, [coord, dispatch]);

  const iconsWeather = weather.map(({ icon }) => icon);
  const currentTemp = Math.floor(temp - 273);
  const positiveTemp = currentTemp > 0;
  const timeNow = new Date(dt * 1000).toLocaleTimeString();
  const sunR = new Date(sys.sunrise * 1000).toLocaleTimeString();
  const sunS = new Date(sys.sunset * 1000).toLocaleTimeString();

  const updateData = () => {
    dispatch(updateCity(name));
  };

  return (
    <Container>
      <Link to="/">
        {' '}
        <IconButton style={{ color: 'rgb(243, 227, 227)' }}>
          <ArrowBackIosSharp />
        </IconButton>
      </Link>
      <IconButton style={{ color: 'rgb(243, 227, 227)' }} onClick={updateData}>
        <CachedRoundedIcon />
      </IconButton>
      <Box>
        <Box>
          <Typography variant="h4" noWrap>
            {name}, {sys.country}{' '}
          </Typography>
          <Typography variant="h6" noWrap>
            last update {timeNow}
          </Typography>
          <Typography variant="h6" noWrap>
            sunrise: {sunR}
          </Typography>
          <Typography variant="h6" noWrap>
            sunset: {sunS}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" noWrap>
            {positiveTemp ? '+' : '-'}
            {currentTemp} C°
          </Typography>
          <Typography variant="h4">
            {`${Math.floor((pressure * 7.464) / 10)} mm.Hg`}
          </Typography>
          <Typography variant="h4" noWrap>
            {humidity} %
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" noWrap>
            Clouds {clouds.all} %
          </Typography>
          <Typography variant="h6">
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${iconsWeather[0]}@2x.png`}
                alt={iconsWeather[0]}
              />
            </div>
          </Typography>
          <Typography variant="h6" noWrap>
            wind speed: {wind.speed} m/s
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Box>
          <List
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            {hourlyTemp24.map((hour, idx) => {
              let timeHour = new Date(hour.dt * 1000).getHours();

              if (timeHour < 10) {
                timeHour = `0${timeHour}`;
              }

              const red = 125;
              const green = 125;
              const blue = 255;

              const tempColor = hour.temp - 273;
              const x = (tempColor / 10) * 100;
              const r = Math.floor(((255 - 125) * x) / 100);

              return (
                <li key={hour.dt}>
                  <p
                    style={{
                      marginTop: `${40 - Math.floor(hour.temp - 273)}px`,
                      backgroundColor: `rgb(${red + r}, ${green}, ${blue - r})`,
                    }}
                  >
                    {Math.floor(hour.temp - 273)}
                  </p>

                  <p>{timeHour}:00</p>
                </li>
              );
            })}
          </List>
        </Box>
      )}
    </Container>
  );
};

export default DetailedInfo;
