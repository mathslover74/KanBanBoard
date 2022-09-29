import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const theme = createTheme();
export default function Forbidden(props) {
  const navigate = useNavigate();

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
          There's nothing here: 404!
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick = {() => navigate("/")}      
              sx={{ mt: 3, mb: 2 }}
            >
              Click here to Login page  
            </Button>
            {/* <h3 style={{color:'red'}}> Wrong Username or Password</h3> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>

  );
}