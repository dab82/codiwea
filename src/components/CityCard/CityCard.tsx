import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import { RootState, TypedDispatch } from "../../redux/store";
import { setLoading, deletedCity, updateCity } from "../../redux/actions";
import { IWeatherData } from "../../redux/types";
import "../../index.css";

interface IWeatherProps {
  data: IWeatherData;
}

const CityCard: React.FC<IWeatherProps> = (
  props: IWeatherProps
): JSX.Element => {
  const { data } = props;
  const dispatch = useDispatch<TypedDispatch>();
  const loadingIdCard = useSelector(
    (state: RootState) => state.cityWeather.loadingIdCard
  );

  const updateWeather = (event: { preventDefault(): void }) => {
    event.preventDefault();
    dispatch(setLoading(data.id));
    dispatch(updateCity(data.name));
  };

  const deleteCity = (event: { preventDefault(): void }) => {
    event.preventDefault();
    dispatch(deletedCity(data.id));
  };

  const currentTemp = Math.round(data.main.temp);
  const currentTime = new Date(data.dt * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <>
      {loadingIdCard === data.id ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Card
          sx={{ width: 300, p: 2, m: "0 10px", borderRadius: 3 }}
          className={currentTemp > 15 ? "app warm" : "app"}
        >
          <>
            <Link
              to={`/${data.name}${data.id}`}
              state={{
                tempNow: data.main.temp,
                lat: data.coord.lat,
                lon: data.coord.lon,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                city: data.name,
                country: data.sys.country,
                timeNow: data.dt,
                sunSet: data.sys.sunset,
                sunRise: data.sys.sunrise,
                pressure: data.main.pressure,
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.name}, {data.sys.country}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    Temperature: {currentTemp > 0 ? "+" : "-"}
                    {currentTemp}&#xb0;C
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    Pressure:{" "}
                    {`${Math.round((data.main.pressure * 7.464) / 10)} mm.Hg`}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    Humidity: {data.main.humidity} %
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    Last update {currentTime}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 150,
                      heigh: 150,
                    }}
                  >
                    <CardMedia
                      sx={{ width: 150, height: 150 }}
                      component="img"
                      alt="icon"
                      image={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    />
                  </Box>
                </CardContent>
              </CardActionArea>{" "}
            </Link>
            <CardActions
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <IconButton
                onClick={(event: { preventDefault(): void }) =>
                  updateWeather(event)
                }
              >
                <CachedRoundedIcon />
              </IconButton>
              <IconButton
                onClick={(event: { preventDefault(): void }) =>
                  deleteCity(event)
                }
              >
                {" "}
                <HighlightOffRoundedIcon />{" "}
              </IconButton>{" "}
            </CardActions>
          </>
        </Card>
      )}
    </>
  );
};

export default CityCard;
