const services = {

    users: {
        name: "User Service",
        url: process.env.USER_SERVICE_URL
    },
    auth: {
        name: "Auth Service",
        url: process.env.AUTH_SERVICE_URL
    },
    products: {
        name: "Product Service",
        url: process.env.PRODUCT_SERVICE_URL
    },
    inventory: {
        name: "Inventory Service",
        url: process.env.INVENTORY_SERVICE_URL
    }

};

module.exports = services;