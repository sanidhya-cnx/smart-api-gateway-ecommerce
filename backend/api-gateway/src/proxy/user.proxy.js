const {createProxyMiddleware} = require('http-proxy-middleware');
const services = require('../config/serviceRegistry')

const userProxy = createProxyMiddleware({
    target : services.users.url,
    changeOrigin : true
})

module.exports = userProxy;