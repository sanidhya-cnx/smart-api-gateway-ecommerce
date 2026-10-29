const express = require("express");
const orderRoutes = require("./src/routes/order.routes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "order-service",
    status: "healthy"
  });
});

app.use("/orders", orderRoutes);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err.message);
  console.error("========== ORDER SERVICE ERROR ==========");

  console.error("Method:", req.method);

  console.error("URL:", req.originalUrl);

  console.error("Name:", err.name);

  console.error("Message:", err.message);

  console.error("Status:", err.statusCode || err.status);

  console.error("Stack:", err.stack);

  console.error("==========================================");

  res.status(err.statusCode || 500).json({
    success: false,
    message:
      err.statusCode && err.statusCode < 500
        ? err.message
        : "Internal server error"
  });
});

module.exports = app;