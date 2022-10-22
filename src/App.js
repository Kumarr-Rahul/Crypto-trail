import {Route, Routes} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from 'tss-react/mui';


function App() {
  const useStyles = makeStyles()(() => {
    return {
      App: {
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh"
      },
    };
  });

  const {classes} = useStyles();

  return (
    <div className={classes.App}>
      <Header/>
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    
    </div>
  );
}

export default App;
