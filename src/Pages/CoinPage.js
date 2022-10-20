import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui';
import CoinInfo from '../components/Banner/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const {currency, symbol} = CryptoState();

  const fetchCoins = async() => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  const useStyles = makeStyles()( () => {
    
    return {
      
    }

  });
  
  const {classes} = useStyles();

  return (
    <div className={classes.container}>

      {/* sidebar */}
      <div className={classes.sidebar}>

      </div>

      {/* Chart */}
      <CoinInfo coin={coin} />

    
    </div>
  )
}

export default CoinPage