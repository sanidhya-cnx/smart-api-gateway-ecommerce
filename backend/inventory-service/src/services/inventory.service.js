const Inventory = require("../models/inventory.model");

const createInventory = async (data) => {
  return Inventory.create(data);
};

const getAllInventory = async () => {
  return Inventory.find();
};

const getInventoryByProductId = async (productId) => {
  return Inventory.findOne({ productId });
};

const updateInventory = async (productId, data) => {
  return Inventory.findOneAndUpdate(
    { productId },
    { $set: data },
    {
      new: true,
      runValidators: true
    }
  );
};

const deleteInventory = async (productId) => {
  return Inventory.findOneAndDelete({ productId });
};

module.exports = {
  createInventory,
  getAllInventory,
  getInventoryByProductId,
  updateInventory,
  deleteInventory
};