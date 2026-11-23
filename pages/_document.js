
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Temporary client-side exception diagnostics, preview branch only. */}
                <script dangerouslySetInnerHTML={{ __html: "\n(function () {\n  var records = [];\n  var shown = false;\n  function stringifyError(value) {\n    if (value && value.stack) return String(value.stack);\n    if (typeof value === 'string') return value;\n    try { return JSON.stringify(value); } catch (e) { return String(value); }\n  }\n  function show() {\n    if (!document.body || !records.length) return;\n    var panel = document.getElementById('cc-debug-panel');\n    if (!panel) {\n      panel = document.createElement('section');\n      panel.id = 'cc-debug-panel';\n      panel.style.cssText = 'position:fixed;z-index:2147483647;top:0;left:0;right:0;max-height:65vh;overflow:auto;background:#fff7ed;color:#222;border-bottom:4px solid #dc2626;padding:14px;font:13px/1.4 ui-monospace,Menlo,monospace;box-shadow:0 3px 20px #0008;white-space:pre-wrap;overflow-wrap:anywhere';\n      var title = document.createElement('div');\n      title.textContent = 'Chop Chow diagnostic preview — browser error';\n      title.style.cssText = 'font-weight:bold;font-size:15px;margin-bottom:8px';\n      var details = document.createElement('pre');\n      details.id = 'cc-debug-details';\n      details.style.cssText = 'white-space:pre-wrap;overflow-wrap:anywhere;margin:8px 0';\n      var copy = document.createElement('button');\n      copy.textContent = 'Copy error details';\n      copy.style.cssText = 'padding:10px;background:#222;color:#fff;border:0;border-radius:5px';\n      copy.onclick = function () {\n        var text = details.textContent;\n        if (navigator.clipboard && navigator.clipboard.writeText) {\n          navigator.clipboard.writeText(text).then(function () { copy.textContent = 'Copied'; }, function () { copy.textContent = 'Screenshot this panel'; });\n        } else { copy.textContent = 'Screenshot this panel'; }\n      };\n      panel.appendChild(title);\n      panel.appendChild(copy);\n      panel.appendChild(details);\n      document.body.appendChild(panel);\n    }\n    document.getElementById('cc-debug-details').textContent = records.slice(0, 5).join('\\n\\n---\\n\\n');\n    shown = true;\n  }\n  function record(type, value) {\n    var message = type + ': ' + stringifyError(value);\n    if (records.indexOf(message) === -1) records.push(message.slice(0, 4000));\n    if (document.body) show();\n    else document.addEventListener('DOMContentLoaded', show, { once: true });\n  }\n  window.addEventListener('error', function (event) {\n    if (event.error || event.message) record('Uncaught error', event.error || event.message);\n  }, true);\n  window.addEventListener('unhandledrejection', function (event) {\n    record('Unhandled promise rejection', event.reason);\n  });\n  var originalError = console.error;\n  console.error = function () {\n    try {\n      var args = Array.prototype.slice.call(arguments);\n      var message = args.map(stringifyError).join(' ');\n      if (!shown || /TypeError|ReferenceError|Error:|hydration|uncaught/i.test(message)) {\n        record('Console error', message);\n      }\n    } catch (ignored) {}\n    return originalError.apply(console, arguments);\n  };\n})();\n" }} />
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


                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                          
                            gtag('config', 'G-937TLLF4H3'); `,
                        }}
                    />

                    {/* <!-- Google Ad Sense --> */}
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1235109639918263"
                        crossorigin="anonymous"
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
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/gtag/js?id=G-937TLLF4H3"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}