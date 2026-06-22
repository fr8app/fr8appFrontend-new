import "../styles/globals.css";
import "../styles/styles.css";
// import "../styles/home-styles.css";
import "../styles/responsive.css";
import "../styles/animate.css";
import "../styles/bootstrap.css";
import "../styles/font-awesome.css";
import "../styles/font-awesome.min.css";
import "../styles/slick/slick-theme.css";
import "../styles/slick/slick.css";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/styles/theme';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux'
import { store } from '../redux/store'

function MyApp({ Component, pageProps }) {
  return (

    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={1}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </Provider>
  )
}

export default MyApp;
