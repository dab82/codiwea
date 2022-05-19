import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCity } from 'redux/operations';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Search, AddButton, SearchIconWrapper, StyledInputBase } from './style';
import '../../index.css';

const initialValues = {
  city: '',
};
const validationSchema = yup.object().shape({
  city: yup
    .string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('required field'),
});
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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Box
            component="form"
            autoComplete="off"
            onSubmit={addOneCity}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <StyledInputBase
              placeholder="Search city..."
              onChange={e => setValue(e.target.value)}
              value={value}
              name="city"
              onKeyPress={props.search}
              fullWidth
              required
            />
            <AddButton>
              <AddIcon />
            </AddButton>
          </Box>
        </Formik>
      </Search>
    </>
  );
};

export default SearchBox;
