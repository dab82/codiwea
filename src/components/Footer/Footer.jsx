import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => (
  <footer>
    <Box
      sx={{
        py: 3,
        color: '#010163',
      }}
    >
      <Container maxWidth="lg">
        <Typography textAlign="center" variant="body1">
          CodiWea&deg; &copy; {new Date().getFullYear()} by{' '}
          <Link
            href="https://github.com/dab82"
            underline="hover"
            target="_blank"
            rel="noreferrer noopener"
          >
            dab82
          </Link>
        </Typography>
      </Container>
    </Box>
  </footer>
);

export default Footer;
