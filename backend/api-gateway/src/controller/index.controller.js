function healthCheck(req, res) {
    res.send('API Gateway is running...');
}

module.exports = {

    healthCheck

};