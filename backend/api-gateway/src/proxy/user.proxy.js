const {createProxyMiddleware} = require('http-proxy-middleware');

const userProxy = createProxyMiddleware({
    target : "http://localhost:5001",
    changeOrigin : true
})

module.exports = userProxy;