import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles()(() => {
  return {
    title: {
      flex: 1,
      color: "#FF5722",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
    
  };
});

const Header = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FF5722'
      }
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar  color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate("/")} className={classes.title} variant='h5'>
              Crypto Trail
            </Typography>

            <Select
              variant='outlined'
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: '#FF5722'
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"} >USD</MenuItem>
              <MenuItem value={"INR"} >INR</MenuItem>
            </Select>

          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header