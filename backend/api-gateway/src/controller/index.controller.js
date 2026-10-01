const {getGatewayStatus} = require('../services/index.service')
function healthCheck(req, res) {
    const data = getGatewayStatus();

    res.status(200).json(data);
}

module.exports = {

    healthCheck

};