import React from 'react';
import json2mq from 'json2mq';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppBar, Avatar, Grid, Typography } from '@mui/material';
import logo from '../../logo.png';
import SearchBox from 'components/SearchBox/SearchBox';

const Header = () => {
  const today = new Date().toLocaleDateString();
  const matches = useMediaQuery(
    json2mq({
      minWidth: 600,
    })
  );

  return (
    <AppBar sx={{ position: 'static', bgcolor: 'steelblue' }}>
      <Grid
        container
        spacing={{ xs: 2, sm: 1 }}
        sx={{
          py: { xs: 1, sm: 2 },
          px: 1,
          alignItems: 'center',
        }}
      >
        <Grid item xs={6} sm={3} sx={{ display: 'flex' }}>
          <Avatar
            alt="logo"
            src={logo}
            variant="rounded"
            sx={{ marginRight: 1 }}
          />
          <Typography variant="h5">CodiWea&deg;</Typography>
        </Grid>
        {matches && (
          <Grid item xs={12} sm={6}>
            <SearchBox />
          </Grid>
        )}

        <Grid item xs={6} sm={3}>
          <Typography variant="h6" sx={{ textAlign: 'end' }}>
            {today}
          </Typography>
        </Grid>
        {!matches && (
          <Grid item xs={12} sm={6}>
            <SearchBox />
          </Grid>
        )}
      </Grid>
    </AppBar>
  );
};

export default Header;