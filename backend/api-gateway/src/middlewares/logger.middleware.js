function loggerMiddleware(req, res, next) {
    console.log("========================================");
    console.log(`Request ID : ${req.requestID}`)
    console.log(`Time   : ${new Date().toISOString()}`);
    console.log(`Method : ${req.method}`);
    console.log(`URL    : ${req.url}`);
    console.log("========================================");
    next();
}

module.exports = loggerMiddleware;