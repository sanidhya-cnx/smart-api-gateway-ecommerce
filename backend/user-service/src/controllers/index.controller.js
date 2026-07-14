const {getHealthCheck} = require('../services/index.service');
function healthCheck (req , res) {
    res.json(getHealthCheck());
}
module.exports = {healthCheck};