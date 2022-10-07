const proxy = require("http-proxy-middleware");

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:3000',
//       changeOrigin: true,
//     })
//   );
// };
module.exports = function(app) {
  app.use(proxy("/api/", { 
    target: "https://chopchowdev.herokuapp.com/api/",
    secure: false
  }));
};

  // "proxy": "http://localhost:5000", used in package.json
