const Product = require("../models/product.model");
const {
  initializeInventory
} = require("../clients/inventory.client");

const createProduct = async (data) => {
  const product = await Product.create(data);

  try {
    await initializeInventory(product._id.toString());
  } catch (error) {
    // The product already exists, but inventory initialization failed.
    console.error("Inventory initialization failed:", {
      productId: product._id.toString(),
      message: error.message,
      status: error.response?.status
    });

    error.productCreated = true;
    error.productId = product._id.toString();

    throw error;
  }

  return product;
};

const getAllProducts = async () => {
    return await Product.find({isActive : true});
};

const getProductById = async (id) => {
    return await Product.findById(id);
}

const updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    )
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}