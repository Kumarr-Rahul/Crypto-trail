import { LinearProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui';
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from "../components/CoinsTable";
import HTMLReactParser from 'html-react-parser';



const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  const useStyles = makeStyles()((theme) => {

    return {
      container: {
        display: "flex",
        [theme.breakpoints.down("md")]: { //responsive styles
          flexDirection: "column",
          alignItems: "center",
        },
      },
      sidebar: {
        width: "35%",
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        margin: 25


      },
      headingCoin: {
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: "Montserrat",
        textAlign: "center",


      },

      heading: {
        marginBottom: 20,
        fontFamily: "Montserrat",
        textAlign: "center",


      },
      description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
        color: 'white'
      },
      marketData: {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          display: "flex",
          justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
          alignItems: "start",
        },
        color: 'white'
      },
    }

  });

  const { classes } = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "#388E3C" }} />;

  return (

    <div className={classes.container}>

      {/* sidebar */}

      <div className={classes.sidebar}>
        <Paper elevation={24} className='gradient'>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20, marginTop: 20, marginLeft: 130 }}
          />
          <Typography variant="h3" className={classes.headingCoin} style={{ color: '#F5F3F8', opacity: '0.8' }}>
            {coin?.name}
          </Typography>

          <Typography variant="subtitle1" className={classes.description} >
            {HTMLReactParser(coin?.description.en.split(". ")[0])}.
          </Typography>

          <div className={classes.marketData}>

            {/* For Rank */}
            <span style={{ display: 'flex' }}>
              <Typography variant='h5' className={classes.heading} style={{ color: '#388E3C', fontWeight:'bold' }}>
                Rank :
              </Typography>

              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat"
                }}
              >
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </span>

            {/* Current Price */}
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading} style={{ color: '#388E3C', fontWeight:'bold' }}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
              </Typography>
            </span>

            {/* Market Cap */}
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading} style={{ color: '#388E3C', fontWeight:'bold' }}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {
                  numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6))
                }
                M
              </Typography>
            </span>

          </div>
        </Paper>
      </div>


      {/* Chart */}

      <CoinInfo coin={coin} />


    </div>

  )
}

export default CoinPage