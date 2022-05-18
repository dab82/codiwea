import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCity } from 'redux/operations';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './style';
import '../../index.css';

const SearchBox = props => {
  const listCitiesWeather = useSelector(state => state.cities.cities);

  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const addOneCity = e => {
    e.preventDefault();
    setTimeout(() => {
      dispatch(addCity(value, listCitiesWeather));
      setValue('');
    }, 1000);
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
          required
        >
          <StyledInputBase
            placeholder="Search city..."
            onChange={e => setValue(e.target.value)}
            value={value}
            onKeyPress={props.search}
            fullWidth
            required
          />
        </Box>
      </Search>
    </>
  );
};

export default SearchBox;
