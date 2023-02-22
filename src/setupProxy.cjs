const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/proxy",
    createProxyMiddleware({
      target: "http://3.35.129.231:8080/",
      changeOrigin: true,
    })
  );
};
