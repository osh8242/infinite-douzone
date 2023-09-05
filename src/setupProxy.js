const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/swsm/getAll',
    createProxyMiddleware({
      target: 'http://localhost:8888',
      changeOrigin: true,
    }),
  );
};
