const axios = require("axios");

const productClient = axios.create({
  baseURL: process.env.PRODUCT_SERVICE_URL,
  timeout: 5000
});

const getProductById = async (productId) => {
  try {

    const response = await productClient.get(

      `/products/${encodeURIComponent(productId)}`

    );

    return response.data.data;

  } catch (error) {

    console.error("Product Service request failed:", {

      productId,

      status: error.response?.status,

      response: error.response?.data,

      message: error.message

    });

    throw error;

  }
};

module.exports = { getProductById };