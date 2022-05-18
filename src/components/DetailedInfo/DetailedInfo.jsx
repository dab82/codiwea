import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHourlyWeather } from 'redux/operations';
import {
  CardMedia,
  Box,
  Grid,
  Container,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';

import { ArrowBackIosSharp } from '@mui/icons-material';
import ModeNightTwoToneIcon from '@mui/icons-material/ModeNightTwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
const DetailedInfo = () => {
  const dispatch = useDispatch();

  const listCitiesWeather = useSelector(state => state.cities.cities);
  const idCity = useSelector(state => state.cities.cityId);
  const hourlyTempList = useSelector(state => state.cities.hourlyWeatherCity);

  const hourlyTemp12 = hourlyTempList.slice(1, 13);

  const loading = useSelector(state => state.cities.loading);

  const cityDetails = listCitiesWeather.find(({ id }) => id === +idCity);
  const { main, name, sys, weather, wind, dt, coord, clouds } = cityDetails;
  const { temp, pressure, humidity } = main;

  useEffect(() => {
    dispatch(getHourlyWeather(coord.lat, coord.lon, 'minutely,daily'));
  }, [coord, dispatch]);

  const currentTemp = (temp - 273).toFixed(1);
  const currentTime = new Date(dt * 1000).toLocaleTimeString();
  const sunR = new Date(sys.sunrise * 1000).toLocaleTimeString();
  const sunS = new Date(sys.sunset * 1000).toLocaleTimeString();

  const format_date = d => {
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    return `${month} ${date} , ${day}. `;
  };

  return (
    <Container>
      <Box display={'flex'} pt={2}>
        <Link to="/">
          <IconButton>
            <ArrowBackIosSharp />
          </IconButton>
        </Link>

        <Box sx={{ marginLeft: 1 }}>
          <Typography variant="body1" color="secondary">
            {format_date(new Date())}
          </Typography>
          <Typography variant="h3" noWrap>
            {name}, {sys.country}{' '}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" noWrap>
              {currentTemp > 0 ? '+' : '-'}
              {currentTemp} &deg;C
            </Typography>
            <CardMedia>
              <img
                src={`https://openweathermap.org/img/wn/${weather[0]?.icon}.png`}
                alt="icon"
              />
            </CardMedia>
          </Box>
          <Typography variant="h6" noWrap>
            last update {currentTime}
          </Typography>
          <Typography variant="h6" noWrap>
            <LightModeTwoToneIcon /> sunrise: {sunR}
          </Typography>
          <Typography variant="h6" noWrap>
            <ModeNightTwoToneIcon /> sunset: {sunS}
          </Typography>
          <Typography variant="h6">
            {`Pressure: ${Math.round((pressure * 7.464) / 10)} mm.Hg`}
          </Typography>
          <Typography variant="h6" noWrap>
            Humidity: {humidity} %
          </Typography>
          <Typography variant="h6" noWrap>
            Clouds {clouds.all} %
          </Typography>
          <Typography variant="h6" noWrap>
            wind speed: {wind.speed} m/s
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box my={3}>
          <Typography variant="h4">Hourly forecast:</Typography>
          <Grid
            container
            spacing={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {hourlyTemp12.map((hour, idx) => {
              let timeHour = new Date(hour.dt * 1000).getHours();

              if (timeHour < 10) {
                timeHour = `0${timeHour}`;
              }

              return (
                <Grid item xs={1} key={hour.dt}>
                  <Typography
                    sx={{
                      py: 1,
                      textAlign: 'center',
                      marginTop: `${50 - Math.round(hour.temp - 273)}px`,
                      backgroundColor: '#f7d461',
                      borderRadius: '1px',
                      boxShadow: '1px 1px rgba(160, 105, 4, 0.3)',
                    }}
                  >
                    {Math.round(hour.temp - 273) > 0 ? '+' : '-'}
                    {Math.round(hour.temp - 273)}
                  </Typography>

                  <Typography sx={{ fontSize: 'small', textAlign: 'center' }}>
                    {timeHour}:00
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default DetailedInfo;
