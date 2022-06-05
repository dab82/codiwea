import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  CardMedia,
  Box,
  Container,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosSharp from "@mui/icons-material/ArrowBackIosSharp";
import ModeNightTwoToneIcon from "@mui/icons-material/ModeNightTwoTone";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import AirIcon from "@mui/icons-material/Air";
import { RootState, TypedDispatch } from "../../redux/store";
import { IHourlyWeather } from "../../redux/types";
import { getWeatherDetailedInformation } from "../../redux/actions";

interface ILocationState {
  tempNow: number;
  lat: number;
  lon: number;
  humidity: number;
  windSpeed: number;
  city: string;
  country: string;
  timeNow: number;
  sunSet: number;
  sunRise: number;
  pressure: number;
}

const DetailedInfo: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<TypedDispatch>();
  const location = useLocation();
  const {
    tempNow,
    lat,
    lon,
    humidity,
    windSpeed,
    city,
    country,
    timeNow,
    sunSet,
    sunRise,
    pressure,
  } = location.state as ILocationState;
  const cityFullInformation = useSelector(
    (state: RootState) => state.cityWeather.cityFullInformation
  );
  const loading = cityFullInformation?.hourly.length === 0;

  useEffect(() => {
    dispatch(getWeatherDetailedInformation(lat, lon));
  }, [dispatch, lat, lon]);

  const getTime = (t: number) =>
    new Date(t * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const format_date = (d: any) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Satuday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    return `${month} ${date} , ${day}. `;
  };

  return (
    <Container>
      <Box display={"flex"} pt={2}>
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
            {city}, {country}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" noWrap>
              {tempNow > 0 ? "+" : "-"}
              {tempNow} &deg;C
            </Typography>
            <CardMedia>
              <img
                src={`http://openweathermap.org/img/wn/${cityFullInformation?.current.weather[0].icon}.png`}
                alt="icon"
              />
            </CardMedia>
          </Box>
          <Typography variant="h6" noWrap>
            last update {getTime(timeNow)}
          </Typography>
          <Typography variant="h6" noWrap>
            <LightModeTwoToneIcon /> sunrise: {getTime(sunRise)}
          </Typography>
          <Typography variant="h6" noWrap>
            <ModeNightTwoToneIcon /> sunset: {getTime(sunSet)}
          </Typography>
          <Typography variant="h6" noWrap>
            <AirIcon /> wind speed: {windSpeed} m/s
          </Typography>
          <Typography variant="h6" noWrap>
            Conditions: {cityFullInformation?.current.weather[0].description}
          </Typography>
          <Typography variant="h6">
            {`Pressure: ${Math.round((pressure * 7.464) / 10)} mm.Hg`}
          </Typography>
          <Typography variant="h6" noWrap>
            Humidity: {humidity} %
          </Typography>
        </Box>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box my={3}>
          <Typography variant="h4">Hourly forecast:</Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
              my: 2,
            }}
          >
            {cityFullInformation?.hourly
              ?.slice(0, 13)
              .map((item: IHourlyWeather, index: number) => (
                <Box
                  sx={{
                    width: "100%",
                    marginBottom: `${Number(item?.temp.toFixed(0)) * 5}px`,
                  }}
                  key={index}
                >
                  <Typography
                    sx={{
                      py: 1,
                      textAlign: "center",
                      backgroundColor: "#f7d461",
                      borderRadius: "1px",
                      boxShadow: "1px 1px rgba(160, 105, 4, 0.3)",
                    }}
                  >
                    {item?.temp > 0 ? "+" : "-"}
                    {item?.temp.toFixed(0)}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "small",
                      color: "secondary.dark",
                    }}
                  >
                    {new Date(item?.dt * 1000).getHours()}:00
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default DetailedInfo;
