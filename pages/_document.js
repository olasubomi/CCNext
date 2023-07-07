
import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
    return (
        <Html>
            <Head>
                <head>
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

                    {/* <!--
                    Notice the use of %PUBLIC_URL% in the tags above.
                    It will be replaced with the URL of the `public` folder during the build.
                    Only files inside the `public` folder can be referenced from the HTML.

                    Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
                    work correctly both with client-side routing and a non-root public URL.
                    Learn how to configure a non-root public URL by running `npm run build`.
    --> */}


                    {/* <!-- Google Tag Manager --> */}
                    {/* <script>
                        (function (w, d, s, l, i) {
                            w[l] = w[l] || [];
                        w[l].push({"gtm.start": new Date().getTime(), event: "gtm.js" });
                        var f = d.getElementsByTagName(s)[0],
                        j = d.createElement(s),
                        dl = l != "dataLayer" ? "&l=" + l : "";
                        j.async = true;
                        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-NRQ9VM4");
                    </script> */}
                    {/* <!-- End Google Tag Manager --> */}

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
                </head>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}