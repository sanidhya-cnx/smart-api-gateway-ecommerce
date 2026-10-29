const orderService = require("../services/order.service");
const asyncHandler = require("../../../api-gateway/src/utils/asyncHandler");

const createOrder = asyncHandler(async (req, res) => {
  // Temporary development assumption.
  // In production, derive this from verified authentication context.
  const userId = req.user?.id || req.body.userId;

  if (!userId) {
    const error = new Error("User ID is required");
    error.statusCode = 400;
    throw error;
  }

  const order = await orderService.createOrder(
    userId,
    req.body.items
  );

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: order
  });
});

const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.query.userId;

  if (!userId) {
    const error = new Error("User ID is required");
    error.statusCode = 400;
    throw error;
  }

  const orders = await orderService.getOrdersByUserId(userId);

  res.status(200).json({
    success: true,
    data: orders
  });
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found"
    });
  }

  // Prevent users from reading other users' orders.
  // Admin authorization can be added separately.
  const userId = req.user?.id || req.query.userId;

  if (!userId || String(order.userId) !== String(userId)) {
    return res.status(403).json({
      success: false,
      message: "Access denied"
    });
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

const cancelOrder = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.body.userId;

  if (!userId) {
    const error = new Error("User ID is required");
    error.statusCode = 400;
    throw error;
  }

  const order = await orderService.cancelOrder(
    req.params.id,
    userId
  );

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: order
  });
});

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder
};