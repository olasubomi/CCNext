
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

                    <script dangerouslySetInnerHTML={{ __html: "(function(){\n  function text(value){try{return String(value==null?'':value).slice(0,3000)}catch(e){return 'unavailable'}}\n  function display(kind,message,stack,source){\n    var lines=['Chop Chow preview: JavaScript diagnostic',kind,text(message),'Source: '+text(source),'Stack:',text(stack)];\n    var output=lines.join('\\n');\n    try{sessionStorage.setItem('cc_debug_error',output)}catch(e){}\n    function show(){\n      if(!document.body)return;\n      var panel=document.getElementById('cc-debug-overlay');\n      if(!panel){\n        panel=document.createElement('div');panel.id='cc-debug-overlay';\n        panel.style.cssText='position:fixed;z-index:2147483647;inset:0;background:#10131b;color:#fff;padding:22px;overflow:auto;font:14px/1.5 ui-monospace,monospace;white-space:pre-wrap;word-break:break-word';\n        document.body.appendChild(panel);\n      }\n      panel.textContent=output+'\\n\\nScreenshot this text. Do not include passwords or tokens.';\n    }\n    show();setTimeout(show,250);setTimeout(show,1000);\n  }\n  window.__ccDebugError=display;\n  window.addEventListener('error',function(e){\n    if(e.target && e.target!==window && !e.error){return}\n    display('Uncaught exception',e.message,e.error&&e.error.stack,e.filename+':'+e.lineno+':'+e.colno);\n  },true);\n  window.addEventListener('unhandledrejection',function(e){\n    var reason=e.reason;display('Unhandled promise rejection',reason&&reason.message||reason,reason&&reason.stack,'Promise');\n  });\n  window.addEventListener('DOMContentLoaded',function(){\n    try{var saved=sessionStorage.getItem('cc_debug_error');if(saved && !document.getElementById('cc-debug-overlay')){display('Previous error',saved,'','session')}}catch(e){}\n  });\n})();" }} />
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