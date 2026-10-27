const express = require("express");
const inventoryRoutes = require("./src/routes/inventory.routes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "inventory-service",
    status: "healthy"
  });
});

app.use("/inventory", inventoryRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    err.code === 11000 ? 409 :
    err.name === "ValidationError" ||
    err.name === "CastError" ? 400 : 500;

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Internal server error"
        : err.message
  });
});

module.exports = app;