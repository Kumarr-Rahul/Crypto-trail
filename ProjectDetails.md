# __Installation__

> ## React
* npx create-react-app __'app-name'__
* npm i react-router-dom
   * In V6 of react-router-dom we must wrap **App.js** inside **BrowserRouter** either in index.js or inside App.js itself.
  

>## Material UI
* Material UI [https://mui.com/material-ui/getting-started/overview/]
* npm install @mui/material @emotion/react @emotion/styled
* npm install @mui/lab @mui/material

* Material UI API
  * npm install tss-react

>## Font
* Montserrat of different weights

>## CoinGecko API
* https://www.coingecko.com/en/api/documentation
* API using
  * CoinList API
  * Single Coin API
  * Historical Chart Display API
  * Trending Coin API

>## Axios
* npm i axios
* For fetching API end points details from CoinGecko API

>## React Alice Carousel
* https://www.npmjs.com/package/react-alice-carousel
* npm i react-alice-carousel
* Paste inside Index.js __import 'react-alice-carousel/lib/alice-carousel.css';

>## HTML React Parser
* To parse Coin Information
* npm i html-react-parser


>## Chart JS 2
* npm i react-chartjs-2
* charting library
* https://www.npmjs.com/package/react-chartjs-2
* npm i chart.js
* https://www.npmjs.com/package/chart.js?activeTab=readme
  




# __Table__
* Creating table using Material Ui
* https://mui.com/material-ui/react-table/#main-content

# __Linear Progress__
* For Loading Animation
* https://mui.com/material-ui/api/linear-progress/#main-content
* https://mui.com/material-ui/react-progress/


# __Bug Encountered and fixed__ 
* If theme not working properly, text not visible -> Read Documentation of Material UI
* Some differeneces in router dom V5 and V6

* **React Render bug and white screen**
  * Always import **makeStyles** from **'tss-react/mui'** instead of '@mui/material'
  * Issue faced in -> In CoinInfo page
  * import { makeStyles } from 'tss-react/mui' ✅
  * import { makeStyles } from '@mui/material' ❌

* **Reload Screen Bug**
  * Getting this bug on Coin Page -> Historical Graph Section
  * Reason : On reload react can't get some properties of Chart JS
  * Fix
    * import { Chart as ChartJS, CategoryScale LinearScale, PointElement,LineElement} from 'chart.js';
    * ChartJS.register (CategoryScale, LinearScale, PointElement, LineElement);

# __Future features__ 
* Profile section
* Wishlist coin

# **Color Scheme**
* Card color : #25004E updated: #230053
* Orange: #FF5722
* Green: #388E3C

# **Firebase**
* npm i  firebase

>## More for login, alert box and sidebar from Material UI
* Drawer for sidebar used for favourite coins section
* Snackbars provide brief notifications used for alert mesaage popup like Incorrect Password, login successfully etc.

>## Data base rules of firebase
* https://firebase.google.com/docs/reference/rules/rules.firestore.Request

>## Icons for google sign button and remove from watchlist button
* npm i react-icons
* npm install react-google-button 
* npm install @mui/icons-material <!-- delete icon in watchlist -->






