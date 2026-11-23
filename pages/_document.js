const productionDiagnosticScript = "(function () {\n  try {\n    var params = new URLSearchParams(window.location.search);\n    if (params.get('ccdebug') !== '1') return;\n    var records = [];\n    var panel = null;\n    var rendering = false;\n    var originalConsoleError = console.error;\n    var redact = function (value) {\n      var str = String(value == null ? '' : value);\n      return str\n        .replace(/Bearer\\s+[A-Za-z0-9._~+/-]+/gi, 'Bearer [REDACTED]')\n        .replace(/(token|password|secret|api[_-]?key|authorization)([=:]\\s*)([^\\s&]+)/gi, '$1$2[REDACTED]')\n        .replace(/([?&](?:token|code|key|password|secret|state)=)[^&#\\s]+/gi, '$1[REDACTED]')\n        .slice(0, 4500);\n    };\n    var format = function (value) {\n      if (value instanceof Error) return value.stack || value.message;\n      if (typeof value === 'string') return value;\n      try { return JSON.stringify(value); } catch (e) { return String(value); }\n    };\n    function show() {\n      if (!document.body || rendering) return;\n      rendering = true;\n      try {\n        if (!panel) {\n          panel = document.createElement('div');\n          panel.id = 'cc-production-debug';\n          panel.style.cssText = 'position:fixed!important;inset:0!important;z-index:2147483647!important;background:#111827!important;color:#f9fafb!important;padding:18px!important;overflow:auto!important;font:13px/1.5 ui-monospace,Menlo,monospace!important;white-space:pre-wrap!important;word-break:break-word!important';\n          document.body.appendChild(panel);\n        }\n        panel.textContent = '';\n        var heading = document.createElement('strong');\n        heading.textContent = 'Chop Chow mobile diagnostics (CCD-501)';\n        panel.appendChild(heading);\n        var instructions = document.createElement('p');\n        instructions.textContent = 'Screenshot or copy the error below. Review and redact any personal information before sharing. This report stays in your browser.';\n        panel.appendChild(instructions);\n        var button = document.createElement('button');\n        button.textContent = 'Copy error details';\n        button.style.cssText = 'background:#fff;color:#111;padding:10px 14px;border:0;border-radius:6px;margin:8px 0;font:inherit';\n        button.onclick = function () {\n          var details = records.map(function (item) { return item; }).join('\\n\\n----\\n\\n');\n          if (navigator.clipboard && navigator.clipboard.writeText) {\n            navigator.clipboard.writeText(details).then(function () { button.textContent = 'Copied'; }, function () { button.textContent = 'Take a screenshot instead'; });\n          } else { button.textContent = 'Take a screenshot instead'; }\n        };\n        panel.appendChild(button);\n        var pre = document.createElement('pre');\n        pre.style.cssText = 'white-space:pre-wrap;word-break:break-word;font:inherit';\n        pre.textContent = records.join('\\n\\n----\\n\\n');\n        panel.appendChild(pre);\n      } catch (e) {} finally { rendering = false; }\n    }\n    function report(kind, message, stack, source) {\n      if (records.length >= 6) return;\n      records.push(redact(kind) + '\\n' + redact(message) + '\\n' + redact(source || '') + '\\n' + redact(stack || ''));\n      show();\n      setTimeout(show, 100);\n      setTimeout(show, 750);\n    }\n    window.__ccDiagnosticReport = report;\n    window.addEventListener('error', function (event) {\n      if (event.target && event.target !== window && !event.error) return;\n      report('Uncaught JavaScript exception', event.message, event.error && event.error.stack, (event.filename || '') + ':' + (event.lineno || '') + ':' + (event.colno || ''));\n    }, true);\n    window.addEventListener('unhandledrejection', function (event) {\n      var reason = event.reason;\n      report('Unhandled promise rejection', format(reason), reason && reason.stack, 'Promise');\n    });\n    console.error = function () {\n      try {\n        var values = Array.prototype.slice.call(arguments);\n        var combined = values.map(format).join('\\n');\n        if (/error|exception|hydrate|uncaught|invalid|failed|cannot|undefined|react/i.test(combined)) {\n          report('Console error', combined, values[0] && values[0].stack, 'console.error');\n        }\n      } catch (e) {}\n      return originalConsoleError.apply(console, arguments);\n    };\n    document.addEventListener('DOMContentLoaded', function () { if (records.length) show(); });\n  } catch (e) {}\n})();";


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


                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                          
                            gtag('config', 'G-937TLLF4H3'); `,
                        }}
                    />

                    {/* Only active when ?ccdebug=1; no data is transmitted. */}
                    <script dangerouslySetInnerHTML={{ __html: productionDiagnosticScript }} />
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