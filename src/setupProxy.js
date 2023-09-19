import { base_url } from "./util/Api";

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
module.exports = function (app) {
  app.use(proxy("/api/", {
    target: "https://chopchowserver.vercel.app/api/",
    secure: false
  }));
};

  // "proxy": "http://localhost:5000", used in package.json
