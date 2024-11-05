// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/upbit-api',
    createProxyMiddleware({
      target: 'https://api.upbit.com',
      changeOrigin: true,
      pathRewrite: { '^/upbit-api': '' },
    })
  );
};
