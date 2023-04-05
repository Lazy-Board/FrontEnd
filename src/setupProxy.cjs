const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/proxy",
    createProxyMiddleware({
<<<<<<< HEAD
      target: "http://3.35.129.231:8080/",
=======
      target: "http://3.34.73.141:8080/",
>>>>>>> ede9d980749506e433fa4e99e757901c588ed040
      changeOrigin: true,
    })
  );
};
