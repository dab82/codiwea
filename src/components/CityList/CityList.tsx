import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, List, CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TypedDispatch } from "../../redux/store";
import { setError } from "../../redux/actions";
import { RootState } from "../../redux/store";
import CityCard from "../CityCard/CityCard";

const CityList: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<TypedDispatch>();
  const weatherData = useSelector((state: RootState) => state.cityWeather.data);
  const loadingIdCard = useSelector(
    (state: RootState) => state.cityWeather.loadingIdCard
  );
  const loading = loadingIdCard && weatherData.length === 0;
  const error = useSelector((state: RootState) => state.cityWeather.error);

  return (
    <>
      <Box height={50}>
        {error && (
          <Alert
            sx={{ width: 320, m: "0 auto" }}
            onClose={() => {
              dispatch(setError());
            }}
            severity="error"
          >
            {error}
          </Alert>
        )}
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        weatherData && (
          <List sx={{ p: "30px" }}>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              breakpoints={{
                500: {
                  slidesPerView: 1.5,
                },
                680: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              centeredSlides={true}
              pagination={{
                dynamicBullets: true,
              }}
              navigation={true}
              modules={[Navigation, Pagination]}
              style={{ display: "flex" }}
            >
              {weatherData.map((item) => (
                <SwiperSlide key={item.id}>
                  <CityCard data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </List>
        )
      )}
    </>
  );
};

export default CityList;
