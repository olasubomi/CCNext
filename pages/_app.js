import "react-bootstrap-typeahead/css/Typeahead.css";
import '../src/styles/home.styles.css'
import '../src/styles/carousel.styles.css'
import "../src/App.css";
import { wrapper, } from "../src/store/index";
import { persistor, store } from '../src/store/index'
import { Provider } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react'
import { CartProvider } from "../src/context/cart.context";
import { AuthProvider } from "../src/context/auth.context";
import useInactivityLogout from "../src/util/useinactivity";
import Hotjar from '@hotjar/browser';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { getAllISOCodes } from "iso-country-currency";


const siteId = process.env.NEXT_PUBLIC_siteId;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

function MyApp({ Component, pageProps }) {

  const get_currency = useCallback(async () => {
    try {
      const exchange_rates = await axios.get("https://api.currencyapi.com/v3/latest", {
        headers: {
          "apikey": "cur_live_QIzWoYONnBsFHsyitbrF0OoQX9GTGhBGN8awyTZX"
        }
      })
      const res = await axios.get("https://ipapi.co/json/");
      const country =  res.data?.country_name
      const countries = getAllISOCodes().find(
        (ele) => ele?.countryName === country
      );
      localStorage.setItem("userCurrencySymbol", countries.symbol)
      localStorage.setItem("userCurrency", countries?.currency || "USD")
      localStorage.setItem("exchangeRates", JSON.stringify(Object.values(exchange_rates.data.data)))
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    get_currency()
  }, [])
  useInactivityLogout(1200000)
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-937TLLF4H3"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {
          `
          window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-937TLLF4H3');

          `
        }
      </Script>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
              <CartProvider>
                <Component {...pageProps} />
              </CartProvider>
            </AuthProvider>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              style={{ width: "100%", height: "20rem" }} />
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default wrapper.withRedux(MyApp);
