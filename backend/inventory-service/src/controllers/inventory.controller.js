const inventoryService = require("../services/inventory.service");
const asyncHandler = require("../../../api-gateway/src/utils/asyncHandler");

const createInventory = asyncHandler(async (req, res) => {
  const inventory = await inventoryService.createInventory(req.body);

  res.status(201).json({
    success: true,
    message: "Inventory created successfully",
    data: inventory
  });
});

const getAllInventory = asyncHandler(async (req, res) => {
  const inventory = await inventoryService.getAllInventory();

  res.status(200).json({
    success: true,
    data: inventory
  });
});

const getInventoryByProductId = asyncHandler(async (req, res) => {
  const inventory = await inventoryService.getInventoryByProductId(
    req.params.productId
  );

  if (!inventory) {
    return res.status(404).json({
      success: false,
      message: "Inventory not found"
    });
  }

  res.status(200).json({
    success: true,
    data: inventory
  });
});

const updateInventory = asyncHandler(async (req, res) => {
  const inventory = await inventoryService.updateInventory(
    req.params.productId,
    req.body
  );

  if (!inventory) {
    return res.status(404).json({
      success: false,
      message: "Inventory not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Inventory updated successfully",
    data: inventory
  });
});

const deleteInventory = asyncHandler(async (req, res) => {
  const inventory = await inventoryService.deleteInventory(
    req.params.productId
  );

  if (!inventory) {
    return res.status(404).json({
      success: false,
      message: "Inventory not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Inventory deleted successfully"
  });
});

module.exports = {
  createInventory,
  getAllInventory,
  getInventoryByProductId,
  updateInventory,
  deleteInventory
};