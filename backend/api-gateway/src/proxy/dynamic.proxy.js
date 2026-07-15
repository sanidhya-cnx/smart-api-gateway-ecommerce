const {createProxyMiddleware} = require('http-proxy-middleware');
const getService = require('../utils/getService');

const dynamicProxy = createProxyMiddleware({
    changeOrigin : true,
    router : (req) => {
        const serviceName = req.url.split("/")[1];
        const service = getService(serviceName);
        if(!service){
            throw new Error(`Service ${serviceName} not found`);

        }
        return service.url
    }
})

module.exports = dynamicProxy;