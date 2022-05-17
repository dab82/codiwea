import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCity, getCityId } from 'redux/actions';
import { updateCity } from 'redux/operations';
import '../../index.css';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';

const CityCard = ({ cityData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, main, weather, id, dt } = cityData;
  const { temp, pressure, humidity } = main;

  const onDetailed = e => {
    const id = e.currentTarget.id;
    dispatch(getCityId(id));
    navigate(`/${name}${id}`);
  };
  const currentTemp = Math.floor(temp - 273);
  const positiveTemp = currentTemp > 0;
  const timeNow = new Date(dt * 1000).toLocaleTimeString();

  return (
    <>
      <Card
        sx={{ width: '320px', m: '0 10px' }}
        className={currentTemp > 15 ? 'app warm' : 'app'}
      >
        <CardActionArea onClick={onDetailed} id={id}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              Temperature: {positiveTemp ? '+' : '-'}
              {currentTemp}&#xb0;
            </Typography>

            <Typography variant="body1" color="textSecondary" component="p">
              Pressure: {`${Math.floor((pressure * 7.464) / 10)} мм.рт.ст`}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              Humidity: {humidity} %
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              Last update {timeNow}
            </Typography>
            <CardMedia
              component="img"
              alt="icon"
              image={`http://openweathermap.org/img/wn/${weather[0]?.icon}@4x.png`}
            />
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <IconButton onClick={() => dispatch(updateCity(name))}>
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
