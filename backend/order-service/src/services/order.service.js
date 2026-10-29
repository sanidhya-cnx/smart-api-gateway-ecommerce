const Order = require("../models/order.model");

const { getProductById } = require("../clients/product.client");
const {
  getInventoryByProductId
} = require("../clients/inventory.client");

const createOrder = async (userId, items) => {
  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error("Order must contain at least one item");
    error.statusCode = 400;
    throw error;
  }

  // Combine duplicate product IDs into a single line item.
  const quantities = new Map();

  for (const item of items) {
    if (
      !item.productId ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
    ) {
      const error = new Error("Invalid order item");
      error.statusCode = 400;
      throw error;
    }

    quantities.set(
      item.productId,
      (quantities.get(item.productId) || 0) + item.quantity
    );
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const [productId, quantity] of quantities) {
    const product = await getProductById(productId);

    if (!product || product.isActive === false) {
      const error = new Error(`Product ${productId} is unavailable`);
      error.statusCode = 404;
      throw error;
    }

    const inventory = await getInventoryByProductId(productId);

    if (!inventory) {
      const error = new Error(`Inventory not found for ${productId}`);
      error.statusCode = 404;
      throw error;
    }

    const availableQuantity =
      inventory.quantity - inventory.reservedQuantity;

    if (availableQuantity < quantity) {
      const error = new Error(`Insufficient stock for ${product.name}`);
      error.statusCode = 409;
      throw error;
    }

    orderItems.push({
      productId,
      name: product.name,
      unitPrice: product.price,
      quantity
    });

    totalAmount += product.price * quantity;
  }

  return Order.create({
    userId,
    items: orderItems,
    totalAmount,
    status: "PENDING"
  });
};

const getOrdersByUserId = async (userId) => {
  return Order.find({ userId }).sort({ createdAt: -1 });
};

const getOrderById = async (orderId) => {
  return Order.findById(orderId);
};

const cancelOrder = async (orderId, userId) => {
  const order = await Order.findOne({
    _id: orderId,
    userId
  });

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  if (["CANCELLED", "COMPLETED"].includes(order.status)) {
    const error = new Error(
      `Cannot cancel an order with status ${order.status}`
    );
    error.statusCode = 409;
    throw error;
  }

  order.status = "CANCELLED";

  return order.save();
};

module.exports = {
  createOrder,
  getOrdersByUserId,
  getOrderById,
  cancelOrder
};