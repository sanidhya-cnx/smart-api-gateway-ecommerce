const axios = require("axios");

const inventoryClient = axios.create({
  baseURL: process.env.INVENTORY_SERVICE_URL,
  timeout: 5000
});

const initializeInventory = async (productId) => {
  const response = await inventoryClient.post(
    "/inventory/initialize",
    { productId }
  );

  return response.data.data;
};

module.exports = {
  initializeInventory
};