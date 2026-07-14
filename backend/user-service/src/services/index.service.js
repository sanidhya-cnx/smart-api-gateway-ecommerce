function getHealthCheck(){
    return {
        message : 'User service is running',
        status : 'running'
    };
}
module.exports = {getHealthCheck};