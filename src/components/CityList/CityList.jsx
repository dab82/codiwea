import React from 'react';
import { useSelector } from 'react-redux';
import CityCard from 'components/CityCard/CityCard';
import { List } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CityList = () => {
  const listCitiesWeather = useSelector(state => state.cities.cities);

  return (
    <List sx={{ p: '30px' }}>
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
          1370: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        centeredSlides={true}
        pagination={{
          dynamicBullets: true,
        }}
        autoHeight
        navigation={true}
        modules={[Navigation, Pagination]}
        style={{ display: 'flex' }}
      >
        {listCitiesWeather.map(cityData => (
          <SwiperSlide key={cityData.id}>
            <CityCard cityData={cityData} />
          </SwiperSlide>
        ))}
      </Swiper>
    </List>
  );
};

export default CityList;
