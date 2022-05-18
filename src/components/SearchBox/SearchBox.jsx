import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCity } from 'redux/operations';
import { Search, SearchIconWrapper, StyledInputBase } from './style';
import SearchIcon from '@mui/icons-material/Search';
import '../../index.css';

const SearchBox = props => {
  const listCitiesWeather = useSelector(state => state.cities.cities);

  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const addOneCity = e => {
    e.preventDefault();
    dispatch(addCity(value, listCitiesWeather));
    setValue('');
  };

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={addOneCity}
        >
          <StyledInputBase
            placeholder="Search city..."
            onChange={e => setValue(e.target.value)}
            value={value}
            onKeyPress={props.search}
            fullWidth
          />
        </Box>
      </Search>
    </>
  );
};

export default SearchBox;
