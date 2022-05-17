import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHourlyWeather, updateCity } from 'redux/operations';
import {
  Box,
  Grid,
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

  const hourlyTemp12 = hourlyTempList.slice(1, 13);

  const loading = useSelector(state => state.cities.loading);

  const cityDetails = listCitiesWeather.find(({ id }) => id === +idCity);
  const { main, name, sys, weather, wind, dt, coord, clouds } = cityDetails;
  const { temp, pressure, humidity } = main;

  useEffect(() => {
    dispatch(getHourlyWeather(coord.lat, coord.lon, 'minutely,daily'));
  }, [coord, dispatch]);

  const iconsWeather = weather.map(({ icon }) => icon);
  const currentTemp = (temp - 273).toFixed(1);
  const currentTime = new Date(dt * 1000).toLocaleTimeString();
  const sunR = new Date(sys.sunrise * 1000).toLocaleTimeString();
  const sunS = new Date(sys.sunset * 1000).toLocaleTimeString();

  const updateData = () => {
    dispatch(updateCity(name));
  };
  // форматирование даты
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
          {' '}
          <div className="date">{format_date(new Date())}</div>
          <Typography variant="h3" noWrap>
            {name}, {sys.country}{' '}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h3" noWrap>
              {currentTemp > 0 ? '+' : '-'}
              {currentTemp} &deg;C
            </Typography>
            <Typography variant="h6">
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${iconsWeather[0]}@2x.png`}
                  alt={iconsWeather[0]}
                />
              </div>
            </Typography>
          </Box>
          <Typography variant="h6" noWrap>
            last update {currentTime}
          </Typography>
          <Typography variant="h6" noWrap>
            sunrise: {sunR}
          </Typography>
          <Typography variant="h6" noWrap>
            sunset: {sunS}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4">
            {`${Math.round((pressure * 7.464) / 10)} mm.Hg`}
          </Typography>
          <Typography variant="h4" noWrap>
            {humidity} %
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" noWrap>
            Clouds {clouds.all} %
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
          <Typography variant="h5">Hourly forecast:</Typography>
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
                      backgroundColor: '#f1f38c',
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
