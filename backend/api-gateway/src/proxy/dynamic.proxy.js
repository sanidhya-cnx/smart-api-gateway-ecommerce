const { createProxyMiddleware } = require("http-proxy-middleware");
const getService = require("../utils/getService");

const dynamicProxy = createProxyMiddleware({
    changeOrigin: true,

    router: (req) => {
        const serviceName = req.url.split("/")[1];

        const service = getService(serviceName);

        if (!service) {
            throw new Error(`Service ${serviceName} not found`);
        }

        return service.url;
    },

    on: {
        proxyReq: (proxyReq, req) => {

            if (
                req.body &&
                Object.keys(req.body).length > 0
            ) {

                const bodyData = JSON.stringify(req.body);

                proxyReq.setHeader(
                    "Content-Type",
                    "application/json"
                );

                proxyReq.setHeader(
                    "Content-Length",
                    Buffer.byteLength(bodyData)
                );

                proxyReq.write(bodyData);
            }

        }
    }
});

module.exports = dynamicProxy;