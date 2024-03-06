
import { Html, Head, Main, NextScript } from "next/document";
import { GoogleTagManager } from '@next/third-parties/google'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Document() {
    return (
        <Html>
            <Head>
                <head>
                <GoogleAnalytics gaId="G-937TLLF4H3" />
                <GoogleTagManager gtmId="GTM-NRQ9VM4" />
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <meta name="theme-color" content="#000000" />
                    {/* <!--
                    manifest.json provides metadata used when your web app is added to the
                    homescreen on Android. See https://developers.google.com/web/fundamentals/web-app-manifest/
    --> */}
                    {/* <link rel="manifest" href="./manifest.json" /> */}
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                    {/* <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                    /> */}


                    {/* <!-- Google Ad Sense --> */}
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1235109639918263"
                        crossOrigin="anonymous"
                    ></script>

                    {/* <!-- Google Search Console verification  --> */}

                    <meta
                        name="google-site-verification"
                        content="gSw3jQhBGdgewRLveIbM41Lu923ZEzTLJDTrCEQb4Fc"
                    />

                    <title>Chop Chow</title>
                    <meta name="description" content="Adding convenience to cooking from home." />
                </head>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
 
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//       <GoogleAnalytics gaId="G-937TLLF4H3" />
//     </html>
//   )
// }