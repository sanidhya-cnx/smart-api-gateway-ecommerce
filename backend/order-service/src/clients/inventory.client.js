const axios = require("axios");

const inventoryClient = axios.create({
  baseURL: process.env.INVENTORY_SERVICE_URL,
  timeout: 5000
});

const getInventoryByProductId = async (productId) => {
  const response = await inventoryClient.get(
    `/inventory/${productId}`
  );

  return response.data.data;
};

module.exports = { getInventoryByProductId };