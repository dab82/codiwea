import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCity, getCityId } from 'redux/actions';
import { updateCity } from 'redux/operations';
import '../../index.css';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Skeleton,
} from '@mui/material';

const CityCard = ({ cityData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, main, weather, id, dt, sys } = cityData;
  const { temp, pressure, humidity } = main;

  const onDetailed = e => {
    const id = e.currentTarget.id;
    dispatch(getCityId(id));
    navigate(`/${name}${id}`);
  };

  const updateWeather = () => {
    setTimeout(() => {
      dispatch(updateCity(name));
    }, 1000);
  };

  const currentTemp = Math.round(temp);
  const currentTime = new Date(dt * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <>
      <Card
        sx={{ width: '300px', m: '0 10px' }}
        className={currentTemp > 15 ? 'app warm' : 'app'}
      >
        <CardActionArea onClick={onDetailed} id={id}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}, {sys.country}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              Temperature: {currentTemp > 0 ? '+' : '-'}
              {currentTemp}&#xb0;C
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              Pressure: {`${Math.round((pressure * 7.464) / 10)} mm.Hg`}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              Humidity: {humidity} %
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              Last update {currentTime}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!weather.icon ? (
                <CardMedia
                  sx={{ width: 150, height: 150 }}
                  component="img"
                  alt="icon"
                  image={`https://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`}
                />
              ) : (
                <Skeleton variant="rectangular" width={150} height={150} />
              )}
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <IconButton onClick={updateWeather}>
            <CachedRoundedIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(deleteCity(id))} id={id}>
            {' '}
            <HighlightOffRoundedIcon />{' '}
          </IconButton>{' '}
        </CardActions>
      </Card>
    </>
  );
};

export default CityCard;
