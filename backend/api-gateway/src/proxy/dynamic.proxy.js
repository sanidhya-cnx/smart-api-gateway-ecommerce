const { createProxyMiddleware, fixRequestBody } = require("http-proxy-middleware");
const getService = require("../utils/getService");

const proxyHandler = createProxyMiddleware({
    changeOrigin: true,

    router: (req) => {
        const serviceName = req.path.split("/")[1];
        const service = getService(serviceName);
        return service ? service.url : undefined;
    },

    on: {
        proxyReq: fixRequestBody,
        error: (err, req, res) => {
            console.error("Proxy Error:", err.message);
            if (!res.headersSent) {
                res.status(503).json({
                    success: false,
                    message: "Target service is temporarily unreachable. Please try again later."
                });
            }
        }
    }
});

// Middleware wrapper that validates service existence before proxying
const dynamicProxy = (req, res, next) => {
    const serviceName = req.path.split("/")[1];
    const service = getService(serviceName);

    if (!service || !service.url) {
        return res.status(404).json({
            success: false,
            message: `Service '${serviceName || "root"}' not found on API Gateway`
        });
    }

    return proxyHandler(req, res, next);
};

module.exports = dynamicProxy;
