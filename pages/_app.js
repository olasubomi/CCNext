// import App from 'next/app'
import '../src/App.css'
// import '../src/components/Footer/Footer.css'
// import '../src/components/Header/header.css'
import { wrapper, store } from "../src/store/index";
import { Provider } from "react-redux";
import 'react-bootstrap-typeahead/css/Typeahead.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
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

export default wrapper.withRedux(MyApp)