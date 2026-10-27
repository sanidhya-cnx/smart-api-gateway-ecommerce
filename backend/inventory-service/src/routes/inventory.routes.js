const express = require("express");
const router = express.Router();

const {
  createInventory,
  getAllInventory,
  getInventoryByProductId,
  updateInventory,
  deleteInventory
} = require("../controllers/inventory.controller");

router.post("/", createInventory);
router.get("/", getAllInventory);
router.get("/:productId", getInventoryByProductId);
router.patch("/:productId", updateInventory);
router.delete("/:productId", deleteInventory);

module.exports = router;