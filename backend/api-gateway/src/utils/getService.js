const services = require("../config/serviceRegistry")

function getService(serviceName){
    return services[serviceName];
}
module.exports = getService;