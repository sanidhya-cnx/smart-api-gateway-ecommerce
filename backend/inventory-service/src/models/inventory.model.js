const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer"
      }
    },

    reservedQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Reserved quantity must be an integer"
      }
    }
  },
  {
    timestamps: true
  }
);

inventorySchema.virtual("availableQuantity").get(function () {
  return this.quantity - this.reservedQuantity;
});

module.exports = mongoose.model("Inventory", inventorySchema);