const services = {

    users: {
        name: "User Service",
        url: process.env.USER_SERVICE_URL
    },
    auth: {
        name: "Auth Service",
        url: process.env.AUTH_SERVICE_URL
    }

};

module.exports = services;