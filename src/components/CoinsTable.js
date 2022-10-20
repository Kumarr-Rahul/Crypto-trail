import { Container, createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { orange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const CoinsTable = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const history = useNavigate();

  const { currency, symbol } = CryptoState(); //destructuring currency

  const fetchCoins = async () => {
    setLoading(true);

    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  }


  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: orange[500]
      }
    },
  });

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    ))
  }

  const useStyles = makeStyles()(() => {
    return {
      row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
      },
      pagination: {
        "& .MuiPaginationItem-root": {
          color: "gold",
        },
      },
    };
  });

  const { classes } = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>

        {/* heading */}
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        {/* SearchBox */}
        <TextField
          label="Search for a CryptoCurrency.."
          variant="outlined" style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />

        <TableContainer>
          {
            loading ? (
              <LinearProgress style={{ backgroundColor: "green" }} />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow
                          onClick={() => history(`/coins/${row.id}`)}
                          className={classes.row}
                          key={row.name}
                        >

                          {/* First Column content i.e. coin image, symbol and name */}
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: 15,
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />

                            <div
                              style={{ display: "flex", flexDirection: "column" }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>

                          </TableCell>

                          {/* 2nd Column for price */}
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>

                          {/* 3rd Column for 24hrs price change */}
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>

                          {/* 4th Column for 24hrs market cap */}
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6) //slice to show upto 6 digits
                            )}
                            M
                          </TableCell>


                        </TableRow>
                      )
                    })}
                </TableBody>

              </Table>
            )
          }
        </TableContainer>

        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}

          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />

      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable