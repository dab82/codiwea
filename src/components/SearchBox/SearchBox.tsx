import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { addCity, setLoading } from "../../redux/actions";
import { TypedDispatch } from "../../redux/store";
import { Search, AddButton, SearchIconWrapper, StyledInputBase } from "./style";

const SearchBox: React.FC<{}> = (): JSX.Element => {
  const dispatch = useDispatch<TypedDispatch>();
  const [city, setCity] = useState("");

  const changeHandler = (event: React.ChangeEvent<{ value: string }>) => {
    setCity(event.currentTarget.value);
  };

  const addOneCity = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(-10));
    dispatch(addCity(city));
    setCity("");
  };

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <Box
          component="form"
          autoComplete="off"
          onSubmit={addOneCity}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <StyledInputBase
            placeholder="Search city..."
            onChange={changeHandler}
            value={city}
            name="city"
            fullWidth
            required
            error
          />
          <AddButton>
            <AddIcon />
          </AddButton>
        </Box>
      </Search>
    </>
  );
};

export default SearchBox;
