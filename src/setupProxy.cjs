const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/proxy",
    createProxyMiddleware({
      target: "http://3.34.73.141:8080/",
      changeOrigin: true,
    })
  );
};
